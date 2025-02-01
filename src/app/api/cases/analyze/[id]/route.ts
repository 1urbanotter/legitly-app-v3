// src/app/api/cases/analyze/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectMongo from '@/lib/mongodb';
import Case from '@/models/Case';
import { GoogleGenerativeAI, GoogleGenerativeAIError } from "@google/generative-ai";

interface JwtPayload {
    userId: string;
}

// Initialize Google AI with API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

// Validate API key early
if (!process.env.GOOGLE_AI_API_KEY) {
    console.error('GOOGLE_AI_API_KEY is not configured');
}


// Helper function for consistent error responses
const createErrorResponse = (message: string, status: number) => {
    console.error(`API Error (${status}):`, message);
    return NextResponse.json({ message }, { status });
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
        return createErrorResponse("Authorization header missing", 401);
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || '';

    try {
        const decoded = verify(token, secret) as JwtPayload;
        const userId = decoded.userId;

        await connectMongo();

        // Fetch the case by ID and userId
        const caseItem = await Case.findOne({ _id: params.id, userId });

        if (!caseItem) {
            return createErrorResponse("Case not found or user not authorized", 404);
        }

        // Prepare the data for the AI model
        const caseDataForAI = `
        Issue Description: ${caseItem.issueDescription}
        Parties Involved: ${caseItem.partiesInvolved}
        Incident Date: ${caseItem.incidentDate.toDateString()}
        ZIP Code: ${caseItem.zipCode}
        Impact: ${caseItem.issueImpact.join(', ')} ${caseItem.otherImpact ? `, Other: ${caseItem.otherImpact}` : ''}
        Desired Resolution: ${caseItem.desiredResolution}
        `;

        // Call the AI model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = `
        Analyze the following legal case information and provide a JSON object with the following structure:

        {
          "caseClassification": "string",
          "relevantLaws": ["string"],
          "jurisdiction": "string",
          "recommendations": ["string"],
          "deadlines": ["string"],
          "strengthIndicators": "string",
          "supportingDocumentation": ["string"],
          "draftedCommunication": "string"
        }

        Provide only the JSON object. Do not provide any introductory text, and do not include any text outside of the JSON object.

        Case Details:
        ${caseDataForAI}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

         // Remove the code block identifiers
        text = text.replace(/```json\n|```/g, '');


        // Parse the JSON response
        const analysisResult = JSON.parse(text);


        return NextResponse.json(analysisResult, { status: 200 });
    } catch (error) {
        console.error('Error during case analysis:', error);
        if (error instanceof GoogleGenerativeAIError) {
            console.error('Google Generative AI Error:', error.response);
        }
         return createErrorResponse("Internal server error", 500);
    }
}

// Helper function to extract specific sections from the AI response
function extractData(response: string, sectionHeader: string): string {
    const sections = response.split(/\d+\./); // Split by numbered sections
    const sectionRegex = new RegExp(`${sectionHeader}:?(.+?)(?=\n\n|$)`, 'si');
    const match = response.match(sectionRegex);
    
    if (!match) {
        console.log(`Section ${sectionHeader} not found in response:`, response);
        return ''; // Return empty string if section not found
    }
    
    return match[1].trim();
}
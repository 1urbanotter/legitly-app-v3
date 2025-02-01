// src/app/api/cases/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Case from '@/models/Case';
import { verify } from 'jsonwebtoken';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

interface JwtPayload {
    userId: string;
}

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Helper function for consistent error responses
const createErrorResponse = (message: string, status: number) => {
    console.error(`API Error (${status}):`, message);
    return NextResponse.json({ message }, { status });
};

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
        return createErrorResponse("Authorization header missing", 401);
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || '';

    try {
        const decoded = verify(token, secret) as JwtPayload;
        const userId = decoded.userId;

        const formData = await req.formData();

        // Extract form data
        const issueDescription = formData.get('issueDescription') as string;
        const partiesInvolved = formData.get('partiesInvolved') as string;
        const incidentDate = formData.get('incidentDate') as string;
        const zipCode = formData.get('zipCode') as string;
        const desiredResolution = formData.get('desiredResolution') as string;
        const issueImpact: string[] = formData.getAll('issueImpact') as string[];
        const otherImpact = formData.get('otherImpact') as string;

        // Handle file uploads using AWS SDK
        const documents: string[] = [];
        const uploadPromises: Promise<void>[] = []; // To track upload promises

        for (const [key, value] of formData.entries()) {
            if (key === 'documents' && value instanceof File) {
                const file = value as File;
                const fileKey = `uploads/${uuidv4()}-${file.name}`;

                const uploadPromise = new Promise<void>((resolve, reject) => {
                    const uploadParams = {
                        Bucket: process.env.AWS_S3_BUCKET_NAME!,
                        Key: fileKey,
                        Body: file,
                        ContentType: file.type,
                        ACL: 'public-read',
                    };

                    console.log('Uploading to S3 with params', uploadParams); // Log upload parameters
                    s3.upload(uploadParams, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                        if (err) {
                            console.error("Error uploading file:", err);
                            reject(err);
                        } else {
                            console.log("File uploaded successfully:", data.Location);
                            documents.push(data.Location);
                            resolve();
                        }
                    });
                });
                uploadPromises.push(uploadPromise);
            }
        }

        // Wait for all file uploads to complete
        await Promise.all(uploadPromises);

        await connectMongo();

        // Create a new Case object with the extracted data
        const newCase = new Case({
            userId,
            issueDescription,
            partiesInvolved,
            incidentDate: new Date(incidentDate),
            zipCode,
            issueImpact,
            otherImpact,
            desiredResolution,
            documents,
        });

        await newCase.save();
       return NextResponse.json({ message: "Case created successfully", case: newCase }, { status: 201 });
    } catch (error) {
        console.error("Error during case creation:", error);
        return createErrorResponse("Internal server error", 500);
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return createErrorResponse("Authorization header missing", 401);
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || '';

  try {
    const decoded = verify(token, secret) as JwtPayload;
    const userId = decoded.userId;

    const updates = await req.json();

    await connectMongo();
    const updatedCase = await Case.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!updatedCase) {
      return createErrorResponse("Case not found or user not authorized", 404);
    }

    return NextResponse.json(updatedCase, { status: 200 });
  } catch (error) {
    console.error("Error updating case:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: "Authorization header missing" }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || '';

    try {
        const decoded = verify(token, secret) as JwtPayload;
        const userId = decoded.userId;

        const { id } = params;

        await connectMongo();

        const caseItem = await Case.findOne({ _id: id, userId });

        if (!caseItem) {
            return NextResponse.json({ message: "Case not found" }, { status: 404 });
        }

        return NextResponse.json(caseItem, { status: 200 });
    } catch (error) {
        console.error("Error fetching case:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
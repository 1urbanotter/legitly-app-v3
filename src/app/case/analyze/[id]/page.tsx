// src/app/case/analyze/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { AnalysisResult } from '@/types/analysisResult';

const AnalyzeCasePage = () => {
    const params = useParams(); // Dynamically fetch params
    const id = params?.id as string; // Extract the id
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cookies] = useCookies(['token']);
    const router = useRouter();

    useEffect(() => {
        const analyzeCase = async () => {
            if (!id) {
                setError('Case ID not found.');
                setLoading(false);
                return;
            }

            const token = cookies.token;

            if (!token) {
                setError('Authentication token not found. Please log in again.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/cases/analyze/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to analyze case');
                }

                const data = await response.json();
                setAnalysis(data);
            } catch (error) {
                setError('Error analyzing case.');
                console.error('Error analyzing case:', error);
            } finally {
                setLoading(false);
            }
        };

        analyzeCase();
    }, [id, cookies.token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!analysis) return <div>Analysis not available.</div>;

    return (
        <div className="min-h-screen bg-alabaster-500 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-space_cadet-700 mb-6">
                    Case Analysis
                </h1>

                {analysis.caseClassification && (
                    <div className="mb-4">
                        <strong className="text-space_cadet-700">Case Classification:</strong>
                        <p className="text-gray-700">{analysis.caseClassification}</p>
                    </div>
                )}

                {analysis.relevantLaws && analysis.relevantLaws.length > 0 && (
                    <div className="mb-4">
                        <strong className="text-space_cadet-700">Relevant Laws and Rights:</strong>
                         <ul className="list-disc list-inside text-gray-700">
                            {analysis.relevantLaws.map((law, index) => (
                                <li key={index}>{law}</li>
                            ))}
                         </ul>
                    </div>
                )}

                {analysis.jurisdiction && (
                    <div className="mb-4">
                        <strong className="text-space_cadet-700">Jurisdiction Information:</strong>
                        <p className="text-gray-700">{analysis.jurisdiction}</p>
                    </div>
                )}

                {analysis.recommendations && analysis.recommendations.length > 0 && (
                    <div className="mb-4">
                        <strong className="text-space_cadet-700">Recommended Actions:</strong>
                         <ul className="list-disc list-inside text-gray-700">
                            {analysis.recommendations.map((recommendation, index) => (
                                <li key={index}>{recommendation}</li>
                            ))}
                         </ul>
                    </div>
                )}

                {analysis.deadlines && analysis.deadlines.length > 0 && (
                    <div className="mb-4">
                        <strong className="text-space_cadet-700">Critical Deadlines:</strong>
                         <ul className="list-disc list-inside text-gray-700">
                            {analysis.deadlines.map((deadline, index) => (
                                <li key={index}>{deadline}</li>
                            ))}
                         </ul>
                    </div>
                )}

                {analysis.strengthIndicators && (
                    <div className="mb-4">
                        <strong className="text-space_cadet-700">Case Strength Indicators:</strong>
                        <p className="text-gray-700">{analysis.strengthIndicators}</p>
                    </div>
                )}

                {analysis.supportingDocumentation && analysis.supportingDocumentation.length > 0 && (
                    <div className="mb-4">
                        <strong className="text-space_cadet-700">Supporting Documentation Suggestions:</strong>
                        <ul className="list-disc list-inside text-gray-700">
                            {analysis.supportingDocumentation.map((doc, index) => (
                                <li key={index}>{doc}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {analysis.draftedCommunication && (
                    <div className="mb-4">
                        <strong className="text-space_cadet-700">Drafted Communication:</strong>
                        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: analysis.draftedCommunication?.replace(/\n/g, '<br />') || '' }} />
                    </div>
                )}

                <div className="mt-6">
                    <button
                        className="bg-space_cadet-500 hover:bg-space_cadet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => router.push(`/case/${id}`)}
                    >
                        Back to Case Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalyzeCasePage;
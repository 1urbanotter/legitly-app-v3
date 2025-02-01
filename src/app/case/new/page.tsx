// src/app/case/new/page.tsx
'use client'

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const NewCasePage = () => {
  const [issueDescription, setIssueDescription] = useState('');
  const [partiesInvolved, setPartiesInvolved] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [issueImpact, setIssueImpact] = useState<string[]>([]);
  const [otherImpact, setOtherImpact] = useState('');
  const [desiredResolution, setDesiredResolution] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [cookies] = useCookies(['token']);
    const router = useRouter();


  const impactOptions = [
    'Financial loss',
    'Emotional distress',
    'Property damage',
    'Reputational harm',
    'Time loss',
  ];

  const handleImpactChange = (impact: string) => {
    setIssueImpact((prevImpacts) => {
      if (prevImpacts.includes(impact)) {
        return prevImpacts.filter((item) => item !== impact);
      } else {
        return [...prevImpacts, impact];
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (selectedFiles) {
          const fileList = Array.from(selectedFiles);
          setDocuments(fileList);
      }
  };


    const handleFillTestData = () => {
        setIssueDescription('This is a test issue description.');
        setPartiesInvolved('Test party A, Test party B');
        setIncidentDate('2025-01-01');
        setZipCode('12345');
        setIssueImpact(['Financial loss', 'Emotional distress']);
        setOtherImpact('');
        setDesiredResolution('A test resolution.');
    };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmissionError('');
      setSubmissionSuccess(false);

      const token = cookies.token;
      if (!token) {
          setSubmissionError('Authentication token not found. Please log in again.');
          return;
      }

        const formData = new FormData();
        formData.append('issueDescription', issueDescription);
        formData.append('partiesInvolved', partiesInvolved);
        formData.append('incidentDate', incidentDate);
        formData.append('zipCode', zipCode);
        formData.append('desiredResolution', desiredResolution);
        formData.append('otherImpact', otherImpact);
  
        // Handling issueImpact (checkboxes)
        issueImpact.forEach((impact) => {
          formData.append('issueImpact', impact);
        });
  
        // Handling file uploads
        for (let i = 0; i < documents.length; i++) {
          formData.append('documents', documents[i]);
        }

      try {
          const response = await fetch('/api/cases', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              body: formData,
          });

          if (response.ok) {
              setSubmissionSuccess(true);
              setIssueDescription('');
              setPartiesInvolved('');
              setIncidentDate('');
              setZipCode('');
              setIssueImpact([]);
              setOtherImpact('');
              setDesiredResolution('');
              setDocuments([]);

               const data = await response.json();
              router.push(`/case/${data.case._id}`);

          } else {
              const errorData = await response.json();
              setSubmissionError(errorData.message || 'An error occurred while submitting the case.');
          }
      } catch (error) {
          console.error('Submission error:', error);
          setSubmissionError('Network error or server is down.');
      }
  };

  return (
    <div className="min-h-screen bg-space_cadet p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 bg-old_gold rounded-xl p-2">
          New Case Intake
        </h1>

        {submissionError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {submissionError}</span>
          </div>
        )}

        {submissionSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your case has been submitted successfully.</span>
          </div>
        )}
          <div className="flex justify-end">
        <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-xl mb-4 focus:outline-none focus:shadow-outline"
            onClick={handleFillTestData}
          >
              Fill Test Data
            </button>
          </div>
        <form onSubmit={handleSubmit}>
          {/* Issue Description */}
          <div className="mb-4">
            <label className="block text-space_cadet text-md font-bold mb-2" htmlFor="issueDescription">
              What is goinng on?
            </label>
            <textarea
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="issueDescription"
              placeholder="Describe your issue here"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              rows={5}
            />
          </div>

          {/* Parties Involved */}
          <div className="mb-4">
            <label className="block text-space_cadet text-md font-bold mb-2 mt-6" htmlFor="partiesInvolved">
              Who is involved?
            </label>
            <textarea
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="partiesInvolved"
              placeholder="List the parties involved"
              value={partiesInvolved}
              onChange={(e) => setPartiesInvolved(e.target.value)}
              rows={4}
            />
          </div>

          {/* Incident Date */}
          <div className="mb-4">
            <label className="block text-space_cadet text-md font-bold mb-2 mt-6" htmlFor="incidentDate">
              When did this happen?
            </label>
            <input
              type="date"
              className="shadow appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="incidentDate"
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)}
            />
          </div>

          {/* Zip Code */}
          <div className="mb-4">
            <label className="block text-space_cadet text-md font-bold mb-2 mt-6" htmlFor="zipCode">
              Where did this happen? (ZIP Code)
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="zipCode"
              placeholder="Enter ZIP Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          {/* Issue Impact */}
          <div className="mb-4">
            <label className="block text-space_cadet text-md font-bold mb-2 mt-6">
              How has this impacted you?
            </label>
            {impactOptions.map((impact) => (
              <div key={impact} className="mb-2 px-4">
                <input
                  type="checkbox"
                  id={impact}
                  checked={issueImpact.includes(impact)}
                  onChange={() => handleImpactChange(impact)}
                  className="mr-2"
                />
                <label htmlFor={impact}>{impact}</label>
              </div>
            ))}
            <div className="mb-2 px-4">
              <input
                type="checkbox"
                id="other"
                checked={otherImpact !== ''}
                onChange={() => setOtherImpact((prev) => (prev === '' ? 'Other' : ''))}
                className="mr-2"
              />
              <label htmlFor="other">Other</label>
              {issueImpact.includes('Other') && (
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-2 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Please specify"
                  value={otherImpact === 'Other' ? '' : otherImpact}
                  onChange={(e) => setOtherImpact(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Desired Resolution */}
          <div className="mb-4">
            <label className="block text-space_cadet text-md font-bold mb-2 mt-6" htmlFor="desiredResolution">
              What is your desired resolution?
            </label>
            <textarea
              className="shadow appearance-none border rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="desiredResolution"
              placeholder="Describe how you would like this issue to be resolved"
              value={desiredResolution}
              onChange={(e) => setDesiredResolution(e.target.value)}
              rows={4}
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-space_cadet text-md font-bold mb-2 mt-6" htmlFor="documents">
              Upload Documents (if any)
            </label>
            <input
              type="file"
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="documents"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <button
            className="bg-old_gold hover:bg-space_cadet-700 text-white text-lg font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Case
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCasePage;
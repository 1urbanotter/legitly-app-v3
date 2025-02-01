// src/app/case/edit/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

interface Case {
  _id: string;
  issueDescription: string;
  partiesInvolved: string;
  incidentDate: string;
  zipCode: string;
  issueImpact: string[];
  otherImpact: string;
  desiredResolution: string;
  documents: string[];
}

const EditCasePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(['token']);
  const router = useRouter();

  useEffect(() => {
    const fetchCaseData = async () => {
      const token = cookies.token;

      if (!token) {
        setError('Authentication token not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/cases/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch case data');
        }

        const data = await response.json();
        setCaseData(data);
      } catch (error) {
        setError('Error fetching case data.');
        console.error('Error fetching case data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [id, cookies.token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCaseData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCaseData((prevData) => {
      let updatedIssueImpact = prevData ? [...prevData.issueImpact] : [];
      if (checked) {
        updatedIssueImpact.push(name);
      } else {
        updatedIssueImpact = updatedIssueImpact.filter((item) => item !== name);
      }
      return {
        ...prevData!,
        issueImpact: updatedIssueImpact,
      };
    });
  };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const fileList = Array.from(selectedFiles);
            setCaseData((prevData) => ({
                ...prevData!,
                documents: [...prevData!.documents, ...fileList.map((file) => file.name)], // Update documents array
            }));
        }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const token = cookies.token;

      if (!token || !caseData) return;

      const formData = new FormData();
      formData.append('issueDescription', caseData.issueDescription);
      formData.append('partiesInvolved', caseData.partiesInvolved);
      formData.append('incidentDate', caseData.incidentDate);
      formData.append('zipCode', caseData.zipCode);
      formData.append('desiredResolution', caseData.desiredResolution);
      formData.append('otherImpact', caseData.otherImpact);

      // Handling issueImpact (checkboxes)
      caseData.issueImpact.forEach((impact) => {
          formData.append('issueImpact', impact);
      });

      // Handling file uploads
      const fileInput = document.getElementById('documents') as HTMLInputElement;
      if (fileInput && fileInput.files) {
          for (let i = 0; i < fileInput.files.length; i++) {
              formData.append('documents', fileInput.files[i]);
          }
      }

      try {
          const response = await fetch(`/api/cases/${id}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              body: formData,
          });

          if (!response.ok) {
              throw new Error('Failed to update case');
          }

          router.push(`/case/${id}`);
      } catch (error) {
          setError('Error updating case.');
          console.error('Error updating case:', error);
      }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!caseData) return <div>Case not found</div>;

  return (
    <div className="min-h-screen bg-alabaster-500 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-space_cadet-700 mb-6">
          Edit Case
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Issue Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issueDescription">
              What's going on?
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="issueDescription"
              name="issueDescription"
              placeholder="Describe your issue here"
              value={caseData.issueDescription}
              onChange={handleInputChange}
              rows={5}
            />
          </div>

          {/* Parties Involved */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partiesInvolved">
              Who is involved?
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="partiesInvolved"
              name="partiesInvolved"
              placeholder="List the parties involved"
              value={caseData.partiesInvolved}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          {/* Incident Date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="incidentDate">
              When did this happen?
            </label>
            <input
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="incidentDate"
              name="incidentDate"
              value={caseData.incidentDate?.split('T')[0]} // Assuming date is stored in ISO format
              onChange={handleInputChange}
            />
          </div>

          {/* Zip Code */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">
              Where did this happen? (ZIP Code)
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="zipCode"
              name="zipCode"
              placeholder="Enter ZIP Code"
              value={caseData.zipCode}
              onChange={handleInputChange}
            />
          </div>

          {/* Issue Impact */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How has this impacted you?
            </label>
            {['Financial loss', 'Emotional distress', 'Property damage', 'Reputational harm', 'Time loss'].map((impact) => (
              <div key={impact} className="mb-2">
                <input
                  type="checkbox"
                  id={impact}
                  name="issueImpact"
                  checked={caseData.issueImpact.includes(impact)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor={impact}>{impact}</label>
              </div>
            ))}
            <div className="mb-2">
              <input
                type="checkbox"
                id="other"
                name="otherImpact"
                 checked={caseData.otherImpact !== ''}
                 onChange={(e) => setCaseData((prev) => ({ ...prev!, otherImpact: e.target.checked ? 'Other' : '' }))}
                className="mr-2"
              />
              <label htmlFor="other">Other</label>
              {caseData.otherImpact !== '' && (
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-2 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Please specify"
                  value={caseData.otherImpact === 'Other' ? '' : caseData.otherImpact}
                  onChange={(e) => setCaseData((prev) => ({ ...prev!, otherImpact: e.target.value }))}
                />
              )}
            </div>
          </div>

          {/* Desired Resolution */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desiredResolution">
              What is your desired resolution?
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="desiredResolution"
              name="desiredResolution"
              placeholder="Describe how you would like this issue to be resolved"
              value={caseData.desiredResolution}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          {/* File Uploads - Add more advanced handling if needed */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Uploaded Documents
            </label>
            {/* For simplicity, we're just displaying the names. You'll need more logic to handle re-uploads. */}
            {caseData.documents.map((doc) => (
              <div key={doc} className="text-gray-700">
                {doc}
              </div>
            ))}
            <input
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="documents"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Case
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCasePage;
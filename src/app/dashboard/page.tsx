// src/app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import User from '@/models/User';
import Case from '@/models/Case';
import connectMongo from '@/lib/mongodb';
import SignOutButton from '@/components/SignOutButton';
import Link from 'next/link';

interface JwtPayload {
  userId: string;
}

const DashboardPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  let user = null;
  let cases = [];

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || '';
      const decoded = verify(token, secret) as JwtPayload;
      const userId = decoded.userId;

      await connectMongo();
      user = await User.findById(userId).select('firstName lastName'); // Fetch firstName and lastName
      cases = await Case.find({ userId }).sort({ createdAt: -1 }); // Fetch cases for the user
    } catch (error) {
      console.error('Error fetching user data or cases:', error);
    }
  }

  return (
    <div className="min-h-screen bg-alabaster-500 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-space_cadet-700">
            {user ? `Welcome, ${user.firstName} ${user.lastName}!` : 'Welcome to Your Case Hub'}
          </h1>
          <SignOutButton />
        </div>

        <div className="mb-8">
          <Link href="/case/new">
            <button className="bg-space_cadet-500 hover:bg-space_cadet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create New Case
            </button>
          </Link>
        </div>

        <h2 className="text-xl font-bold text-space_cadet-700 mb-4">Your Cases:</h2>
        {cases.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {cases.map((caseItem) => (
              <li key={caseItem._id.toString()} className="py-4">
                <Link href={`/case/${caseItem._id.toString()}`}>
                  <span className="text-space_cadet-700 hover:text-old_gold-500 font-medium">
                    {/* Display a portion of the case ID for brevity */}
                    Case ID: {caseItem._id.toString().substring(0, 8)}...
                  </span>
                </Link>
                <p className="text-gray-600 mt-1">
                  Created on: {caseItem.createdAt.toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No cases found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
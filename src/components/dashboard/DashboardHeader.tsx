// src/components/dashboard/DashboardHeader.tsx

import Link from 'next/link';
import SignOutButton from '@/components/common/SignOutButton';

interface User {
  firstName: string;
  lastName: string;
}

interface DashboardHeaderProps {
  user: User | null;
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-space_cadet-700">
          {user ? `Welcome, ${user.firstName} ${user.lastName}!` : 'Welcome to Your Case Hub'}
        </h1>
        <SignOutButton />
      </div>
      <Link href="/case/new">
        <button className="bg-space_cadet-500 hover:bg-space_cadet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Create New Case
        </button>
      </Link>
    </div>
  );
};

export default DashboardHeader;
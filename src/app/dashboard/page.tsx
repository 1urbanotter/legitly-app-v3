// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { User, Case } from '@/types/case';
import { getUserCases } from '@/lib/api/cases';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CaseList from '@/components/dashboard/CaseList';

export const revalidate = 0;

async function getAuthenticatedUser(): Promise<User | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = verify(token, secret) as { userId: string };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${decoded.userId}`);
    return res.json();
  } catch {
    redirect('/login');
  }
}

async function getCases(userId: string): Promise<Case[]> {
  try {
    return await getUserCases(userId);
  } catch (error) {
    console.error('Error fetching cases:', error);
    return [];
  }
}

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();
  const cases = user ? await getCases(user._id) : [];

  return (
    <div className="min-h-screen bg-alabaster-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader user={user} />
        <div className="mt-8">
          <CaseList cases={cases} />
        </div>
      </div>
    </div>
  );
}
import { Case } from '@/types/case';

export async function getUserCases(userId: string): Promise<Case[]> {
  const response = await fetch(`/api/cases?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cases');
  }

  return response.json();
}
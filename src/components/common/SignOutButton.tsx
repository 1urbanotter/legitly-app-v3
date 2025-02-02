// src/components/common/SignOutButton.tsx

'use client';

import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the token from localStorage (client-side)
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/login');

    // Optional: Force a refresh to clear any cached auth state
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default SignOutButton;
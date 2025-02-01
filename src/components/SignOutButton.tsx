// src/components/SignOutButton.tsx
'use client'

import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const SignOutButton = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const handleSignOut = () => {
    removeCookie('token', { path: '/' });
    router.push('/login');
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
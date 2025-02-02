import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-supreme_white py-8 px-6">
      <div className="max-w-6xl mx-auto text-center text-honorable_navy">
        <p className="mb-4 font-bold">
          © {new Date().getFullYear()} Legitly. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/privacy" className="hover:text-honorable_navy transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-honorable_navy transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
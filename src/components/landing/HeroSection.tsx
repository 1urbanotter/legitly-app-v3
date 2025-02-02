// components/landing/HeroSection.tsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <header className="bg-honorable_navy text-white pt-40 pb-20 px-6 rounded-t-2xl">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
          Your AI-Powered Legal Advisor
        </h1>
        <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
          Legitly analyzes your legal situation, helps you understand your rights, and provides actionable recommendations in minutes.
        </p>
        <Link
          href="/case/new"
          className="inline-block bg-blue_justice hover:bg-red-600 text-honorable_navy text-lg font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Start Your Case Today
        </Link>
      </div>
    </header>
  );
};

export default HeroSection;
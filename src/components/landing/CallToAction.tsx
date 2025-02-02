import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="bg-honorable_navy text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Ready to Get Started?
        </h2>
        <Link
          href="/signup"
          className="inline-block bg-legally_red hover:bg-blue_justice text-white hover:text-honorable_navy font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-old_gold-400"
          aria-label="Sign Up for Free"
        >
          Sign Up for Free
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
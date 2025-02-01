import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-supreme_white font-sans">
      {/* Hero Section */}
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

      {/* Value Proposition */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-honorable_navy mb-12 text-center">
            Why Choose Legitly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Save Time and Money",
                description: "Avoid expensive legal fees and hours of research. Get instant answers with Legitly."
              },
              {
                title: "Understand Your Rights",
                description: "Complex legal jargon broken down into easy-to-understand language."
              },
              {
                title: "Make Informed Decisions",
                description: "Get personalized recommendations to help you take the right steps."
              },
              {
                title: "Secure and Confidential",
                description: "Your data and privacy protected with industry-leading security."
              }
            ].map((value, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <h3 className="text-xl font-bold text-honorable_navy mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="bg-blue_justice py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-honorable_navy mb-12 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {[
              {
                image: "/images/feature-1.jpg",
                alt: "AI Analysis",
                title: "AI-Powered Case Analysis",
                description: "Our advanced AI algorithms analyze your case details to provide accurate insights."
              },
              {
                image: "/images/feature-2.jpg",
                alt: "Strategic Advice",
                title: "Tailored Strategic Advice",
                description: "Get personalized guidance based on your specific situation, with support every step of the way."
              },
              {
                image: "/images/feature-3.jpg",
                alt: "Document Analysis",
                title: "Legal Document Analysis",
                description: "Securely upload and analyze your legal documents with our advanced platform."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden max-w-[350px] w-full"
              >
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={350}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-honorable_navy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-honorable_navy text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <Link
            href="/signup"
            className="inline-block bg-legally_red hover:bg-blue_justice text-white hover:text-honorable_navy font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-old_gold-400"
          >
            Sign Up for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default HomePage;
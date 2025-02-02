import React from 'react';
import Image from 'next/image';

const FeaturesOverview = () => {
  const features = [
    {
      image: "/images/feature-1.jpg",
      alt: "AI Analysis",
      title: "AI-Powered Case Analysis",
      description: "Our advanced AI algorithms analyze your case details to provide accurate insights.",
    },
    {
      image: "/images/feature-2.jpg",
      alt: "Strategic Advice",
      title: "Tailored Strategic Advice",
      description: "Get personalized guidance based on your specific situation, with support every step of the way.",
    },
    {
      image: "/images/feature-3.jpg",
      alt: "Document Analysis",
      title: "Legal Document Analysis",
      description: "Securely upload and analyze your legal documents with our advanced platform.",
    },
  ];

  return (
    <section className="bg-blue_justice py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-honorable_navy mb-12 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
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
                priority={index === 0} // Prioritize the first image
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
  );
};

export default FeaturesOverview;
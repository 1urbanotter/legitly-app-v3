import React from 'react';

const ValueProposition = () => {
  const values = [
    {
      title: "Save Time and Money",
      description: "Avoid expensive legal fees and hours of research. Get instant answers with Legitly.",
    },
    {
      title: "Understand Your Rights",
      description: "Complex legal jargon broken down into easy-to-understand language.",
    },
    {
      title: "Make Informed Decisions",
      description: "Get personalized recommendations to help you take the right steps.",
    },
    {
      title: "Secure and Confidential",
      description: "Your data and privacy protected with industry-leading security.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-honorable_navy mb-12 text-center">
          Why Choose Legitly?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
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
  );
};

export default ValueProposition;
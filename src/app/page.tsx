import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ValueProposition from '@/components/landing/ValueProposition';
import FeaturesOverview from '@/components/landing/FeaturesOverview';
import CallToAction from '@/components/landing/CallToAction';
import Footer from '@/components/common/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-supreme_white font-sans">
      <HeroSection />
      <ValueProposition />
      <FeaturesOverview />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
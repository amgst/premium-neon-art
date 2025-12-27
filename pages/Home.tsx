
import React from 'react';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import Showcase from '../components/Showcase';
import { PageType } from '../types';

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <FeatureSection />
      {/* Reusing Showcase as a "Success Portfolio" section */}
      <Showcase limit={4} onNavigate={onNavigate} />
    </>
  );
};

export default Home;

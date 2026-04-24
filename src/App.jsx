import React, { useState } from 'react';
import Hero from './components/Hero';
import HowShadesWork from './components/HowShadesWork';
import MountingOptions from './components/MountingOptions';
import LightControl from './components/LightControl';
import BlackoutChallenge from './components/BlackoutChallenge';
import TopTreatments from './components/TopTreatments';
import FabricGallery from './components/FabricGallery';
import HembarOptions from './components/HembarOptions';
import Summary from './components/Summary';
import SelectionBar from './components/SelectionBar';
import SelectionReview from './components/SelectionReview';
import { SelectionProvider } from './context/SelectionContext';
import './App.css';

function App() {
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <SelectionProvider>
      <div className="app">
        <Hero />
        <HowShadesWork />
        <MountingOptions />
        <LightControl />
        <BlackoutChallenge />
        <TopTreatments />
        <FabricGallery />
        <HembarOptions />
        <Summary />
        <SelectionBar onReviewClick={() => setReviewOpen(true)} />
        <SelectionReview isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />
      </div>
    </SelectionProvider>
  );
}

export default App;

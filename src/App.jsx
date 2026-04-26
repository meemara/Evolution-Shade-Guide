import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import HowShadesWork from './components/HowShadesWork';
import MountingOptions from './components/MountingOptions';
import LightControl from './components/LightControl';
import BlackoutChallenge from './components/BlackoutChallenge';
import TopTreatments from './components/TopTreatments';
import FabricGallery from './components/FabricGallery';
import HembarOptions from './components/HembarOptions';
import Summary from './components/Summary';
import SelectionReview from './components/SelectionReview';
import { SelectionProvider } from './context/SelectionContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);

  const pages = [
    { component: Hero, id: 'welcome' },
    { component: HowShadesWork, id: 'how-it-works' },
    { component: MountingOptions, id: 'mounting' },
    { component: LightControl, id: 'light-control' },
    { component: BlackoutChallenge, id: 'blackout' },
    { component: TopTreatments, id: 'treatments' },
    { component: FabricGallery, id: 'fabric' },
    { component: HembarOptions, id: 'hembar' },
    { component: Summary, id: 'review' },
  ];

  const CurrentPageComponent = pages[currentPage].component;
  const isScrollablePage = pages[currentPage].id === 'fabric';

  // Toggle body scroll based on current page
  useEffect(() => {
    if (isScrollablePage) {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  }, [isScrollablePage]);

  // Auto-scale non-scrollable pages to fit viewport
  useEffect(() => {
    if (isScrollablePage) return;
    const content = document.querySelector('.section-content');
    if (!content) return;

    const fit = () => {
      content.style.transform = 'none';
      const section = content.closest('.section');
      const pageContainer = document.querySelector('.page-container');

      // Reset alignment
      if (section) {
        section.style.alignItems = '';
        section.style.justifyContent = '';
      }
      if (pageContainer) {
        pageContainer.style.alignItems = '';
      }

      const viewH = window.innerHeight;
      const contentH = content.scrollHeight;
      if (contentH > viewH - 20) {
        const scale = Math.max((viewH - 20) / contentH, 0.5); // minimum 50% scale
        content.style.transform = `scale(${Math.min(scale, 1)})`;
        content.style.transformOrigin = 'top center';
        // Align to top so scaled content isn't clipped
        if (section) {
          section.style.alignItems = 'flex-start';
          section.style.justifyContent = 'flex-start';
          section.style.paddingTop = '10px';
        }
        if (pageContainer) {
          pageContainer.style.alignItems = 'flex-start';
        }
      }
    };

    // Small delay to let content render
    const timer = setTimeout(fit, 50);
    window.addEventListener('resize', fit);
    return () => { clearTimeout(timer); window.removeEventListener('resize', fit); };
  }, [currentPage, isScrollablePage]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleGoToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    window.scrollTo(0, 0);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <SelectionProvider>
      <div className={`app ${isScrollablePage ? 'app-scrollable' : ''}`}>
        {/* Left Arrow */}
        {currentPage > 0 && (
          <button className="nav-arrow nav-arrow-left" onClick={handlePrevPage} aria-label="Previous page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {currentPage < pages.length - 1 && (
          <button className="nav-arrow nav-arrow-right" onClick={handleNextPage} aria-label="Next page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}

        {/* Current Page */}
        <div className="page-container">
          <CurrentPageComponent onContinue={handleNextPage} onReviewClick={() => setReviewOpen(true)} />
        </div>

        {/* Selection Review Modal */}
        <SelectionReview isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />
      </div>
    </SelectionProvider>
  );
}

export default App;

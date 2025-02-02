import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetchData } from '@hooks/useFetchData';

import Loader from '@/Loader/Loader';
import WildlifeHero from '@/Wildlife/WildlifeHero/WildlifeHero';
import WildlifeLast from '@/Wildlife/WildlifeLast/WildlifeLast';
import WildlifeHighlight from '@/Wildlife/WildlifeHighlight/WildlifeHighlight';
import ErrorPage from '@pages/ErrorPage';

const ContentPage = ({ id, setIsSoundOn }) => {
  const scrollPos = useRef(null);
  const progressBar = useRef(null);
  const { data, error, isLoadingData } = useFetchData('/jsons/content.json');
  const content = data ? data.find((el) => el.id === id) : <Loader />;
  console.log('Content:', content);

  const handleScrollProgress = useCallback(() => {
    if (!scrollPos.current || !progressBar.current) return;
    const winScroll = scrollPos.current.scrollLeft;
    const width = scrollPos.current.scrollWidth - scrollPos.current.clientWidth;
    const scrolled = (winScroll / width) * 100;
    progressBar.current.style.width = `${scrolled}%`;
  }, []);

  const handleWheelScroll = useCallback((event) => {
    if (!scrollPos.current) return;
    event.preventDefault();

    const SCROLL_SPEED = 5;
    let scrollAmount = event.deltaY;

    const smoothScroll = () => {
      if (Math.abs(scrollAmount) > 0) {
        scrollPos.current.scrollLeft += scrollAmount > 0 ? SCROLL_SPEED : -SCROLL_SPEED;
        scrollAmount -= scrollAmount > 0 ? SCROLL_SPEED : -SCROLL_SPEED;
        requestAnimationFrame(smoothScroll);
      }
    };

    smoothScroll();
  }, []);

  useEffect(() => {
    const container = scrollPos.current;
    if (container) {
      container.addEventListener('wheel', handleWheelScroll, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheelScroll);
      }
    };
  }, [handleWheelScroll]);

  if (isLoadingData) return <Loader />;
  if (error) return <ErrorPage />;
  if (!content || typeof content !== 'object') return <div>Error: Content not found or invalid format.</div>;

  return (
    <div
      ref={scrollPos}
      onScroll={handleScrollProgress}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        overflowY: 'hidden',
        overflowX: 'scroll',
      }}
    >
      {/* Progress Bar */}
      <div
        style={{
          position: 'fixed',
          width: '100%',
          bottom: '0',
          zIndex: '100',
        }}
      >
        <div style={{ width: '100%', height: '8px', backgroundColor: '#ccc' }}>
          <div ref={progressBar} style={{ width: '0%', height: '8px', backgroundColor: '#04AA6D' }} />
        </div>
      </div>

      {/* Content Components */}
      <WildlifeHero 
        heading={content.heading_main} 
        text={content.text_main} 
        image={content.pic_hero} 
        text1={content.text_1} 
      />
      <WildlifeHighlight json={content.json} />
      <WildlifeLast 
        heading={content.heading_last} 
        text={content.text_last} 
        facts={[content.fact_1, content.fact_2, content.fact_3, content.fact_4]} 
        image={content.pic_last} 
      />
    </div>
  );
};

export default ContentPage;

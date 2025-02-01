import { useCallback, useEffect, useRef, useState } from 'react';

import WildlifeHero from '@/Wildlife/WildlifeHero/WildlifeHero';
import WildlifeLast from '@/Wildlife/WildlifeLast.jsx/WildlifeLast';
import WildlifeHighlight from '@/Wildlife/WildlifeHighlight/WildlifeHighlight';
import Loader from '@/Loader/Loader';

import WildlifeThreeD from '@/Wildlife/WildlifeThreeD';

const WildlifePage = ({ setIsSoundOn }) => {
  const [isLoading, setIsLoading] = useState(true);
  const scrollPos = useRef();
  const progressBar = useRef();

  useEffect(() => {
    const loadComponents = async () => {
      // Simulate a 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    loadComponents();
  }, []);

  // BUG - when using touchpad to scroll right or left it starts to behavior weird and scrolling is not happening. starts to dragging
  const handleScrollProgress = useCallback(() => {
    const winScroll = scrollPos.current?.scrollLeft;
    const width =
      scrollPos.current?.scrollWidth -
      scrollPos.current?.clientWidth;
    const scrolled = (winScroll / width) * 100;
    progressBar.current.style.width = scrolled + '%';
    
    // console.log(progressBar.current.style.width)

  }, []);

  const handleWheelScroll = useCallback((event) => {
    if (scrollPos.current) {
      event.preventDefault();
  
      const SCROLL_SPEED = 5;
      let scrollAmount = 5;
  
      const smoothScroll = () => {
        if (scrollAmount !== 0) {
          scrollPos.current.scrollLeft += scrollAmount > 0 ? SCROLL_SPEED : -SCROLL_SPEED;
          scrollAmount -= scrollAmount > 0 ? SCROLL_SPEED : -SCROLL_SPEED;
  
          if (Math.abs(scrollAmount) > 0) {
            requestAnimationFrame(smoothScroll);
          }
        }
      };
  
      scrollAmount += event.deltaY;
      smoothScroll();
    }
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
  }, [handleWheelScroll, isLoading]);
  const t = false

  return (
    <>
      {t
        ? (<Loader setIsSoundOn={setIsSoundOn} />) 
        : (<div ref={scrollPos} onScroll={handleScrollProgress}
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
            <div
              style={{
                position: 'fixed',
                width: '100%',
                bottom: '0',
                zIndex: '100'
              }}
            >

              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: "#ccc",
                }}>
                <div ref={progressBar}
                  style={{
                    width: '0%',
                    height: '8px',
                    backgroundColor: "#04AA6D",
                  }}></div>
              </div>
            </div>
            {/* <WildlifeThreeD /> */}
            <WildlifeHero />
            <WildlifeHighlight />
            <WildlifeLast />
          </div>)}
    </>
  );
};

export default WildlifePage;

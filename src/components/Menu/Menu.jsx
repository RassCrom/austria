import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styles from './Menu.module.css';

const Menu = ({ display, displayMenuHandler }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (display === 'flex') {
      // Animate the menu opening (fade-in and slide up)
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    } else {
      // BUG: closing animation is not working because display none
      // Animate the menu closing (fade-out and slide down)  
      gsap.fromTo(
        menuRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [display]);

  return (
    <div
      ref={menuRef}
      className={`${styles.menu_outer} ${display} z-20 bg-black/75 absolute w-full h-full flex items-center justify-center`}
    >
      <div className={`${styles.menu} p-6 rounded-lg shadow-lg w-2/5`}>
        <ul className="flex relative flex-col gap-6 p-20">
          <li className="uppercase">
            <a href="/wildlife" className="text-white hover:text-gray-300">
              wildlife
            </a>
          </li>
          <li className="uppercase">
            <a href="/nature" className="text-white hover:text-gray-300">
              must-go
            </a>
          </li>
          <li className="uppercase">
            <a href="/history" className="text-white hover:text-gray-300">
              explore Austria
            </a>
          </li>
          <li className="uppercase">
            <a href="https://github.com/RassCrom/austria" className="text-white hover:text-gray-300">
              about
            </a>
          </li>
          <button
            onClick={displayMenuHandler}
            aria-label="Close menu"
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 focus:outline-none"
          >
            &times;
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Menu;

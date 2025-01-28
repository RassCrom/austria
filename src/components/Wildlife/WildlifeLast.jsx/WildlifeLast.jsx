import styles from '../Wildlife.module.css';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const WildlifeLast = () => {
    const wildlifeLastRef = useRef(null);

    useEffect(() => {
        const element = wildlifeLastRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    gsap.from(
                        `.${styles.heading_secondary}`,
                        { opacity: 0, y: 50, duration: 1, delay: 0.2 },
                        // { opacity: 1, y: 0 }
                    );

                    gsap.from(
                        `.${styles.list_item__last}`,
                        { opacity: 0, y: 50, duration: 1, stagger: 0.2, delay: 0.6 },
                        // { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.6 }
                    );

                    gsap.from(
                        `.${styles.wildlife_last} .${styles.text_p} p`,
                        { opacity: 0, y: 50, duration: 1, delay: 0.4 },
                        // { opacity: 1, y: 0, duration: 1, delay: 0.4 }
                    );

       

                    observer.disconnect();
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <div className={`container ${styles.wildlife_last}`}>
            <div ref={wildlifeLastRef} className={`${styles.wildlife_text}`}>
                <h1 className={`${styles.heading_secondary}`}>
                    Preserving Austria&apos;s Natural Homes
                </h1>
                <div className={`${styles.text_p}`}>
                    <p>
                        Biodiversity in Austria is deeply tied to its habitats:
                    </p>
                    <ul className={`${styles.styled_list}`}>
                        <li className={`${styles.list_item__last}`}>The Alpine meadows that sustain mountain goats and marmots.</li>
                        <li className={`${styles.list_item__last}`}>The Danube wetlands, a haven for amphibians and birds.</li>
                        <li className={`${styles.list_item__last}`}>The forested valleys where lynx and deer roam.</li>
                    </ul>
                </div>
                <div className={`${styles.btn_last} flex`}>
                    <a className={`flex justify-center items-center gap-5 my-10`} href="">
                        {/* REPLACE WITH SVG */}
                        <img src="assets/button-arr.svg" alt="" />
                        Learn more on the map
                    </a>
                </div>
            </div>
            <div className={`${styles.wildlife_picture}`}>
                <img src="assets/fox.png" alt="deer" />
            </div>
        </div>
    );
};

export default WildlifeLast;

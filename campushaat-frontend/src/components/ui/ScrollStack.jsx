import React, { useEffect, useRef } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, className = '' }) => (
  <div className={`scroll-stack-item ${className}`}>
    {children}
  </div>
);

export const ScrollStack = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card'));

    let ticking = false;

    const updateCardTransforms = () => {
      const vh = window.innerHeight;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const nextCard = cards[index + 1];

        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const cardHeight = rect.height || 300;
          const coverDistance = Math.max(0, rect.bottom - nextRect.top);
          const progress = Math.min(1, Math.max(0, coverDistance / (cardHeight * 0.75)));

          const scale = 1 - progress * 0.04;
          const opacity = Math.max(0, 1 - progress * 1.1);

          card.style.transform = `scale(${scale})`;
          card.style.opacity = String(opacity);
          card.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
        } else {
          card.style.transform = `scale(1)`;
          card.style.opacity = `1`;
          card.style.pointerEvents = `auto`;
        }
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateCardTransforms);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCardTransforms();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={containerRef} className="scroll-stack-container">
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="scroll-stack-card"
          style={{
            zIndex: index + 10,
            marginBottom: index < childrenArray.length - 1 ? '4rem' : '0',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;


import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer, input, select');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', updatePosition);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor arrow */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-25%, -25%) scale(${isHovering ? 1.8 : 1.2}) rotate(-45deg)`,
        }}
      >
        <ArrowUpRight 
          className="w-8 h-8 text-white opacity-90" 
          strokeWidth={2.5}
        />
      </div>

      {/* Blurry glow effect */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-500 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
        }}
      >
        <div 
          className="w-12 h-12 rounded-full blur-lg transition-all duration-500"
          style={{
            background: isHovering 
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 50%, rgba(59, 130, 246, 0.4) 100%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(59, 130, 246, 0.2) 100%)'
          }}
        ></div>
      </div>

      {/* Trail effect */}
      <div
        className="fixed pointer-events-none z-[9997] transition-all duration-700 ease-out opacity-30"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 3 : 1.5})`,
        }}
      >
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
      </div>
    </>
  );
};

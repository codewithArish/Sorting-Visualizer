
import React from 'react';
import { SortingVisualizer } from '@/components/SortingVisualizer';
import { CustomCursor } from '@/components/CustomCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden cursor-none">
      <CustomCursor />
      
      {/* Ultra HD animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs for HD effect */}
        <div className="absolute -top-80 -right-80 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-80 -left-80 w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/30 via-cyan-500/20 to-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/25 via-purple-500/15 to-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Additional HD mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-pink-500/5"></div>
        
        {/* Particle effect simulation */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/60 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-ping" style={{ animationDelay: '5s' }}></div>
      </div>
      
      {/* Ultra wide container with enhanced spacing */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-block p-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full mb-8 shadow-2xl">
            <div className="bg-slate-900 rounded-full px-12 py-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-base font-semibold tracking-wide uppercase">
                Ultra HD Interactive Learning Tool
              </span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-fade-in leading-tight">
            Sorting Algorithm
            <br />
            <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Visualizer
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-300 max-w-6xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
            Experience the beauty of algorithms through <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">stunning ultra HD visualizations</span>. 
            Perfect for students and developers who want to understand sorting algorithms 
            with <span className="text-purple-400 font-semibold">interactive animations</span> and 
            <span className="text-pink-400 font-semibold">real-time complexity analysis</span>.
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <SortingVisualizer />
        </div>
      </div>
      
      {/* Ultra HD decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
    </div>
  );
};

export default Index;

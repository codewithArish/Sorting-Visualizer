
import React from 'react';
import { cn } from '@/lib/utils';

interface ArrayBarsProps {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
}

export const ArrayBars: React.FC<ArrayBarsProps> = ({
  array,
  comparingIndices,
  swappingIndices,
  sortedIndices,
}) => {
  const maxValue = Math.max(...array);

  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return 'bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300 shadow-emerald-500/60';
    }
    if (swappingIndices.includes(index)) {
      return 'bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-300 shadow-amber-500/60';
    }
    if (comparingIndices.includes(index)) {
      return 'bg-gradient-to-t from-red-600 via-red-500 to-pink-400 shadow-red-500/60';
    }
    return 'bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 shadow-blue-500/40';
  };

  const getBarHeight = (value: number) => {
    return Math.max((value / maxValue) * 600, 8);
  };

  const getBarWidth = () => {
    return Math.max(1400 / array.length - 4, 12);
  };

  return (
    <div className="relative p-12 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700/60 overflow-hidden">
      {/* Ultra HD animated grid background */}
      <div className="absolute inset-0 opacity-15">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px),
            linear-gradient(rgba(236, 72, 153, 0.2) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(236, 72, 153, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 30px 30px, 90px 90px, 90px 90px'
        }}></div>
      </div>
      
      {/* Ultra HD gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl"></div>
      
      <div className="relative flex items-end justify-center gap-2 overflow-x-auto min-h-[650px] p-6">
        {array.map((value, index) => (
          <div
            key={`${index}-${value}`}
            className={cn(
              "relative transition-all duration-700 ease-out rounded-t-2xl shadow-2xl transform hover:scale-110",
              "before:absolute before:inset-0 before:rounded-t-2xl before:opacity-30 before:blur-lg",
              "after:absolute after:inset-0 after:rounded-t-2xl after:shadow-inner",
              getBarColor(index)
            )}
            style={{
              height: `${getBarHeight(value)}px`,
              width: `${getBarWidth()}px`,
              transformOrigin: 'bottom',
              animation: 'scale-in 0.8s ease-out',
              animationDelay: `${index * 0.015}s`,
              boxShadow: `
                0 0 30px rgba(0,0,0,0.4), 
                0 0 60px rgba(139, 92, 246, 0.15),
                inset 0 1px 0 rgba(255,255,255,0.2)
              `
            }}
          >
            {/* Ultra HD glossy effect */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-t-2xl"></div>
            
            {/* HD reflection effect */}
            <div className="absolute top-1/4 left-1 right-1 h-1/4 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl"></div>
            
            {/* Value label for smaller arrays */}
            {array.length <= 30 && (
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <span className="text-sm font-bold text-slate-300 bg-slate-800/80 px-3 py-2 rounded-xl backdrop-blur-sm border border-slate-600/60 shadow-xl">
                  {value}
                </span>
              </div>
            )}
            
            {/* Ultra HD glow effect for active bars */}
            {(comparingIndices.includes(index) || swappingIndices.includes(index) || sortedIndices.includes(index)) && (
              <div className="absolute inset-0 rounded-t-2xl animate-pulse" style={{
                boxShadow: `
                  0 0 40px ${
                    sortedIndices.includes(index) ? 'rgba(16, 185, 129, 0.8)' :
                    swappingIndices.includes(index) ? 'rgba(245, 158, 11, 0.8)' :
                    'rgba(239, 68, 68, 0.8)'
                  },
                  0 0 80px ${
                    sortedIndices.includes(index) ? 'rgba(16, 185, 129, 0.4)' :
                    swappingIndices.includes(index) ? 'rgba(245, 158, 11, 0.4)' :
                    'rgba(239, 68, 68, 0.4)'
                  }
                `
              }}></div>
            )}
            
            {/* Ultra HD particle effect */}
            {(swappingIndices.includes(index)) && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Ultra HD bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"></div>
    </div>
  );
};


import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, TrendingUp, Cpu, CheckCircle, XCircle } from 'lucide-react';

interface AlgorithmInfoProps {
  algorithm: {
    name: string;
    description: string;
    timeComplexity: {
      best: string;
      average: string;
      worst: string;
    };
    spaceComplexity: string;
    stable: boolean;
    inPlace: boolean;
    howItWorks: string[];
  };
}

export const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
      <Card className="relative bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl border-slate-700/50 p-8 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Algorithm Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">{algorithm.name}</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                {algorithm.description}
              </p>
            </div>

            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Algorithm Properties
              </h4>
              <div className="flex flex-wrap gap-3">
                <Badge 
                  variant={algorithm.stable ? "default" : "secondary"}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl ${
                    algorithm.stable 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-500/25' 
                      : 'bg-slate-600 text-slate-300'
                  }`}
                >
                  {algorithm.stable ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  {algorithm.stable ? "Stable" : "Not Stable"}
                </Badge>
                <Badge 
                  variant={algorithm.inPlace ? "default" : "secondary"}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl ${
                    algorithm.inPlace 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/25' 
                      : 'bg-slate-600 text-slate-300'
                  }`}
                >
                  {algorithm.inPlace ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  {algorithm.inPlace ? "In-Place" : "Not In-Place"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Complexity Information */}
          <div className="space-y-6">
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Time Complexity
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-4 rounded-xl border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-300">Best Case</span>
                    <span className="text-emerald-400 font-mono text-lg">{algorithm.timeComplexity.best}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-4 rounded-xl border border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-300">Average Case</span>
                    <span className="text-amber-400 font-mono text-lg">{algorithm.timeComplexity.average}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 p-4 rounded-xl border border-red-500/30">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-red-300">Worst Case</span>
                    <span className="text-red-400 font-mono text-lg">{algorithm.timeComplexity.worst}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                Space Complexity
              </h4>
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-blue-500/30">
                <span className="text-blue-400 font-mono text-xl font-bold">{algorithm.spaceComplexity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <h4 className="font-bold text-white mb-6 flex items-center gap-2 text-xl">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            How it works:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {algorithm.howItWorks.map((step, index) => (
              <div key={index} className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-slate-300 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

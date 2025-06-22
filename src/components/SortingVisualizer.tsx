import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Shuffle, Zap, Settings, BarChart3 } from 'lucide-react';
import { ArrayBars } from './ArrayBars';
import { AlgorithmInfo } from './AlgorithmInfo';
import { sortingAlgorithms } from '@/utils/sortingAlgorithms';
import { generateRandomArray } from '@/utils/arrayUtils';
import { toast } from 'sonner';

export const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [sortingSpeed, setSortingSpeed] = useState(100);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<any[]>([]);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  const initializeArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setCurrentStep(0);
    setSortingSteps([]);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setIsPlaying(false);
    setIsPaused(false);
  }, [arraySize]);

  useEffect(() => {
    initializeArray();
  }, [initializeArray]);

  const startSorting = useCallback(() => {
    if (sortingSteps.length === 0) {
      const algorithm = sortingAlgorithms[selectedAlgorithm];
      const steps = algorithm.sort([...array]);
      setSortingSteps(steps);
    }
    setIsPlaying(true);
    setIsPaused(false);
    toast.success(`Started ${sortingAlgorithms[selectedAlgorithm].name}!`);
  }, [array, selectedAlgorithm, sortingSteps.length]);

  const pauseSorting = () => {
    setIsPlaying(false);
    setIsPaused(true);
    toast.info('Sorting paused');
  };

  const resetSorting = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setSortingSteps([]);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    initializeArray();
    toast.success('Reset complete');
  };

  useEffect(() => {
    if (!isPlaying || currentStep >= sortingSteps.length) {
      if (currentStep >= sortingSteps.length && sortingSteps.length > 0) {
        setIsPlaying(false);
        setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
        toast.success('Sorting completed!');
      }
      return;
    }

    const timer = setTimeout(() => {
      const step = sortingSteps[currentStep];
      
      if (step.type === 'compare') {
        setComparingIndices(step.indices);
        setSwappingIndices([]);
      } else if (step.type === 'swap') {
        setSwappingIndices(step.indices);
        setComparingIndices([]);
        setArray(step.array);
      } else if (step.type === 'sorted') {
        setSortedIndices(prev => [...prev, ...step.indices]);
      }

      setCurrentStep(prev => prev + 1);
    }, 1000 - sortingSpeed * 9);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, sortingSteps, sortingSpeed, array.length]);

  return (
    <div className="space-y-12 w-full">
      {/* Ultra HD Enhanced Controls Panel */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-blue-500/30 rounded-3xl blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl blur-xl"></div>
        <Card className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-2xl border-slate-700/60 p-12 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl shadow-2xl">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Ultra HD Control Panel</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="space-y-4">
              <label className="text-base font-semibold text-slate-300 flex items-center gap-3">
                <BarChart3 className="w-5 h-5" />
                Algorithm Selection
              </label>
              <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm} disabled={isPlaying}>
                <SelectTrigger className="bg-slate-700/60 border-slate-600/80 text-white rounded-2xl h-14 backdrop-blur-sm shadow-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/95 border-slate-700 rounded-2xl backdrop-blur-xl">
                  {Object.entries(sortingAlgorithms).map(([key, algorithm]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-slate-700 rounded-xl text-base py-3">
                      {algorithm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="text-base font-semibold text-slate-300">
                Array Size: <span className="text-purple-400 text-lg">{arraySize}</span>
              </label>
              <div className="relative p-2">
                <Slider
                  value={[arraySize]}
                  onValueChange={(value) => setArraySize(value[0])}
                  min={10}
                  max={150}
                  step={5}
                  disabled={isPlaying}
                  className="w-full h-4"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-lg -z-10"></div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-base font-semibold text-slate-300">
                Speed: <span className="text-pink-400 text-lg">{sortingSpeed}%</span>
              </label>
              <div className="relative p-2">
                <Slider
                  value={[sortingSpeed]}
                  onValueChange={(value) => setSortingSpeed(value[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full h-4"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-lg -z-10"></div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <label className="text-base font-semibold text-slate-300 flex items-center gap-3">
                <Zap className="w-5 h-5" />
                Control Actions
              </label>
              <div className="grid grid-cols-3 gap-3">
                {!isPlaying ? (
                  <Button 
                    onClick={startSorting} 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl h-14 shadow-2xl transition-all duration-300 transform hover:scale-105 text-base font-semibold" 
                    disabled={sortingSteps.length > 0 && currentStep >= sortingSteps.length}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {isPaused ? 'Resume' : 'Start'}
                  </Button>
                ) : (
                  <Button 
                    onClick={pauseSorting} 
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl h-14 shadow-2xl transition-all duration-300 transform hover:scale-105 text-base font-semibold"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </Button>
                )}
                <Button 
                  onClick={resetSorting} 
                  className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-2xl h-14 shadow-2xl transition-all duration-300 transform hover:scale-105 text-base font-semibold"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
                <Button 
                  onClick={initializeArray} 
                  disabled={isPlaying}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl h-14 shadow-2xl transition-all duration-300 transform hover:scale-105 text-base font-semibold"
                >
                  <Shuffle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Algorithm Information */}
      <AlgorithmInfo algorithm={sortingAlgorithms[selectedAlgorithm]} />

      {/* Ultra HD Enhanced Visualization */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl blur-xl"></div>
        <Card className="relative bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-2xl border-slate-700/60 p-12 rounded-3xl shadow-2xl overflow-hidden">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              Ultra HD Live Visualization
            </h3>
            
            <div className="flex flex-wrap gap-6 text-base">
              <div className="flex items-center gap-3 bg-slate-700/60 px-6 py-3 rounded-2xl backdrop-blur-sm shadow-xl">
                <div className="w-6 h-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg shadow-2xl"></div>
                <span className="text-slate-300 font-medium">Default State</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-700/60 px-6 py-3 rounded-2xl backdrop-blur-sm shadow-xl">
                <div className="w-6 h-6 bg-gradient-to-t from-red-500 to-pink-400 rounded-lg shadow-2xl"></div>
                <span className="text-slate-300 font-medium">Comparing Elements</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-700/60 px-6 py-3 rounded-2xl backdrop-blur-sm shadow-xl">
                <div className="w-6 h-6 bg-gradient-to-t from-amber-400 to-yellow-300 rounded-lg shadow-2xl"></div>
                <span className="text-slate-300 font-medium">Swapping Elements</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-700/60 px-6 py-3 rounded-2xl backdrop-blur-sm shadow-xl">
                <div className="w-6 h-6 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-lg shadow-2xl"></div>
                <span className="text-slate-300 font-medium">Sorted Position</span>
              </div>
            </div>
          </div>
          
          <ArrayBars 
            array={array}
            comparingIndices={comparingIndices}
            swappingIndices={swappingIndices}
            sortedIndices={sortedIndices}
          />
        </Card>
      </div>
    </div>
  );
};

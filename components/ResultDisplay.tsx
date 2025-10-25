import React from 'react';
import { RefreshCw } from 'lucide-react';
import type { ImageData } from '../types';

interface ResultDisplayProps {
  imageSrc: ImageData;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageSrc, onReset }) => {
  if (!imageSrc) return null;

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 text-transparent bg-clip-text">Your Timeless Hug</h2>
      <div className="w-full max-w-2xl bg-gray-800 p-2 rounded-lg shadow-2xl mb-6">
        <img src={imageSrc} alt="Merged result" className="w-full h-auto object-contain rounded-md" />
      </div>
      <button
        onClick={onReset}
        className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-5 h-5" />
        <span>Create Another</span>
      </button>
    </div>
  );
};
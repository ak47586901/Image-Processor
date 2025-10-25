import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { createHugPhoto } from './services/geminiService';
import type { ImageData } from './types';
import { Camera, Image, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [childPhoto, setChildPhoto] = useState<ImageData>(null);
  const [adultPhoto, setAdultPhoto] = useState<ImageData>(null);
  const [mergedPhoto, setMergedPhoto] = useState<ImageData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMerge = useCallback(async () => {
    if (!childPhoto || !adultPhoto) {
      setError('Please upload both a childhood and an adult photo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMergedPhoto(null);

    try {
      const result = await createHugPhoto(childPhoto, adultPhoto);
      setMergedPhoto(result);
    } catch (e) {
      console.error(e);
      setError('Failed to create photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [childPhoto, adultPhoto]);
  
  const handleReset = () => {
    setChildPhoto(null);
    setAdultPhoto(null);
    setMergedPhoto(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-5xl text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-2">
            <Sparkles className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
            Timeless Hug
            </h1>
        </div>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Upload your childhood and adult photos to create a heartwarming image of you hugging your younger self.
        </p>
      </header>

      <main className="w-full max-w-5xl flex-grow">
        {!mergedPhoto && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <ImageUploader
                id="child-photo"
                title="Childhood Photo"
                imageSrc={childPhoto}
                onImageChange={setChildPhoto}
                icon={<Image className="w-12 h-12 text-gray-500" />}
                />
                <ImageUploader
                id="adult-photo"
                title="Adult Photo"
                imageSrc={adultPhoto}
                onImageChange={setAdultPhoto}
                icon={<Camera className="w-12 h-12 text-gray-500" />}
                />
            </div>
        )}
        
        {error && <p className="text-center text-red-400 mb-4">{error}</p>}

        {isLoading && (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg">
                <Spinner />
                <p className="mt-4 text-lg text-gray-300">Creating your timeless moment... this may take a moment.</p>
            </div>
        )}

        {mergedPhoto && !isLoading && (
            <ResultDisplay imageSrc={mergedPhoto} onReset={handleReset} />
        )}
      </main>
      
      {!isLoading && !mergedPhoto && (
         <div className="w-full max-w-5xl mt-auto">
            <button
                onClick={handleMerge}
                disabled={!childPhoto || !adultPhoto || isLoading}
                className="w-full py-4 px-8 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-3"
            >
                <Sparkles className="w-6 h-6" />
                <span>Create Hug Photo</span>
            </button>
        </div>
      )}

      <footer className="w-full max-w-5xl text-center text-gray-500 mt-12 text-sm">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
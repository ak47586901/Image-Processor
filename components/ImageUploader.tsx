
import React, { useRef, useCallback, useState, ReactElement } from 'react';
import type { ImageData } from '../types';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploaderProps {
  id: string;
  title: string;
  imageSrc: ImageData;
  onImageChange: (data: ImageData) => void;
  icon: ReactElement;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, imageSrc, onImageChange, icon }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files?.[0] || null);
  };
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files?.[0] || null);
  }, [handleFileChange]);


  const onRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onImageChange(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-300 mb-4">{title}</h2>
      <input
        type="file"
        id={id}
        ref={fileInputRef}
        onChange={onFileSelect}
        accept="image/*"
        className="hidden"
      />
      <label
        htmlFor={id}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 relative overflow-hidden group
          ${isDragging ? 'border-purple-500 bg-gray-700' : 'border-gray-600 hover:border-purple-400'}
          ${imageSrc ? 'border-solid border-purple-500' : ''}`}
      >
        {imageSrc ? (
          <>
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={onRemoveImage}
                  className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-all transform hover:scale-110"
                  aria-label="Remove image"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            {icon}
            <p className="mt-2 font-semibold">
              <span className="text-purple-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </label>
    </div>
  );
};

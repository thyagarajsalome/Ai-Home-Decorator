
import React, { useState, useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [onImageUpload]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">1. Upload Your Room</h2>
      <div
        className={`relative flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-lg transition-colors duration-200 ${
          isDragging ? 'border-purple-400 bg-gray-800' : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        {imageUrl ? (
          <>
            <img src={imageUrl} alt="Uploaded room" className="object-contain max-h-64 rounded-md" />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                }}
                className="absolute top-2 right-2 bg-gray-900/70 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-800"
            >
              Change Image
            </button>
          </>
        ) : (
          <div className="text-center p-4 cursor-pointer">
             <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8L36 16m0 0v12m0-12h8m-8 4v8m-12 4h.01M16 20h.01M20 16h.01M24 20h.01M12 24h.01M16 28h.01M20 24h.01M12 16h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-2 text-gray-400">
              <span className="font-semibold text-purple-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

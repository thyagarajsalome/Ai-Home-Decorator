"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { MAX_ROOM_DESCRIPTION_LENGTH, ROOM_TYPES } from "../constants";
import type { RoomType } from "../types";

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  onDescriptionChange: (description: string) => void;
  currentImage: File | null;
  currentDescription: string;
  disabled: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageChange,
  onDescriptionChange,
  currentImage,
  disabled,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage ? URL.createObjectURL(currentImage) : null
  );
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | "">("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    if (selectedRoomType === "Other") {
      onDescriptionChange(customDescription);
    } else if (selectedRoomType) {
      onDescriptionChange(selectedRoomType);
    } else {
      onDescriptionChange("");
    }
  }, [selectedRoomType, customDescription, onDescriptionChange]);

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1024;
          const scaleSize = MAX_WIDTH / img.width;

          if (scaleSize >= 1) {
            resolve(file);
            return;
          }

          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const newFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(newFile);
              } else {
                reject(new Error("Compression failed"));
              }
            },
            "image/jpeg",
            0.85
          );
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsCompressing(true);
        try {
          const originalFile = acceptedFiles[0];
          const compressedFile = await compressImage(originalFile);

          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }

          const newUrl = URL.createObjectURL(compressedFile);
          setPreviewUrl(newUrl);
          onImageChange(compressedFile);
        } catch (error) {
          console.error("Error processing image:", error);
          alert("Could not process this image. Please try another.");
        } finally {
          setIsCompressing(false);
        }
      }
    },
    [onImageChange, previewUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".webp"] },
    multiple: false,
    disabled: disabled || isCompressing,
  });

  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    onImageChange(null);
    setPreviewUrl(null);
    setSelectedRoomType("");
    setCustomDescription("");
  };

  const handleRoomTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as RoomType | "";
    setSelectedRoomType(value);
    if (value !== "Other") setCustomDescription("");
  };

  const handleCustomDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomDescription(event.target.value);
  };

  const characterCount =
    selectedRoomType === "Other"
      ? customDescription.length
      : selectedRoomType.length;
  const isTooLong = characterCount > MAX_ROOM_DESCRIPTION_LENGTH;

  return (
    <div
      className={`w-full transition-all duration-300 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-900/30 border border-purple-500/20 text-purple-400 text-sm font-bold">1</span>
        Upload & Describe Space
      </h2>

      <div
        {...getRootProps()}
        className={`relative w-full aspect-[4/3] sm:aspect-video rounded-2xl border-2 border-dashed ${
          isDragActive
            ? "border-purple-500 bg-purple-950/20 shadow-purple-500/5"
            : "border-gray-750 bg-obsidian-850 hover:border-gray-650 hover:bg-obsidian-800"
        } flex items-center justify-center text-center text-gray-400 cursor-pointer transition-all duration-200 p-4 overflow-hidden shadow-md`}
      >
        <input {...getInputProps()} disabled={disabled || isCompressing} />

        {isCompressing ? (
          <div className="flex flex-col items-center animate-fade">
            <svg
              className="w-10 h-10 text-purple-600 dark:text-purple-400 animate-spin mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-sm font-bold text-gray-800 dark:text-white tracking-wide">Optimizing Image...</p>
            <p className="text-xs text-gray-500 mt-1">Compressing files to maintain performance</p>
          </div>
        ) : previewUrl ? (
          <div className="w-full h-full relative group">
            <img
              src={previewUrl}
              alt="Room preview"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
              <span className="px-4 py-2 bg-purple-650 hover:bg-purple-600 text-white rounded-lg text-xs font-bold shadow-md transition-colors">
                Replace Photo
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 max-w-xs animate-fade">
            <div className="w-14 h-14 mx-auto rounded-full bg-obsidian-800 border border-gray-750 flex items-center justify-center text-gray-500 mb-4 group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-sm font-bold text-white mb-1">
              {isDragActive ? "Drop the files here..." : "Upload Room Photo"}
            </p>
            <p className="text-xs text-gray-400 leading-normal">
              Drag & drop or click to choose from system files. Supports PNG, JPEG, WEBP.
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[10px] font-semibold text-purple-400">
              Mobile Friendly Optimization Active
            </span>
          </div>
        )}

        {previewUrl && !disabled && !isCompressing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveImage();
            }}
            className="absolute top-3 right-3 bg-obsidian-950/80 hover:bg-obsidian-900 border border-gray-800 text-white p-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-red-650 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      {previewUrl && !isCompressing && (
        <div className="mt-5 animate-fade">
          <label
            htmlFor="room-type-select"
            className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wide"
          >
            Describe room context
          </label>
          <div className="relative mb-2">
            <select
              id="room-type-select"
              value={selectedRoomType}
              onChange={handleRoomTypeChange}
              disabled={disabled}
              className="block w-full appearance-none bg-obsidian-850 hover:bg-obsidian-800 border border-gray-750 text-white py-3.5 px-4 pr-10 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-sm transition-all"
            >
              <option value="" disabled>
                -- Select Room Category --
              </option>
              {ROOM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {selectedRoomType === "Other" && (
            <div className="mt-2.5 animate-fade">
              <input
                type="text"
                value={customDescription}
                onChange={handleCustomDescriptionChange}
                maxLength={MAX_ROOM_DESCRIPTION_LENGTH}
                disabled={disabled}
                placeholder="Describe your room here (e.g. empty library)..."
                className={`w-full p-3.5 rounded-xl bg-obsidian-850 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all ${
                  isTooLong ? "border-red-500 focus:ring-red-500" : "border-gray-750"
                }`}
              />
            </div>
          )}
          <p
            className={`text-right text-[10px] mt-1.5 font-semibold ${
              isTooLong ? "text-red-500 dark:text-red-400" : "text-gray-500"
            }`}
          >
            {characterCount} / {MAX_ROOM_DESCRIPTION_LENGTH} characters
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

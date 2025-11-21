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
            0.8
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
      className={`w-full transition-opacity duration-300 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* UPDATED: Heading color */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        1. Upload & Describe
      </h2>

      {/* UPDATED: Container background and border colors */}
      <div
        {...getRootProps()}
        className={`relative w-full aspect-video rounded-lg border-2 ${
          isDragActive
            ? "border-purple-500 bg-gray-100 dark:bg-gray-700"
            : "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
        } flex items-center justify-center text-center text-gray-500 dark:text-gray-400 cursor-pointer transition-colors duration-200 p-4 overflow-hidden`}
      >
        <input {...getInputProps()} disabled={disabled || isCompressing} />

        {isCompressing ? (
          <div className="flex flex-col items-center animate-pulse">
            <svg
              className="w-8 h-8 text-purple-500 animate-spin mb-2"
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
            <p>Optimizing for mobile...</p>
          </div>
        ) : previewUrl ? (
          <img
            src={previewUrl}
            alt="Room to decorate"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {/* UPDATED: Text colors */}
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-purple-500 dark:text-purple-400">
                {isDragActive ? "Drop image here..." : "Tap to Take Photo"}
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Optimized for Mobile
            </p>
          </div>
        )}

        {previewUrl && !disabled && !isCompressing && (
          // UPDATED: Button styling for visibility on light/dark images
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveImage();
            }}
            className="absolute top-2 right-2 bg-white/90 text-gray-800 hover:bg-white dark:bg-gray-900/70 dark:text-white dark:hover:bg-gray-800 px-3 py-1 rounded-md text-sm font-semibold transition-colors shadow-sm"
          >
            Change
          </button>
        )}
      </div>

      {previewUrl && !isCompressing && (
        <div className="mt-6">
          {/* UPDATED: Label color */}
          <label
            htmlFor="room-type-select"
            className="block text-gray-800 dark:text-gray-200 text-lg font-semibold mb-2"
          >
            Describe the room
          </label>
          <div className="relative mb-2">
            {/* UPDATED: Select background, text, border */}
            <select
              id="room-type-select"
              value={selectedRoomType}
              onChange={handleRoomTypeChange}
              disabled={disabled}
              className="block w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              <option value="" disabled>
                -- Select Room Type --
              </option>
              {ROOM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {selectedRoomType === "Other" && (
            <div className="mt-2">
              {/* UPDATED: Input background, text, border */}
              <input
                type="text"
                value={customDescription}
                onChange={handleCustomDescriptionChange}
                maxLength={MAX_ROOM_DESCRIPTION_LENGTH}
                disabled={disabled}
                placeholder="Describe your room here..."
                className={`w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border ${
                  isTooLong
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 disabled:opacity-70 disabled:cursor-not-allowed`}
              />
            </div>
          )}
          <p
            className={`text-right text-xs mt-1 ${
              isTooLong ? "text-red-500" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {characterCount}/{MAX_ROOM_DESCRIPTION_LENGTH}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

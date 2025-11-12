// ... (imports remain the same)
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MAX_ROOM_DESCRIPTION_LENGTH, ROOM_TYPES } from "../constants";
import type { RoomType } from "../types";

// ... (interface remains the same)
interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  onDescriptionChange: (description: string) => void;
  currentImage: File | null;
  currentDescription: string;
  disabled: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  // ... (props destructuring remains the same)
  onImageChange,
  onDescriptionChange,
  currentImage,
  disabled,
}) => {
  // ... (all state and handler logic remains unchanged)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage ? URL.createObjectURL(currentImage) : null
  );
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | "">("");
  const [customDescription, setCustomDescription] = useState<string>("");

  React.useEffect(() => {
    if (selectedRoomType === "Other") {
      onDescriptionChange(customDescription);
    } else if (selectedRoomType) {
      onDescriptionChange(selectedRoomType);
    } else {
      onDescriptionChange("");
    }
  }, [selectedRoomType, customDescription, onDescriptionChange]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        onImageChange(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    },
    [onImageChange, previewUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"],
    },
    multiple: false,
    disabled: disabled,
  });

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
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
    if (value !== "Other") {
      setCustomDescription("");
    }
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
      <h2 className="text-2xl font-bold text-gray-200 mb-4">
        1. Upload & Describe
      </h2>

      {/* Image Upload Area */}
      <div
        {...getRootProps()}
        className={`relative w-full aspect-video rounded-lg border-2 ${
          isDragActive
            ? "border-purple-500 bg-gray-700"
            : "border-gray-600 bg-gray-800"
        } flex items-center justify-center text-center text-gray-400 cursor-pointer transition-colors duration-200 p-4`}
      >
        {/*
          MODIFICATION HERE: 
          We spread getInputProps and add the 'capture' attribute.
          'environment' suggests using the back camera.
        */}
        <input {...getInputProps()} disabled={disabled} capture="environment" />

        {previewUrl ? (
          // ... (preview logic unchanged)
          <img
            src={previewUrl}
            alt="Room to decorate"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          // ... (placeholder unchanged)
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-gray-400"
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
            <p className="mt-2 text-gray-400">
              <span className="font-semibold text-purple-400">
                {isDragActive
                  ? "Drop the image here..."
                  : "Tap to Take Photo or Upload"}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
          </div>
        )}
        {previewUrl && !disabled && (
          // ... (remove image button unchanged)
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveImage();
            }}
            className="absolute top-2 right-2 bg-gray-900/70 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors"
            aria-label="Change Image"
          >
            Change Image
          </button>
        )}
      </div>

      {/* ... (rest of the component remains unchanged) ... */}
      {previewUrl && (
        <div className="mt-6">
          <label
            htmlFor="room-type-select"
            className="block text-gray-200 text-lg font-semibold mb-2"
          >
            Describe the room
          </label>
          <div className="relative mb-2">
            <select
              id="room-type-select"
              value={selectedRoomType}
              onChange={handleRoomTypeChange}
              disabled={disabled}
              className="block w-full appearance-none bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
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
              <label htmlFor="custom-room-description" className="sr-only">
                Custom Room Description
              </label>
              <input
                type="text"
                id="custom-room-description"
                value={customDescription}
                onChange={handleCustomDescriptionChange}
                maxLength={MAX_ROOM_DESCRIPTION_LENGTH}
                disabled={disabled}
                placeholder="Describe your room here..."
                className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${
                  isTooLong ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 disabled:opacity-70 disabled:cursor-not-allowed`}
              />
            </div>
          )}

          <p
            className={`text-right text-xs mt-1 ${
              isTooLong ? "text-red-500" : "text-gray-400"
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

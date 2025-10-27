import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MAX_ROOM_DESCRIPTION_LENGTH, ROOM_TYPES } from "../constants"; // Import ROOM_TYPES and MAX_ROOM_DESCRIPTION_LENGTH
import type { RoomType } from "../types"; // Import RoomType

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
  currentDescription,
  disabled,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage ? URL.createObjectURL(currentImage) : null
  );

  // State to manage selected room type (Living Room, Bedroom, Other, etc.)
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | "">(""); // Initialize as empty string
  // State to manage custom description when 'Other' is selected
  const [customDescription, setCustomDescription] = useState<string>("");

  // Effect to update currentDescription whenever selectedRoomType or customDescription changes
  React.useEffect(() => {
    if (selectedRoomType === "Other") {
      onDescriptionChange(customDescription);
    } else if (selectedRoomType) {
      onDescriptionChange(selectedRoomType);
    } else {
      onDescriptionChange(""); // Clear description if no room type is selected
    }
  }, [selectedRoomType, customDescription, onDescriptionChange]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onImageChange(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    },
    [onImageChange]
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
    if (currentImage) {
      URL.revokeObjectURL(previewUrl || ""); // Clean up previous object URL
    }
    onImageChange(null);
    setPreviewUrl(null);
  };

  const handleRoomTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as RoomType | "";
    setSelectedRoomType(value);
    // If user switches from 'Other', clear custom description
    if (value !== "Other") {
      setCustomDescription("");
    }
    // The useEffect will handle calling onDescriptionChange based on these state updates
  };

  const handleCustomDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomDescription(event.target.value);
    // The useEffect will handle calling onDescriptionChange based on these state updates
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
        } flex items-center justify-center text-gray-400 cursor-pointer transition-colors duration-200`}
      >
        <input {...getInputProps()} disabled={disabled} />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Room to decorate"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <p>
            {isDragActive
              ? "Drop the image here ..."
              : "Drag & drop an image, or click to select"}
          </p>
        )}
        {previewUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering dropzone click
              handleRemoveImage();
            }}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Change Image
          </button>
        )}
      </div>

      {/* Room Type Selection */}
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

        {/* Custom Description Input (conditionally rendered) */}
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
              maxLength={MAX_ROOM_DESCRIPTION_LENGTH} // Use constant for max length
              disabled={disabled}
              placeholder="e.g., A messy kitchen with wooden cabinets"
              className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${
                isTooLong ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 disabled:opacity-70 disabled:cursor-not-allowed`}
            />
          </div>
        )}

        {/* Character Counter */}
        <p
          className={`text-right text-sm mt-1 ${
            isTooLong ? "text-red-500" : "text-gray-400"
          }`}
        >
          {characterCount}/{MAX_ROOM_DESCRIPTION_LENGTH}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;

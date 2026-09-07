"use client";

import React, { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
}

export default function SafeImage({
  src,
  fallbackSrc,
  alt,
  className,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError && fallbackSrc) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

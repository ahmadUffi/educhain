import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

interface ImagesProps extends NextImageProps {
  fallbackSrc?: string;
}

function Images({
  src,
  alt = "Image",
  className = "",
  fallbackSrc = "/assets/images/no_image.png",
  ...props
}: ImagesProps) {
  const validSrc = !!src ? src : fallbackSrc;
  return (
    <NextImage {...props} src={validSrc} alt={alt} className={className} />
  );
}

export default Images;

"use client";
import React from "react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

type ParallaxImageProps = {
  src: string;
  alt: string;
};

const ParallaxImage = ({ src, alt }: ParallaxImageProps) => {
  return (
    <ParallaxBanner className="h-[calc(30vh)] w-full">
      <ParallaxBannerLayer image={src} speed={-8} />
    </ParallaxBanner>
  );
};

export default ParallaxImage;

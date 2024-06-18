"use client";
import React from "react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

// type HomeParallaxProps = {
//   imageUrl: string;
// };

const ParallaxImage = (/* {imageUrl}:HomeParallaxProps */) => {
  return (
    <ParallaxBanner className="h-[calc(30vh)] w-full">
      <ParallaxBannerLayer image="/img/min-temp.webp" speed={-8} />
    </ParallaxBanner>
  );
};

export default ParallaxImage;

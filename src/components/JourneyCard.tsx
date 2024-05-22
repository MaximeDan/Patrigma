import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./Icons";

// type JourneyCardProps = {
//   id: string;
//   title: string;
//   location: string;
//   description: string;
//   image: string;
//   cluesDifficulty: number;
//   physicalDifficulty: number;
//   commentsCount: number;
//   rating: number;
// };

const JourneyCard = (/* {
  id,
  title,
  location,
  description,
  cluesDifficulty,
  commentsCount,
  image,
  physicalDifficulty,
  rating,
}: JourneyCardProps */) => {
  const id = "1";
  return (
    <Link href={`/parcours/${id}`}>
      <Image
        width={500}
        height={500}
        src="https://via.assets.so/img.jpg?w=420&h=420&tc=blue&bg=#cecece&t=test"
        alt=""
      />
      <div>
        <h2>Titre</h2>
        {/* to do: add rating */}
        <div>
          <Icons.mapPin />
          <p>Normandie</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in
          sodales mauris.
        </p>
      </div>
    </Link>
  );
};

export default JourneyCard;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./Icons";
import Rating from "./Rating";
import { JourneyWithStepsAndComments } from "@/types/journey";
import { calculateAverageRating } from "@/app/utils/utils";

type JourneyCardProps = {
  journey: JourneyWithStepsAndComments;
};

const JourneyCard = ({ journey }: JourneyCardProps) => {
  const averageRate = calculateAverageRating(journey.comments);
  let phisicalDificulty = "facile";
  let cluesDificulty = "facile";

  switch (journey.physicalDifficulty) {
    case 1:
      phisicalDificulty = "facile";
      break;
    case 2:
      phisicalDificulty = "intermédiaire";
      break;
    case 3:
      phisicalDificulty = "difficile";
      break;
    default:
      phisicalDificulty = "facile";
      break;
  }

  switch (journey.cluesDifficulty) {
    case 1:
      cluesDificulty = "facile";
      break;
    case 2:
      cluesDificulty = "intermédiaire";
      break;
    case 3:
      cluesDificulty = "difficile";
      break;
    default:
      cluesDificulty = "facile";
      break;
  }

  return (
    <Link
      href={`/parcours/${journey.id}`}
      className="flex flex-col rounded-lg bg-gray"
    >
      <div className="relative">
        <div className="absolute left-4 flex gap-[6px]">
          <div className="flex items-center rounded-b-md bg-white px-2 py-[6px]">
            <Icons.dumbbel />
            <p className="text-sm font-semibold text-gray">
              {phisicalDificulty}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-b-md bg-green px-2 py-[6px]">
            <Icons.bulb />
            <p className="text-sm font-semibold text-gray">{cluesDificulty}</p>
          </div>
        </div>
        <Image
          width={500}
          height={500}
          src="/img/min-temp.webp"
          alt="journey image"
          className="h-44 w-full rounded-t-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-semibold">{journey.title}</h2>
        <Rating rating={averageRate} ratingCount={journey.comments.length} />
        <p className="mb-4 text-sm">{journey.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 text-orange">
            <Icons.mapPin fill="#d8552b" />
            {/* <p className="text-sm font-medium">{journey.steps[0].city}</p> */}
          </div>
          <Icons.arrowLink width={18} height={18} />
        </div>
      </div>
    </Link>
  );
};

export default JourneyCard;

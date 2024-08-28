import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./Icons";
import Rating from "./Rating";
import { JourneyWithStepsAndComments } from "@/types/journey";
import { calculateAverageRating } from "@/utils/utils";

type JourneyCardProps = {
  journey: JourneyWithStepsAndComments;
};

const JourneyCard = ({ journey }: JourneyCardProps) => {
  const averageRate = calculateAverageRating(journey.comments);
  let phisicalDificulty = "facile";
  let cluesDificulty = "facile";

  switch (journey.physicalDifficulty) {
    case 1:
      phisicalDificulty = "Facile";
      break;
    case 2:
      phisicalDificulty = "Intermédiaire";
      break;
    case 3:
      phisicalDificulty = "Difficile";
      break;
    default:
      phisicalDificulty = "Facile";
      break;
  }

  switch (journey.cluesDifficulty) {
    case 1:
      cluesDificulty = "Facile";
      break;
    case 2:
      cluesDificulty = "Intermédiaire";
      break;
    case 3:
      cluesDificulty = "Difficile";
      break;
    default:
      cluesDificulty = "Facile";
      break;
  }

  return (
    <Link
      href={`/parcours/${journey.id}`}
      className="flex flex-col rounded-lg bg-slate-200 w-25 shadow-xl"
    >
      <div className="relativ rounded-sm">
        <Image
          width={500}
          height={500}
          src={journey.image}
          alt="journey image"
          className="h-44 w-full rounded-t-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-semibold mb-2">{journey.title}</h2>
        <div className="flex mb-2">
          <div className="flex flex-wrap gap-[6px]">
            <div className="flex items-center flex-shrink-0 rounded-md bg-slate-300 px-2 py-[6px]">
              <Icons.dumbbel />
              <p className="text-sm font-semibold text-gray">
                {phisicalDificulty}
              </p>
            </div>
            <div className="flex items-center flex-shrink-0 gap-1 rounded-md bg-slate-300 px-2 py-[6px]">
              <Icons.bulb />
              <p className="text-sm font-semibold text-gray">
                {cluesDificulty}
              </p>
            </div>
          </div>
        </div>
        <p className="mb-4 text-sm">{journey.description}</p>
        <Rating rating={averageRate} ratingCount={journey.comments.length} />
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 text-orange">
            <Icons.mapPin />
            <p className="text-sm font-medium">{journey.steps[0].city}</p>
          </div>
          <Icons.arrowLink stroke="#ea580c" width={25} height={25} />
        </div>
      </div>
    </Link>
  );
};

export default JourneyCard;

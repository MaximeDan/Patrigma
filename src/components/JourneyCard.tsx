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
  return (
    <Link href={`/parcours/${journey.id}`} className="rounded-lg bg-gray">
      <div className="relative">
        <div className="absolute left-4 flex gap-[6px]">
          <div className="flex items-center rounded-b-md bg-white px-2 py-[6px]">
            <Icons.dumbbel />
            <p className="text-sm font-semibold text-gray">Facile</p>
          </div>
          <div className="flex items-center gap-1 rounded-b-md bg-green px-2 py-[6px]">
            <Icons.bulb />
            <p className="text-sm font-semibold text-gray">Intermédiaire</p>
          </div>
        </div>
        <Image
          width={500}
          height={500}
          src="/img/min-temp.webp"
          alt=""
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-col p-4">
        <h2 className="font-semibold">{journey.title}</h2>
        <Rating rating={averageRate} ratingCount={journey.comments.length} />
        <p className="text-sm">{journey.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-orange">
            <Icons.mapPin fill="#d8552b" />
            <p className="text-sm font-medium">{journey.steps[0].city}</p>
          </div>
          <Icons.arrowLink width={18} height={18} />
        </div>
      </div>
    </Link>
  );
};

export default JourneyCard;

import React, { Suspense } from "react";
import ParallaxImage from "@/components/clients/ParallaxImage";
import Rating from "@/components/Rating";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { buttonAction } from "@/types/enums/button";
import { getJourneyById } from "@/services/journeyService";
import { handleException } from "@/utils/errorHandlerUtils";
import { format } from "date-fns";
import { calculateAverageRating } from "@/utils/utils";

type Params = { id: string };

const getSingleJourney = async (id: string) => {
  try {
    const journey = await getJourneyById(Number(id));
    return journey;
  } catch (error: any) {
    handleException(error);
  }
};

const levelIntToText = (level: number) => {
  switch (level) {
    case 1:
      return "Facile";
    case 2:
      return "Intermédiaire";
    case 3:
      return "Difficile";
    default:
      return "Facile";
  }
};

const JourneyUI = async (id: string) => {
  const journey = await getSingleJourney(id);
  if (!journey) return;
  const averageRating = calculateAverageRating(journey.comments);
  return (
    <>
      <div className="relative">
        <ParallaxImage />
        <Button
          action={buttonAction.SET_JOURNEY_ID}
          ressourceId={parseInt(id)}
          className="absolute right-5 top-5 border-orange bg-gray"
        >
          <span>Créer un évènement</span>
          <Icons.arrowLink fill="#d8552b" className="ml-2" />
        </Button>
      </div>
      <div className="relative flex-1 rounded-t-2xl px-5 pb-40 pt-14">
        <div className="absolute left-4 top-0 flex gap-[6px]">
          <div className="flex items-center rounded-b-md bg-white px-2 py-[6px]">
            <Icons.dumbbel />
            <p className="text-sm font-semibold text-gray">
              {levelIntToText(journey.physicalDifficulty)}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-b-md bg-green px-2 py-[6px]">
            <Icons.bulb />
            <p className="text-sm font-semibold text-gray">
              {levelIntToText(journey.cluesDifficulty)}
            </p>
          </div>
        </div>
        <h1 className="text-xl font-extrabold text-orange">{journey.title}</h1>
        <div className="flex items-center gap-1 text-beige-600">
          <Icons.mapPin fill="rgba(206, 192, 173, 60%)" />
          <p className="text-sm font-medium">{journey.steps[0].city}</p>
        </div>
        <p>Créé le {format(new Date(journey.createdAt), "dd/MM/yyyy")}</p>

        <p className="text-sm">{journey.description}</p>
        <div className="mt-[18px] flex items-center justify-between text-lg font-semibold text-orange">
          <h2>Accessibilité</h2>
          <Icons.arrowLink />
        </div>
        <div className="mt-4 flex gap-6">
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.pmr />
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2  border-cadetblue bg-cadetblue-600">
            <Icons.partiallySighted />
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.partiallyDeaf />
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.cognitivelyImpaired />
          </div>
        </div>
        <h2 className="mt-[18px] text-lg font-semibold text-orange">
          Pré-requis
        </h2>
        <p>{journey.requirement}</p>

        <h2 className="mt-[18px] text-lg font-semibold text-orange">
          Commentaires
        </h2>
        <div className="flex flex-col gap-1">
          <Rating
            rating={averageRating}
            ratingCount={journey.comments.length}
          />
          {journey.comments.map((comment) => (
            <div key={comment.id} className="mb-3 flex flex-col gap-1">
              <p>{comment.content}</p>
              <p className="text-sm text-camel">
                ({format(new Date(comment.createdAt), "dd/MM/yyyy")})
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const JourneyDetail = ({ params }: { params: Params }) => {
  // get journey by id
  return (
    <main className="flex min-h-screen flex-col bg-gray">
      <Suspense fallback={<div>Loading...</div>}>
        {JourneyUI(params.id)}
      </Suspense>
    </main>
  );
};

export default JourneyDetail;

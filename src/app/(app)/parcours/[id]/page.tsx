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
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";

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

// const LevelBullet = ({ level }: { level: string }) => {
//   switch (level) {
//     case "unaccessible":
//       return (
//         <div className="absolute right-[6px] top-[6px] size-[10px] rounded-full bg-level-1" />
//       );
//     case "partiallyAccessible":
//       return (
//         <div className="absolute right-[6px] top-[6px] size-[10px] rounded-full bg-level-2" />
//       );
//     case "accessible":
//       return (
//         <div className="absolute right-[6px] top-[6px] size-[10px] rounded-full bg-level-3" />
//       );
//     default:
//       return (
//         <div className="absolute right-[6px] top-[6px] size-[10px] rounded-full bg-level" />
//       );
//   }
// };

const JourneyUI = async (id: string) => {
  const journey = await getSingleJourney(id);
  if (!journey) return notFound();

  const averageRating = calculateAverageRating(journey.comments);
  return (
    <div className="mx-auto mb-10 w-full max-w-[920px] bg-slate-100 shadow-xl">
      <div className="relative">
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
        <ParallaxImage src={journey.image} alt={journey.title} />
        <Button
          action={buttonAction.SET_JOURNEY_ID}
          ressourceId={parseInt(id)}
          className="absolute right-5 top-5 border-orange bg-orange p-2 text-white shadow-xl hover:bg-orange"
        >
          <span>Créer un évènement</span>
          <Icons.arrowLink
            stroke="#f0f0f0"
            width={20}
            height={20}
            className="ml-2"
          />
        </Button>
      </div>
      <div className="flex-1 rounded-t-2xl px-5 pb-40 pt-14">
        <h1 className="text-xl font-extrabold text-orange">{journey.title}</h1>
        <div className="flex items-center gap-1 font-semibold text-orange-600">
          <Icons.mapPin />
          <p>{journey.steps[0].city}</p>
        </div>
        <p>Créé le {format(new Date(journey.createdAt), "dd/MM/yyyy")}</p>

        <p className="text-sm">{journey.description}</p>
        <div className="mt-[18px] flex items-center justify-between text-lg font-semibold text-orange">
          <h2>Accessibilité</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-6 text-center">
          {/* <div className="relative flex aspect-[1/1] max-h-32 max-w-32 flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-white">
            <LevelBullet level={journey.mobilityImpaired} />
            <Icons.pmr />
          </div> */}
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange bg-slate-200 p-2 shadow-md">
            <Icons.pmr />
            <p className="text-sm">{journey.mobilityImpaired}</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange bg-slate-200 p-2 shadow-md">
            <Icons.partiallySighted />
            <p className="text-sm">{journey.partiallySighted}</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange bg-slate-200 p-2 shadow-md">
            <Icons.partiallyDeaf />
            <p className="text-sm">{journey.partiallyDeaf}</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange bg-slate-200 p-2 shadow-md">
            <Icons.cognitivelyImpaired />
            <p className="text-sm">{journey.cognitivelyImpaired}</p>
          </div>
          {/* <div className="relative flex aspect-[1/1] max-h-32 max-w-32 flex-1 items-center justify-center rounded-lg border-2  border-cadetblue bg-white">
            <LevelBullet level={journey.partiallySighted} />
            <Icons.partiallySighted />
          </div>
          <div className="relative flex aspect-[1/1] max-h-32 max-w-32 flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-white">
            <LevelBullet level={journey.partiallyDeaf} />
            <Icons.partiallyDeaf />
          </div>
          <div className="relative flex aspect-[1/1] max-h-32 max-w-32 flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-white">
            <LevelBullet level={journey.cognitivelyImpaired} />
            <Icons.cognitivelyImpaired />
          </div> */}
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
              <p className="text-sm text-gray-200">
                ({format(new Date(comment.createdAt), "dd/MM/yyyy")})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JourneyDetail = ({ params }: { params: Params }) => {
  // get journey by id
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <Suspense fallback={<div>Loading...</div>}>
        {JourneyUI(params.id)}
      </Suspense>
    </main>
  );
};

export default JourneyDetail;

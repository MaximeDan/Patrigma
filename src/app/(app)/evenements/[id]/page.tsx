import React, { Suspense } from "react";
import ParallaxImage from "@/components/clients/ParallaxImage";
import { Icons } from "@/components/Icons";
import TopBar from "@/components/TopBar";
import Rating from "@/components/Rating";
import { format } from "date-fns";
import { getEventByIdWithUserEvents } from "@/services/eventService";
import { getJourneyById } from "@/services/journeyService";
import { notFound } from "next/navigation";
import ParticipantActions from "@/components/clients/ParticipantActions";
import EventMap from "@/components/clients/EventMap";

type Params = { id: string };

const EventDetail = async ({ params }: { params: Params }) => {
  const event = await getEventByIdWithUserEvents(Number(params.id));
  if (!event) return notFound();

  const journey = await getJourneyById(event.journeyId);
  if (!journey) return notFound();

  const participantCount = event.userEvents.length;
  const firstStep = journey.steps[0];

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <div className="mx-auto max-w-[920px]">
        <ParallaxImage src={event.image} alt={event.title} />
        <div className="-translate-y-4 bg-slate-100 px-5 pb-5 pt-7 shadow-lg">
          <div className="flex justify-between">
            <Suspense fallback={<div>Loading actions...</div>}>
              <ParticipantActions
                event={event}
                participantCount={participantCount}
              />
            </Suspense>
          </div>
          <h1 className="mb-5 mt-4 text-4xl font-extrabold text-orange">
            {event.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-orange">
              <Icons.mapPin />
              <p className="text-sm font-medium text-orange">
                {firstStep?.city || "Unknown"}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm">{event.description}</p>

          <h2 className="mb-2 mt-8 text-lg font-semibold text-orange">
            Détails de l'événement
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-slate-200 px-2 py-1 shadow-md">
              <Icons.dumbbel />
              <p className="text-sm font-semibold text-gray-200">
                {journey.physicalDifficulty}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-slate-200 px-2 py-1 shadow-md">
              <Icons.bulb />
              <p className="text-sm font-semibold text-gray-200">
                {journey.cluesDifficulty}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-slate-200 px-2 py-1 shadow-md">
              <Icons.nbUsers fill="black" />
              <p className="text-sm font-semibold text-gray-200">
                {event.numberPlayerMin}-{event.numberPlayerMax}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-slate-200 px-2 py-1 shadow-md">
              <Icons.agenda />
              <p className="text-sm font-semibold text-gray-200">
                {format(new Date(event.startAt), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-semibold">
              Participants actuels: {participantCount}
            </p>
          </div>
          {firstStep && (
            <>
              <h2 className="mt-8 text-lg font-semibold text-orange">Map</h2>
              <EventMap
                longitude={firstStep.longitude}
                latitude={firstStep.latitude}
                name={firstStep.puzzle}
              />
            </>
          )}

          <h2 className="mt-8 text-lg font-semibold text-orange">
            Accessibilité
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange bg-slate-200 p-2 shadow-md">
              <Icons.pmr />
              <p className="mt-1 text-sm">{journey.mobilityImpaired}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange bg-slate-200 p-2 shadow-md">
              <Icons.partiallySighted />
              <p className="mt-1 text-sm">{journey.partiallySighted}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange bg-slate-200 p-2 shadow-md">
              <Icons.partiallyDeaf />
              <p className="mt-1 text-sm">{journey.partiallyDeaf}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange bg-slate-200 p-2 shadow-md">
              <Icons.cognitivelyImpaired />
              <p className="mt-1 text-sm">{journey.cognitivelyImpaired}</p>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-semibold text-orange">Pré-requis</h2>
          <p className="">{journey.requirement}</p>

          <div className="mt-8 flex flex-col items-start gap-4 rounded-lg border border-orange bg-slate-100 p-4 shadow-xl">
            <h2 className="text-lg font-semibold text-orange">Parcours</h2>
            <div className="flex flex-col items-start gap-2 rounded-lg pl-4">
              <div className="flex w-full items-center gap-4 rounded-lg border border-gray-600 bg-slate-200 p-4 shadow-md">
                <ParallaxImage
                  src={
                    journey.steps[0]?.picturePuzzle ||
                    "https://picsum.photos/200"
                  }
                  alt={journey.steps[0]?.puzzle}
                />
                <div>
                  <h3 className=" text-lg font-semibold">{journey.title}</h3>
                  <p className=" text-sm">
                    {journey.steps[0]?.city || "Unknown"}
                  </p>
                  <div className="flex items-center">
                    <Rating
                      rating={
                        journey.comments.length > 0
                          ? journey.comments.reduce(
                              (sum, comment) => sum + (comment.rating ?? 0),
                              0,
                            ) / journey.comments.length
                          : 0
                      }
                      ratingCount={journey.comments.length}
                      hasCommentCount
                    />
                  </div>
                </div>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-orange">
                Commentaires
              </h2>
              <div className="rounded-lg pl-2">
                {journey.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="mt-2 rounded-lg border border-gray-600 bg-slate-200 p-4 shadow-md"
                  >
                    {comment.rating !== null && (
                      <Rating rating={comment.rating} ratingCount={1} />
                    )}
                    <p className=" mt-2 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetail;

"use client";

import React, { useEffect, useState } from "react";
import ParallaxImage from "@/components/clients/ParallaxImage";
import Rating from "@/components/Rating";
import { Icons } from "@/components/Icons";
import TopBar from "@/components/TopBar";
import dynamic from "next/dynamic";
import { UserEvent, Event } from "@prisma/client";
import { JourneyWithStepsAndComments } from "@/types/journey";
import { format } from "date-fns";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LeafletEventMap = dynamic(() => import("@/components/map/EventMap"), {
  ssr: false,
});

type Params = { id: number };

const EventDetail = ({ params }: { params: Params }) => {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [journey, setJourney] = useState<JourneyWithStepsAndComments | null>(
    null,
  );
  const [isJoined, setIsJoined] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${params.id}`,
        );
        const eventData = await eventResponse.json();
        setEvent(eventData.data);
        setParticipantCount(eventData.data.userEvents.length);

        const journeyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/journeys/${eventData.data.journeyId}`,
        );
        const journeyData = await journeyResponse.json();
        setJourney(journeyData.data);

        if (session) {
          const userJoined = eventData.data.userEvents.some(
            (userEvent: UserEvent) => userEvent.userId === session.user.id,
          );
          setIsJoined(userJoined);
        }
      } catch (error) {
        console.error("Error fetching event or journey data:", error);
      }
    };

    fetchEventData();
  }, [params.id, session]);

  const handleJoin = async () => {
    if (!session) {
      signIn();
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${event!.id}/join/${session!.user.id}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${session!.accessToken}`,
          },
        },
      );
      if (response.ok) {
        setIsJoined(true);
        setParticipantCount(participantCount + 1);
      } else {
        console.error("Failed to join the event");
      }
    } catch (error) {
      console.error("Error joining the event:", error);
    }
  };

  const handleLeave = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${event!.id}/leave/${session!.user.id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${session!.accessToken}`,
          },
        },
      );
      if (response.ok) {
        setIsJoined(false);
        setParticipantCount(participantCount - 1);
      } else {
        console.error("Failed to leave the event");
      }
    } catch (error) {
      console.error("Error leaving the event:", error);
    }
  };

  const handleStart = async () => {
    router.push(`${params.id}/start`);
  };

  if (!event || !journey) {
    return <div>Loading...</div>;
  }

  const firstStep = journey?.steps?.[0];
  const isEventStartable = isJoined && new Date() >= new Date(event.startAt);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <div className="mx-auto max-w-[920px]">
        <ParallaxImage src={event.image} alt={event.title} />
        <div className="-translate-y-4 px-5 pb-5 pt-7 shadow-lg bg-slate-100">
          <div className="flex justify-between">
            <div>
              {isEventStartable && (
                <div>
                  <Button
                    className="mt-1 border-blue-700 bg-blue-600 text-white p-2 shadow-xl hover:bg-blue-500"
                    onClick={handleStart}
                  >
                    <span>Lancer l'événement</span>
                    <Icons.arrowLink
                      stroke="#f0f0f0"
                      width={20}
                      height={20}
                      className="ml-2"
                    />{" "}
                  </Button>
                </div>
              )}
            </div>
            <div>
              {isJoined ? (
                // <button
                //   onClick={handleLeave}
                //   className="rounded bg-red-500 min-w-10 px-4 py-2 text-white"
                // >
                //   Quitter
                // </button>
                <Button
                  className="mt-1 border-red-600 bg-red-600 text-white p-2 hover:bg-red-500 shadow-xl"
                  onClick={handleLeave}
                >
                  <span>Quitter l'évènement</span>
                  <Icons.close width={14} height={14} className="ml-2" />
                </Button>
              ) : (
                // <button
                //   onClick={handleJoin}
                //   className="rounded bg-orange px-4 py-2 text-white"
                // >
                //   Rejoindre
                // </button>
                <Button
                  onClick={handleJoin}
                  type="submit"
                  className="mt-1 border-orange bg-orange hover:bg-orange-500 shadow-xl text-white p-2"
                >
                  <span>Rejoindre</span>
                  <Icons.arrowLink
                    stroke="#f0f0f0"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                </Button>
              )}
            </div>
          </div>
          <h1 className="mt-4 text-4xl mb-5 font-extrabold text-orange-500">
            {event.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-orange-500">
              <Icons.mapPin />
              <p className="text-sm font-medium text-orange-500">
                {journey.steps[0]?.city || "Unknown"}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm">{event.description}</p>

          <h2 className="mt-8 text-lg font-semibold text-orange-500 mb-2">
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
            <p className="font-semibold text-sm">
              Participants actuels: {participantCount}
            </p>
          </div>
          {firstStep && (
            <>
              <h2 className="mt-8 text-lg font-semibold text-orange-500">
                Map
              </h2>
              <LeafletEventMap
                longitude={firstStep.longitude}
                latitude={firstStep.latitude}
                name={firstStep.puzzle}
              />
            </>
          )}

          <h2 className="mt-8 text-lg font-semibold text-orange-500">
            Accessibilité
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 text-center">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange-500 bg-slate-200 p-2 shadow-md">
              <Icons.pmr />
              <p className="text-md mt-1">{journey.mobilityImpaired}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange-500 bg-slate-200 p-2 shadow-md">
              <Icons.partiallySighted />
              <p className="text-md mt-1">{journey.partiallySighted}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange-500 bg-slate-200 p-2 shadow-md">
              <Icons.partiallyDeaf />
              <p className="text-md mt-1">{journey.partiallyDeaf}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-orange-500 bg-slate-200 p-2 shadow-md">
              <Icons.cognitivelyImpaired />
              <p className="text-md mt-1">{journey.cognitivelyImpaired}</p>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-semibold text-orange-500">
            Pré-requis
          </h2>
          <p className="">{journey.requirement}</p>

          <div className="mt-8 flex flex-col items-start gap-4 rounded-lg border border-orange-500 p-4 bg-slate-100 shadow-xl">
            <h2 className="text-lg font-semibold text-orange-500">Parcours</h2>
            <div className="flex flex-col items-start gap-2 rounded-lg pl-4">
              <div className="flex w-full items-center gap-4 rounded-lg border border-gray-600 p-4 bg-slate-200 shadow-md">
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
                    />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-5 text-lg font-semibold text-orange-500">
              Commentaires
            </h2>
            <div className="rounded-lg pl-2">
              {journey.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="mt-2 rounded-lg border border-gray-600 p-4 shadow-md bg-slate-200"
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
    </main>
  );
};

export default EventDetail;

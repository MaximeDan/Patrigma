"use client";

import React, { useEffect, useState } from "react";
import ParallaxImage from "@/components/clients/ParallaxImage";
import Rating from "@/components/Rating";
import { Icons } from "@/components/Icons";
import TopBar from "@/components/TopBar";
import dynamic from "next/dynamic";
import { UserEvent, Event } from "@prisma/client";
import { JourneyWithStepsAndComments } from "@/types/journey";

const LeafletEventMap = dynamic(() => import("@/components/map/EventMap"), {
  ssr: false,
});

type Params = { id: number };

const EventDetail = ({ params }: { params: Params }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [journey, setJourney] = useState<JourneyWithStepsAndComments | null>(
    null,
  );
  const [isJoined, setIsJoined] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);

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

        const userJoined = eventData.data.userEvents.some(
          (userEvent: UserEvent) => userEvent.userId === 7, // Replace 7 with the actual user ID
        );
        setIsJoined(userJoined);
      } catch (error) {
        console.error("Error fetching event or journey data:", error);
      }
    };

    fetchEventData();
  }, [params.id]);

  const handleJoin = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${event!.id}/join/2`, // Replace 1 with the actual user ID
        {
          method: "POST",
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${event!.id}/leave/2`, // Replace 1 with the actual user ID
        {
          method: "DELETE",
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

  if (!event || !journey) {
    return <div>Loading...</div>;
  }

  const formatDateTime = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString)
      .toLocaleDateString("fr-FR", options)
      .replace(",", " à");
  };

  // @ts-ignore
  const firstStep = journey?.steps?.[0];

  return (
    <main className="flex min-h-screen flex-col bg-gray">
      <TopBar />
      <div className="mx-auto max-w-[920px]">
        <ParallaxImage src={event.image} alt={event.title} />
        <div className="relative flex-1 -translate-y-4 rounded-t-2xl px-5 pb-40 pt-14 shadow-lg">
          <div className="absolute right-4 top-4">
            {isJoined ? (
              <button
                onClick={handleLeave}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Quitter
              </button>
            ) : (
              <button
                onClick={handleJoin}
                className="rounded bg-green-500 px-4 py-2 text-white"
              >
                Rejoindre
              </button>
            )}
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-orange-400">
            {event.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-orange-400">
              <Icons.mapPin fill="rgba(206, 192, 173, 60%)" />
              <p className="text-sm font-medium text-orange-400">
                {journey.steps[0]?.city || "Unknown"}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm">{event.description}</p>

          <h2 className="mt-8 text-lg font-semibold text-orange-400">
            Détails de l'événement
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 shadow-sm">
              <Icons.dumbbel />
              <p className="text-sm font-semibold text-gray-200">
                {journey.physicalDifficulty}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-green-700 px-2 py-1 shadow-sm">
              <Icons.bulb />
              <p className="text-sm font-semibold text-gray-200">
                {journey.cluesDifficulty}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 shadow-sm">
              <Icons.nbUsers fill="black" />
              <p className="text-sm font-semibold text-gray-200">
                {event.numberPlayerMin}-{event.numberPlayerMax}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 shadow-sm">
              <Icons.agenda />
              <p className="text-sm font-semibold text-gray-200">
                {formatDateTime(event.startAt)}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm ">Participants actuels: {participantCount}</p>
          </div>
          {firstStep && (
            <>
              <h2 className="mt-8 text-lg font-semibold text-orange-700">
                Map
              </h2>
              <LeafletEventMap
                longitude={firstStep.longitude}
                latitude={firstStep.latitude}
                name={firstStep.puzzle}
              />
            </>
          )}

          <h2 className="mt-8 text-lg font-semibold text-orange-400">
            Accessibilité
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600 p-2 text-white">
              <Icons.pmr />
              <p className="text-sm">{journey.mobilityImpaired}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600 p-2 text-white">
              <Icons.partiallySighted />
              <p className="text-sm">{journey.partiallySighted}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600 p-2 text-white">
              <Icons.partiallyDeaf />
              <p className="text-sm">{journey.partiallyDeaf}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600 p-2 text-white">
              <Icons.cognitivelyImpaired />
              <p className="text-sm">{journey.cognitivelyImpaired}</p>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-semibold text-orange-400">
            Pré-requis
          </h2>
          <p className="">{journey.requirement}</p>

          <div className="mt-8 flex flex-col items-start gap-4 rounded-lg border border-gray-300 p-4 text-white shadow-sm">
            <h2 className="text-lg font-semibold text-orange-400">Parcours</h2>
            <div className="flex flex-col items-start gap-4 rounded-lg  p-4">
              <div className="flex w-full items-center gap-4 rounded-lg border border-gray-600 p-4 shadow-sm">
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
                        journey.comments.reduce(
                          (sum, comment) => sum + comment.rating,
                          0,
                        ) / journey.comments.length
                      }
                      ratingCount={journey.comments.length}
                    />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-8 text-lg font-semibold text-orange-400">
              Commentaires
            </h2>
            <div className="rounded-lg p-4">
              {journey.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="mt-2 rounded-lg border border-gray-600 p-4 shadow-sm"
                >
                  <Rating rating={comment.rating} ratingCount={1} />
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

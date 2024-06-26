"use client";

import React, { useEffect, useState } from "react";
import ParallaxImage from "@/components/clients/ParallaxImage";
import Rating from "@/components/Rating";
import { Icons } from "@/components/Icons";
import Image from "next/image";

type Params = { id: number };

const EventDetail = ({ params }: { params: Params }) => {
  const [event, setEvent] = useState(null);
  const [journey, setJourney] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${params.id}`,
        );
        const eventData = await eventResponse.json();
        setEvent(eventData.data);

        const journeyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/journeys/${eventData.data.journeyId}`,
        );
        const journeyData = await journeyResponse.json();
        setJourney(journeyData.data);

        // Check if the user is already joined (mock implementation)
        // This should be replaced with actual logic to check user participation
        const userJoined = eventData.data.userEvents.some(
          (userEvent) => userEvent.userId === 7, // Replace 7 with the actual user ID
        );
        setIsJoined(userJoined);
      } catch (error) {
        console.error("Error fetching event or journey data:", error);
      }
    };

    fetchEventData();
  }, [params.id]);

  const handleJoin = () => {
    // Mock join event
    setIsJoined(true);
  };

  const handleLeave = () => {
    // Mock leave event
    setIsJoined(false);
  };

  if (!event || !journey) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray">
      <ParallaxImage src={event.image} alt={event.title} />
      <div className="relative flex-1 -translate-y-4 rounded-t-2xl px-5 pb-40 pt-14">
        <div className="absolute left-4 top-0 flex gap-[6px]">
          <div className="flex items-center rounded-b-md bg-white px-2 py-[6px]">
            <Icons.dumbbel />
            <p className="text-sm font-semibold text-gray">
              {journey.physicalDifficulty}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-b-md bg-green px-2 py-[6px]">
            <Icons.bulb />
            <p className="text-sm font-semibold text-gray">
              {journey.cluesDifficulty}
            </p>
          </div>
        </div>
        <h1 className="text-xl font-extrabold text-orange">{event.title}</h1>
        <div className="flex items-center gap-1 text-beige-600">
          <Icons.mapPin fill="rgba(206, 192, 173, 60%)" />
          <p className="text-sm font-medium">Paris</p>
        </div>
        <p>
          Par {event.authorId}, le{" "}
          {new Date(event.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm">{event.description}</p>

        <div className="mt-[18px] flex items-center justify-between text-lg font-semibold text-orange">
          <h2>Accessibilité</h2>
          <Icons.arrowLink />
        </div>
        <div className="mt-4 flex gap-6">
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.pmr />
            <p className="text-sm">{journey.mobilityImpaired}</p>
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.partiallySighted />
            <p className="text-sm">{journey.partiallySighted}</p>
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.partiallyDeaf />
            <p className="text-sm">{journey.partiallyDeaf}</p>
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.cognitivelyImpaired />
            <p className="text-sm">{journey.cognitivelyImpaired}</p>
          </div>
        </div>

        <h2 className="mt-[18px] text-lg font-semibold text-orange">
          Pré-requis
        </h2>
        <p>{journey.requirement}</p>

        <h2 className="mt-[18px] text-lg font-semibold text-orange">
          Commentaires
        </h2>
        <div className="flex gap-1">
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
        <div>
          {journey.comments.map((comment) => (
            <div key={comment.id} className="mt-2">
              <p className="text-sm">{comment.content}</p>
              <p className="text-sm font-semibold">Rating: {comment.rating}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-[18px] text-lg font-semibold text-orange">
          Journey Steps
        </h2>
        {journey.steps.map((step, index) => (
          <div key={index} className="mt-2">
            <Image
              src={step.picturePuzzle}
              alt={`Step picture ${index + 1}`}
              className="mt-2 w-full rounded-lg"
              width={800}
              height={400}
            />
            <p>{step.puzzle}</p>
            <p>
              <strong>Hint:</strong> {step.hint}
            </p>
            <p>
              <strong>Address:</strong> {step.address}, {step.city},{" "}
              {step.postalCode}, {step.country}
            </p>
          </div>
        ))}
        <p>{journey.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-lg font-semibold">
            {event.userEvents.length} participants
          </p>
          {isJoined ? (
            <button
              onClick={handleLeave}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Leave
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="rounded bg-green-500 px-4 py-2 text-white"
            >
              Join
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default EventDetail;

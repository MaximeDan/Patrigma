"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Event, Journey, Step } from "@prisma/client";
import TopBar from "@/components/TopBar";

const LeafletEventMap = dynamic(() => import("@/components/map/EventMap"), {
  ssr: false,
});

type Params = { id: number };

const EventStart = ({ params }: { params: Params }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [journey, setJourney] = useState<Journey | null>(null);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

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

        if (journeyData.data.steps.length > 0) {
          setCurrentStep(journeyData.data.steps[0]);
        }
      } catch (error) {
        console.error("Error fetching event or journey data:", error);
      }
    };

    fetchEventData();
  }, [params.id]);

  const handleCheckAnswer = () => {
    if (userAnswer.toLowerCase() === currentStep!.answer.toLowerCase()) {
      if (stepIndex < journey!.steps.length - 1) {
        setStepIndex(stepIndex + 1);
        setCurrentStep(journey!.steps[stepIndex + 1]);
        setShowHint(false);
        setUserAnswer("");
      } else {
        alert("Congratulations! You've completed the event.");
      }
    } else {
      alert("Incorrect answer. Try again or use a hint.");
    }
  };

  if (!event || !journey || !currentStep) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopBar />
      <main className="flex min-h-screen flex-col bg-gray">
        <div className="relative flex-1 px-5 pb-40 pt-14">
          <h1 className="text-xl font-extrabold text-orange-400">
            {event.title}
          </h1>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-orange-400">
              Step {stepIndex + 1}
            </h2>
            <div className="my-4">
              <LeafletEventMap
                longitude={currentStep.longitude}
                latitude={currentStep.latitude}
                name={currentStep.puzzle}
              />
            </div>
            <p className="text-sm">{currentStep.puzzle}</p>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="flex-1 rounded-md border p-2"
                placeholder="Your answer"
              />
              <button
                onClick={handleCheckAnswer}
                className="ml-4 rounded-md bg-orange p-2 text-white"
              >
                Submit
              </button>
            </div>
            {showHint && <p className="mt-2 text-sm">{currentStep.hint}</p>}
            <button
              onClick={() => setShowHint(true)}
              className="mt-4 rounded-md bg-gray-200 p-2 text-gray-700"
            >
              Show Hint
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventStart;

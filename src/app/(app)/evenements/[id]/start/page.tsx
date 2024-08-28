"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Event, Step } from "@prisma/client";
import TopBar from "@/components/TopBar";
import { JourneyWithStepsAndComments } from "@/types/journey";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

const LeafletEventMap = dynamic(() => import("@/components/map/EventMap"), {
  ssr: false,
});

type Params = { id: number };

const EventStart = ({ params }: { params: Params }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [journey, setJourney] = useState<JourneyWithStepsAndComments | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

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
      if (journey && stepIndex < journey.steps.length - 1) {
        setStepIndex(stepIndex + 1);
        setCurrentStep(journey.steps[stepIndex + 1]);
        setShowHint(false);
        setUserAnswer("");
        setFeedbackMessage("");
        setIsError(false);
      } else {
        setFeedbackMessage("Félicitations ! Vous avez terminé l'évènements.");
        setIsError(false);
      }
    } else {
      setFeedbackMessage("Mauvaise réponse. Réessayez !");
      setIsError(true);
    }
  };

  if (!event || !journey || !currentStep) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopBar />
      <main className="flex min-h-screen flex-col bg-background">
        <div>
          <div className="relative flex-1 px-5 pb-40 pt-14">
            <h1 className="text-xl font-extrabold text-orange-500">
              {event.title}
            </h1>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-orange-500">
                Etape n°{stepIndex + 1}
              </h2>
              <div className="my-4 ">
                <LeafletEventMap
                  longitude={currentStep.longitude}
                  latitude={currentStep.latitude}
                  name={currentStep.puzzle}
                />
              </div>
              <p className="text-sm">{currentStep.puzzle}</p>
              <div className="mt-4 flex  items-start">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="rounded-md border p-2 text-black"
                  placeholder="Votre réponse"
                />
                {/* <button
                  onClick={handleCheckAnswer}
                  className="ml-4 rounded-md bg-orange p-2 text-white hover:bg-orange-500 shadow-xl"
                >
                  Valider
                </button> */}
                <Button
                  className="ml-2 border-orange bg-orange p-2 text-white shadow-xl hover:bg-orange-500"
                  type="button"
                  onClick={handleCheckAnswer}
                >
                  <span>Valider</span>
                  <Icons.arrowLink
                    stroke="#f0f0f0"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                </Button>
              </div>
              {feedbackMessage && (
                <p
                  className={`mt-2 text-sm ${isError ? "text-red-500" : "text-green-500"}`}
                >
                  {feedbackMessage}
                </p>
              )}

              <Button
                className="mt-2 border-yellow-500 bg-yellow-500 p-2 text-white shadow-xl hover:bg-yellow-400"
                onClick={() => setShowHint(!showHint)}
              >
                <span>Voir l'indice</span>
              </Button>
              {showHint && <p className="mt-2 text-sm">{currentStep.hint}</p>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventStart;

"use client";
import React, { useState } from "react";
import {
  journeyFormSchema,
  firstStepSchema,
  secondStepSchema,
  thirdStepSchema,
  forthStepSchema,
} from "@/validators/journeyFormSchema";
import { z } from "zod";
import { useJourneyFormStore } from "@/store/journeyFormStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import StepCounter from "../StepCounter";
import Steps from "./steps/Steps";
import { Icons } from "@/components/Icons";
import { StepWithoutDates } from "@/types/step";
import { JourneyWithoutDates } from "@/types/journey";

export type JourneyFormValues = z.infer<typeof journeyFormSchema>;
type FieldName = keyof JourneyFormValues;

type JourneyStep = {
  steps: {
    puzzle: string;
    hint: string;
    answer: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }[];
};

const firstStepFields = Object.keys(firstStepSchema.shape);
const secondStepFields = Object.keys(secondStepSchema.shape);
const thirdStepFields = Object.keys(thirdStepSchema.shape);
const forthStepFields = Object.keys(forthStepSchema.shape);

const steps = [
  {
    fields: firstStepFields,
  },
  {
    fields: secondStepFields,
  },
  {
    fields: thirdStepFields,
  },
  {
    fields: forthStepFields,
  },
];

const JourneyForm = () => {
  const { isVisible, hideModal, clearSteps } = useJourneyFormStore();
  const [formStatus, setFormStatus] = useState<"idle" | "errored">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  const form = useForm<JourneyFormValues>({
    resolver: zodResolver(journeyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      requirement: "",
      mobilityImpaired: "undefined",
      partiallySighted: "undefined",
      partiallyDeaf: "undefined",
      cognitivelyImpaired: "undefined",
      steps: "",
      treasure: "",
    },
  });

  const processForm: SubmitHandler<JourneyFormValues> = async (data) => {
    console.log("processing form");
    const { steps, ...journey } = data;

    const parsedSteps: JourneyStep = JSON.parse(steps);
    const stepObject: StepWithoutDates[] = parsedSteps.steps.map(
      (step, index) => {
        // to do : get optional additional location fields (city, country, address, postal code)
        return {
          puzzle: step.puzzle,
          hint: step.hint,
          answer: step.answer,
          latitude: step.coordinates.latitude,
          longitude: step.coordinates.longitude,
          stepNumber: index + 1,
          pictureHint: undefined,
          picturePuzzle: undefined,
        };
      },
    );

    // to do : estimate distance and duration from steps

    // get user id from session
    const journeyObject: JourneyWithoutDates = {
      authorId: 1,
      title: journey.title,
      description: journey.description,
      requirement: journey.requirement,
      mobilityImpaired: journey.mobilityImpaired,
      partiallySighted: journey.partiallySighted,
      partiallyDeaf: journey.partiallyDeaf,
      cognitivelyImpaired: journey.cognitivelyImpaired,
      treasure: journey.treasure,
      cluesDifficulty: Number(journey.cluesDifficulty),
      physicalDifficulty: Number(journey.physicalDifficulty),
      estimatedDistance: 1000,
      estimatedDuration: 60,
      lastCompletion: new Date(),
    };

    const body = {
      journey: journeyObject,
      steps: stepObject,
    };

    const res = await fetch(
      `${process.env.BASE_URL || "http://localhost:3000"}/api/journeys`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      setFormStatus("errored");
    }
    clearSteps();
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[]);
    if (!output) return;
    if (currentStep < steps.length) {
      if (currentStep === steps.length - 1) {
        console.log("submitting");
        // await form.handleSubmit(processForm)();
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep((step) => step + 1);
        setDir("ltr");
      }
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
      setDir("rtl");
    }
  };

  const dismissModal = () => {
    hideModal();
    setCurrentStep(0);
    form.reset();
    clearSteps();
    setFormStatus("idle");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-10 flex size-full flex-col overflow-scroll bg-background px-5  pb-12 pt-5">
      <div className="flex justify-end">
        <Button onClick={dismissModal}>
          <span>Quitter</span>
          <Icons.close width={14} height={14} className="ml-2" />
        </Button>
      </div>
      <Form {...form}>
        {!form.formState.isSubmitSuccessful && formStatus === "idle" && (
          <form onSubmit={form.handleSubmit(processForm)}>
            <StepCounter step={currentStep} totalSteps={4} />
            <Steps
              form={form}
              step={currentStep}
              next={next}
              prev={prev}
              dir={dir}
            />
          </form>
        )}

        {form.formState.isSubmitSuccessful && formStatus !== "errored" && (
          <div className="mt-[10vh]">
            <h2 className="mb-8 text-4xl font-bold">
              Votre parcours a bien été enregistré !
            </h2>
            <p className="mb-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
              nam illo iste veniam ea! Doloremque distinctio mollitia omnis.
            </p>
            <Button type="button" onClick={dismissModal}>
              <span>Terminer</span>
              <Icons.check
                width={14}
                height={14}
                className="ml-2"
                fill="#d8552b"
              />
            </Button>
          </div>
        )}

        {formStatus === "errored" && (
          <div className="mt-[10vh]">
            <h2 className="mb-8 text-4xl font-bold">
              Oups, une erreur est survenue...
            </h2>
            <p className="mb-6">
              Votre parcours n'a pas pu être créé, veuillez réessayer plus tard.
            </p>
            <Button type="button" onClick={dismissModal}>
              <span>Fermer</span>
              <Icons.close width={14} height={14} className="ml-2" />
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default JourneyForm;

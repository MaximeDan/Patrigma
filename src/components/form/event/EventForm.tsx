"use client";
import React, { useState } from "react";
import {
  eventJourneySchema,
  eventDataSchema,
  eventFormSchema,
} from "@/validators/EventFormSchema";
import { z } from "zod";
import { useEventFormStore } from "@/store/eventFormStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import StepCounter from "../StepCounter";
import EventFormSteps from "./steps/EventFormSteps";
import { Icons } from "@/components/Icons";

export type EventFormValues = z.infer<typeof eventFormSchema>;
type FieldName = keyof EventFormValues;

const firstFormStepFields = Object.keys(eventJourneySchema.shape);
const secondFormStepFields = Object.keys(eventDataSchema.shape);

const formSteps = [
  {
    fields: firstFormStepFields,
  },
  {
    fields: secondFormStepFields,
  },
];

const EventForm = () => {
  const { isVisible, hideModal } = useEventFormStore();
  const [formStatus, setFormStatus] = useState<"idle" | "errored">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      numberPlayerMin: 1,
      numberPlayerMax: 40,
      isPrivate: false,
      accessCode: undefined,
    },
  });

  if (!isVisible) return null;

  const processForm: SubmitHandler<EventFormValues> = async (data) => {
    console.log(data);
  };

  const next = async () => {
    const fields = formSteps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[]);
    if (!output) return;
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((step) => step + 1);
      setDir("ltr");
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
    setFormStatus("idle");
  };

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
            <EventFormSteps
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

export default EventForm;

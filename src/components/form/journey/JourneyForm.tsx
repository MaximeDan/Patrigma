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

export type JourneyFormValues = z.infer<typeof journeyFormSchema>;
type FieldName = keyof JourneyFormValues;

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
  const { isVisible, hideModal } = useJourneyFormStore();
  const [formStatus, setFormStatus] = useState<"idle" | "errored">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [dir, setDir] = useState<"ltr" | "rtl">("rtl");

  const form = useForm<JourneyFormValues>({
    resolver: zodResolver(journeyFormSchema),
  });

  const processForm: SubmitHandler<JourneyFormValues> = async (data) => {
    console.log(data);
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[]);
    if (!output) return;
    if (currentStep < steps.length) {
      if (currentStep === steps.length - 1) {
        await form.handleSubmit(processForm)();
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
    setFormStatus("idle");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-10 flex size-full flex-col bg-white">
      <Button onClick={dismissModal}>Quitter</Button>
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
      </Form>
    </div>
  );
};

export default JourneyForm;

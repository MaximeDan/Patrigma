import React from "react";
import { UseFormReturn } from "react-hook-form";
import { EventFormValues } from "../EventForm";

type EventFormStepsProps = {
  step: number;
  next: () => Promise<void>;
  prev: () => void;
  form: UseFormReturn<EventFormValues>;
  dir: "ltr" | "rtl";
};

const EventFormSteps = ({
  step,
  next,
  prev,
  form,
  dir,
}: EventFormStepsProps) => {
  return <div>EventFormSteps</div>;
};

export default EventFormSteps;

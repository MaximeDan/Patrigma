"use client";
import { UseFormReturn } from "react-hook-form";
import { JourneyFormValues } from "../JourneyForm";
import { Button } from "@/components/ui/button";
import { useJourneyFormStore } from "@/store/journeyFormStore";
import { Plus, Edit, Trash } from "lucide-react";
import BottomSheetModal from "../BottomSheetModal";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { Icons } from "@/components/Icons";

type ThirdStepProps = {
  prev: () => void;
  next: () => Promise<void>;
  form: UseFormReturn<JourneyFormValues>;
};

const StepsOverviewStep = ({ form, next, prev }: ThirdStepProps) => {
  const { steps, showBottomSheet, removeStep, setEditedStep } =
    useJourneyFormStore();

  useEffect(() => {
    form.setValue(
      "steps",
      steps.length ? JSON.stringify({ steps }) : JSON.stringify({ steps: [] }),
    );
    form.trigger("steps");
  }, [steps]);

  return (
    <div className="bg-slate-50">
      <h2>Quelles sont les étapes ?</h2>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <p>{step.puzzle}</p>
          <Edit
            size={24}
            onClick={() => {
              setEditedStep({ ...step, index });
              showBottomSheet();
            }}
          />
          <Trash size={24} onClick={() => removeStep(index)} />
        </div>
      ))}

      <FormField
        control={form.control}
        name="steps"
        render={({ field }) => (
          <FormItem>
            <FormControl></FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <Button
        className="flex items-center border-orange bg-orange p-2 text-white shadow-xl hover:bg-orange-500"
        onClick={showBottomSheet}
      >
        <p>Ajouter</p>
        <Plus size={24} stroke="#f0f0f0" />
      </Button>

      <div className="mt-11 flex justify-between xs:mt-[60px]">
        <Button
          className="border-orange bg-orange p-2 text-white shadow-xl hover:bg-orange-500"
          onClick={prev}
        >
          <Icons.arrowLink
            stroke="#f0f0f0"
            width={20}
            height={20}
            className="mr-2 -scale-x-100"
          />
          <span>Retour</span>
        </Button>
        <Button
          className="border-orange bg-orange p-2 text-white shadow-xl hover:bg-orange-500"
          type="button"
          onClick={async () => {
            await next();
          }}
        >
          <span>Continuer</span>
          <Icons.arrowLink
            stroke="#f0f0f0"
            width={20}
            height={20}
            className="ml-2"
          />
        </Button>
      </div>
      <BottomSheetModal />
    </div>
  );
};

export default StepsOverviewStep;

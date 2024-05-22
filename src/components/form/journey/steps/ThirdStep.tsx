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
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

type ThirdStepProps = {
  prev: () => void;
  next: () => Promise<void>;
  form: UseFormReturn<JourneyFormValues>;
};

const ThirdStep = ({ form, next, prev }: ThirdStepProps) => {
  const { steps, showBottomSheet, removeStep, setEditedStep } =
    useJourneyFormStore();

  useEffect(() => {
    form.setValue("steps", JSON.stringify(steps));
  }, [steps]);

  return (
    <div>
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
          <FormItem hidden>
            <FormControl>
              <>
                <Input {...field} id="steps" />
              </>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <Button className="flex items-center" onClick={showBottomSheet}>
        <Plus size={24} />
        <p>Ajouter une étape</p>
      </Button>

      <div className="xs:mt-[60px] mt-11 flex justify-between">
        <Button onClick={prev}>Retour</Button>
        <Button
          onClick={async () => {
            await next();
          }}
        >
          Continuer
        </Button>
      </div>
      <BottomSheetModal />
    </div>
  );
};

export default ThirdStep;

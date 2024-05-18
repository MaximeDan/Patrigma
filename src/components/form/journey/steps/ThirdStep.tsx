import React from "react";
import { UseFormReturn } from "react-hook-form";
import { JourneyFormValues } from "../JourneyForm";
import { Button } from "@/components/ui/button";

type ThirdStepProps = {
  prev: () => void;
  next: () => Promise<void>;
  form: UseFormReturn<JourneyFormValues>;
};

const ThirdStep = ({ form, next, prev }: ThirdStepProps) => {
  return (
    <div>
      <h2>Quelles sont les étapes ?</h2>

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
    </div>
  );
};

export default ThirdStep;

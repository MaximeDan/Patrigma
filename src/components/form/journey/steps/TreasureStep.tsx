import React from "react";
import { UseFormReturn } from "react-hook-form";
import { JourneyFormValues } from "../JourneyForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type TreasureStepProps = {
  prev: () => void;
  next: () => Promise<void>;
  form: UseFormReturn<JourneyFormValues>;
};

const TreasureStep = ({ form, next, prev }: TreasureStepProps) => {
  return (
    <div>
      <h2>Définissez le trésor</h2>
      <FormField
        control={form.control}
        name="treasure"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <>
                <Label htmlFor="treasure">Trésor*</Label>
                <Input
                  {...field}
                  id="treasure"
                  placeholder="L'anecdote secrète est..."
                />
              </>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <div className="mt-11 flex justify-between xs:mt-[60px]">
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

export default TreasureStep;

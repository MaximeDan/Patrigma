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
import { Icons } from "@/components/Icons";

type FirstStepProps = {
  next: () => Promise<void>;
  form: UseFormReturn<JourneyFormValues>;
};

const IntroductionStep = ({ form, next }: FirstStepProps) => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Créez votre propre Parcours !</h1>
      <p>
        Ajouter un titre, une description et une image afin de rednre votre
        parcours le plus attrayant possible
      </p>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <>
                <Label htmlFor="title">Titre*</Label>
                <Input {...field} id="title" />
              </>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <>
                <Label htmlFor="description">Description*</Label>
                <Input {...field} id="description" />
              </>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {/* TODO: add image file input */}
      <Button
        onClick={async () => {
          await next();
        }}
        type="submit"
        className="mt-2 border-orange bg-orange hover:bg-orange-500 shadow-xl text-white p-2"
      >
        <span>Suivant</span>
        <Icons.arrowLink
          stroke="#f0f0f0"
          width={20}
          height={20}
          className="ml-2"
        />
      </Button>
    </div>
  );
};

export default IntroductionStep;

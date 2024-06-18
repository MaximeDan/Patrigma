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

const FirstStep = ({ form, next }: FirstStepProps) => {
  return (
    <div>
      <h2>Créez votre propre Parcours !</h2>
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
      <Button onClick={next}>
        <span>Suivant</span>
        <Icons.arrowLink className="ml-2" />
      </Button>
    </div>
  );
};

export default FirstStep;

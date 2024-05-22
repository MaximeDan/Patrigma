import React from "react";
import { UseFormReturn } from "react-hook-form";
import { JourneyFormValues } from "../JourneyForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SecondStepProps = {
  prev: () => void;
  next: () => Promise<void>;
  form: UseFormReturn<JourneyFormValues>;
};

const SecondStep = ({ form, next, prev }: SecondStepProps) => {
  return (
    <div>
      <h2>Que doit-on savoir sur le parcours ?</h2>
      <FormField
        control={form.control}
        name="requirement"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <>
                <Label htmlFor="requirement">Pré-requis*</Label>
                <Textarea
                  {...field}
                  id="requirement"
                  placeholder="Vélo, lampe torche, connaissances en physique..."
                />
              </>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {/* TO DO: radio fields on physical difficulty and clues difficulty */}

      <FormField
        control={form.control}
        name="mobilityImpaired"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="mobilityImpaired">
              Personnes à mobilités réduites
            </Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="undefined">Non défini</SelectItem>
                <SelectItem value="unaccessible">Non accessible</SelectItem>
                <SelectItem value="partiallyAccessible">
                  Partiellement accessible
                </SelectItem>
                <SelectItem value="accessible">
                  Totalement accessible
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="partiallySighted"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="PartiallySighted">
              Personnes en situation de handicap visuel
            </Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="undefined">Non défini</SelectItem>
                <SelectItem value="unaccessible">Non accessible</SelectItem>
                <SelectItem value="partiallyAccessible">
                  Partiellement accessible
                </SelectItem>
                <SelectItem value="accessible">
                  Totalement accessible
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="partiallyDeaf"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="PartiallyDeaf">
              Personnes en situation de handicap auditif
            </Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="undefined">Non défini</SelectItem>
                <SelectItem value="unaccessible">Non accessible</SelectItem>
                <SelectItem value="partiallyAccessible">
                  Partiellement accessible
                </SelectItem>
                <SelectItem value="accessible">
                  Totalement accessible
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cognitivelyImpaired"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="cognitivelyImpaired">
              Personnes en situation de handicap mental ou de troubles
              psychiques
            </Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="undefined">Non défini</SelectItem>
                <SelectItem value="unaccessible">Non accessible</SelectItem>
                <SelectItem value="partiallyAccessible">
                  Partiellement accessible
                </SelectItem>
                <SelectItem value="accessible">
                  Totalement accessible
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

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

export default SecondStep;

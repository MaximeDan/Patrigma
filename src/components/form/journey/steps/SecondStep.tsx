import React from "react";
import { UseFormReturn } from "react-hook-form";
import { JourneyFormValues } from "../JourneyForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Icons } from "@/components/Icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

      <FormField
        control={form.control}
        name="physicalDifficulty"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="1" />
                  </FormControl>
                  <FormLabel className="font-normal">Facile</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="2" />
                  </FormControl>
                  <FormLabel className="font-normal">Intermédiaire</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="3" />
                  </FormControl>
                  <FormLabel className="font-normal">Difficile</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cluesDifficulty"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="1" />
                  </FormControl>
                  <FormLabel className="font-normal">Facile</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="2" />
                  </FormControl>
                  <FormLabel className="font-normal">Intermédiaire</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="3" />
                  </FormControl>
                  <FormLabel className="font-normal">Difficile</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

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

      <div className="mt-11 flex justify-between xs:mt-[60px]">
        <Button onClick={prev}>
          <Icons.arrowLink className="mr-2 -scale-x-100" />
          <span>Retour</span>
        </Button>
        <Button
          type="button"
          onClick={async () => {
            await next();
          }}
        >
          <span>Continuer</span>
          <Icons.arrowLink className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SecondStep;

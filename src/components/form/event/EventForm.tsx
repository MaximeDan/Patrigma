"use client";
import React, { useState, useEffect } from "react";
import { eventFormSchema } from "@/validators/EventFormSchema";
import { z } from "zod";
import { useEventFormStore } from "@/store/eventFormStore";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { EventRequestBody } from "@/types/event";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";

export type EventFormValues = z.infer<typeof eventFormSchema>;

const EventForm = () => {
  const { isVisible, hideModal, journeyIdValue, setJourneyIdValue } =
    useEventFormStore();
  const [formStatus, setFormStatus] = useState<"idle" | "errored">("idle");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      numberPlayerMin: 1,
      numberPlayerMax: 40,
      isPrivate: false,
      accessCode: undefined,
    },
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      form.setValue("startAt", date.from);
      form.setValue("endAt", date.to);
    }
  }, [date]);

  if (!isVisible) return null;

  const processForm: SubmitHandler<EventFormValues> = async (data) => {
    console.log(data, "data");
    const parsedData = eventFormSchema.safeParse(data);
    if (!parsedData.success || !journeyIdValue) {
      setFormStatus("errored");
      return;
    }
    try {
      const body: EventRequestBody = {
        journeyId: journeyIdValue,
        authorId: 1,
        title: data.title,
        description: data.description,
        numberPlayerMin: data.numberPlayerMin,
        numberPlayerMax: data.numberPlayerMax,
        isPrivate: data.isPrivate,
        accessCode: data.accessCode || null,
        endAt: data.endAt,
        startAt: data.startAt,
        image: "",
      };
      const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        setFormStatus("errored");
      }
      console.log(response, "create event response");
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  const dismissModal = () => {
    hideModal();
    form.reset();
    setFormStatus("idle");
    setJourneyIdValue(null);
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex size-full flex-col overflow-scroll  bg-background px-5  pb-12 pt-5">
      <div className="flex justify-end">
        <Button onClick={dismissModal}>
          <span>Quitter</span>
          <Icons.close width={14} height={14} className="ml-2" />
        </Button>
      </div>
      <Form {...form}>
        {!form.formState.isSubmitSuccessful && formStatus === "idle" && (
          <form onSubmit={form.handleSubmit(processForm)}>
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
                      <Textarea {...field} id="description" />
                    </>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="numberPlayerMin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="numberPlayerMin">
                          Nombre mininum de participants*
                        </Label>
                        <Input {...field} type="number" id="numberPlayerMin" />
                      </>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberPlayerMax"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="numberPlayerMax">
                          Nombre maximum de participants*
                        </Label>
                        <Input {...field} type="number" id="numberPlayerMax" />
                      </>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Partie privée</Label>
                    <FormDescription>
                      Si vous cochez cette case, vous devrez fournir un code
                      d'accès pour rejoindre la partie.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("isPrivate") && (
              <FormField
                control={form.control}
                name="accessCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="accessCode">Code d'accès</Label>
                        <Input {...field} id="accessCode" />
                      </>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="mt-5">
              <span>Créer l'évènement</span>
              <Icons.arrowLink width={14} height={14} className="ml-2" />
            </Button>
          </form>
        )}

        {form.formState.isSubmitSuccessful && formStatus !== "errored" && (
          <div className="mt-[10vh]">
            <h2 className="mb-8 text-4xl font-bold">
              Votre évènement a bien été enregistré !
            </h2>
            <p className="mb-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
              nam illo iste veniam ea! Doloremque distinctio mollitia omnis.
            </p>
            <Button type="button" onClick={dismissModal}>
              <span>Terminer</span>
              <Icons.check
                width={14}
                height={14}
                className="ml-2"
                fill="#d8552b"
              />
            </Button>
          </div>
        )}

        {formStatus === "errored" && (
          <div className="mt-[10vh]">
            <h2 className="mb-8 text-4xl font-bold">
              Oups, une erreur est survenue...
            </h2>
            <p className="mb-6">
              Votre évènement n'a pas pu être créé, veuillez réessayer plus
              tard.
            </p>
            <Button type="button" onClick={dismissModal}>
              <span>Fermer</span>
              <Icons.close width={14} height={14} className="ml-2" />
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default EventForm;

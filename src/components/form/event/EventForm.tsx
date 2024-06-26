"use client";
import React, { useState } from "react";
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
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Event } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

type EventRequestBody = Omit<Event, "id" | "createdAt" | "updatedAt">;
export type EventFormValues = z.infer<typeof eventFormSchema>;

const EventForm = () => {
  const { isVisible, hideModal, journeyIdValue, setJourneyIdValue } =
    useEventFormStore();
  const [formStatus, setFormStatus] = useState<"idle" | "errored">("idle");

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

  if (!isVisible) return null;

  const processForm: SubmitHandler<EventFormValues> = async (data) => {
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
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

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
    <div className="fixed left-0 top-0 z-10 flex size-full flex-col overflow-scroll bg-background px-5  pb-12 pt-5">
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

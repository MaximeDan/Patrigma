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
import { useSession } from "next-auth/react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { handleException } from "@/utils/errorHandlerUtils";
import { EventRequestBody } from "@/types/event";

export type EventFormValues = z.infer<typeof eventFormSchema>;

const EventForm = () => {
  const { isVisible, hideModal, journeyIdValue, setJourneyIdValue } =
    useEventFormStore();
  const [formStatus, setFormStatus] = useState<"idle" | "errored">("idle");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const { data: session } = useSession();

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
    const parsedData = eventFormSchema.safeParse(data);
    if (!parsedData.success || !journeyIdValue) {
      setFormStatus("errored");
      return;
    }
    try {
      const body: EventRequestBody = {
        journeyId: journeyIdValue,
        authorId: Number(session?.user?.id),
        title: data.title,
        description: data.description,
        numberPlayerMin: data.numberPlayerMin,
        numberPlayerMax: data.numberPlayerMax,
        isPrivate: data.isPrivate,
        image: "https://picsum.photos/400/200?random=51",
        accessCode: data.accessCode || null,
        endAt: data.endAt,
        startAt: data.startAt,
      };

      const token = session?.accessToken;

      const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.redirected) {
        window.location.href = response.url;
      }
      if (!response.ok) {
        setFormStatus("errored");
      }
    } catch (error) {
      handleException(error);
    }
  };

  const dismissModal = () => {
    hideModal();
    form.reset();
    setFormStatus("idle");
    setJourneyIdValue(null);
  };

  return (
    <div className="fixed left-0 top-0 z-10 mx-auto flex size-full max-w-[920px] flex-col overflow-scroll  bg-slate-100 px-5  pb-12 pt-5">
      <div className="flex justify-end">
        <Button
          className="mt-5 border-red-600 bg-red-600 hover:bg-red-500 shadow-xl text-white p-2"
          onClick={dismissModal}
        >
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
                <FormItem className="mb-3">
                  <FormControl>
                    <>
                      <Label className="font-semibold" htmlFor="title">
                        Titre*
                      </Label>
                      <Input {...field} id="title" className="max-w-[500px]" />
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
                <FormItem className="mb-3">
                  <FormControl>
                    <>
                      <Label className="font-semibold" htmlFor="description">
                        Description*
                      </Label>
                      <Textarea
                        {...field}
                        id="description"
                        className="max-w-[500px]"
                      />
                    </>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex max-w-[500px] gap-5">
              <FormField
                control={form.control}
                name="numberPlayerMin"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormControl>
                      <>
                        <Label
                          className="font-semibold"
                          htmlFor="numberPlayerMin"
                        >
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
                        <Label
                          className="font-semibold"
                          htmlFor="numberPlayerMax"
                        >
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
                <FormItem className="flex max-w-[500px] flex-row items-center justify-between rounded-lg border p-3 mb-3">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">Partie privée</Label>
                    <FormDescription>
                      Si vous cochez cette case, vous devrez fournir un code
                      d'accès pour rejoindre la partie.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="ml-5"
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
                        <Label className="font-semibold" htmlFor="accessCode">
                          Code d'accès
                        </Label>
                        <Input {...field} id="accessCode" />
                      </>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="mt-5 border-orange bg-orange text-white p-2"
            >
              <span>Créer l'évènement</span>
              <Icons.arrowLink
                stroke="#f0f0f0"
                width={20}
                height={20}
                className="ml-2"
              />
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

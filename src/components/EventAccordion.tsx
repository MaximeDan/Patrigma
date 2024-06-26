"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface EventAccordionProps {
  events: Event[];
}

const EventAccordion: React.FC<EventAccordionProps> = ({ events }) => {
  const [openItem, setOpenItem] = useState<string>();
  const groupedEvents = events?.reduce(
    (groups: Record<string, Event[]>, event) => {
      const date = new Date(event.startAt).toISOString().split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    },
    {},
  );

  const sortedDates = Object.keys(groupedEvents).sort();

  const formattedDates = sortedDates.map((date) => ({
    original: date,
    formatted: new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));
  useEffect(() => {
    setOpenItem(formattedDates[0].formatted);
  }, []);
  if (!events) return;

  const handleToggle = (date: string) => {
    setOpenItem((prev) => (prev === date ? "" : date));
  };

  return (
    <Accordion
      type="single"
      value={openItem}
      onValueChange={handleToggle}
      className="w-full"
    >
      {formattedDates.map(({ original, formatted }) => (
        <AccordionItem key={original} value={formatted}>
          <AccordionTrigger className="py-2 text-lg font-medium">
            {formatted}
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {groupedEvents[original].map((event) => (
              <div key={event.id} className="flex flex-col rounded-lg bg-gray">
                <Link href={`/evenements/${event.id}`}>
                  <Image
                    src={`${event.image}`}
                    alt={event.title}
                    className="mb-4 h-32 w-full rounded object-cover"
                    width={200}
                    height={200}
                  />
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="">{event.description}</p>
                  <p className="">
                    Participants: {event.numberPlayerMin} -{" "}
                    {event.numberPlayerMax}
                  </p>
                </Link>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export default EventAccordion;

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
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  // Obtenir la date actuelle
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Réinitialiser les heures, minutes, secondes et millisecondes à 0

  // Regrouper et filtrer les événements
  const groupedEvents = events?.reduce(
    (groups: Record<string, Event[]>, event) => {
      const eventDate = new Date(event.startAt);
      eventDate.setHours(0, 0, 0, 0);

      // Ne conserver que les événements dont la date est supérieure ou égale à aujourd'hui
      if (eventDate >= today) {
        const dateKey = eventDate.toISOString().split("T")[0];
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(event);
      }
      return groups;
    },
    {},
  );

  // Trier les dates filtrées
  const sortedDates = Object.keys(groupedEvents).sort();

  // Formater les dates pour l'affichage
  const formattedDates = sortedDates.map((date) => ({
    original: date,
    formatted: new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  // N'initialiser openItem que si aucun élément n'est déjà ouvert
  useEffect(() => {
    if (!openItem && formattedDates.length > 0) {
      setOpenItem(formattedDates[0].formatted);
    }
  }, [formattedDates, openItem]);

  if (!events) return null;

  const handleToggle = (date: string) => {
    setOpenItem((prev) => (prev === date ? undefined : date));
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
              <div
                key={event.id}
                className="flex flex-col rounded-lg bg-slate-200 shadow-xl"
              >
                <Link href={`/evenements/${event.id}`}>
                  <Image
                    src={`${event.image}`}
                    alt={event.title}
                    className="mb-4 h-32 w-full rounded object-cover"
                    width={200}
                    height={200}
                  />
                  <div className="p-2">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="">{event.description}</p>
                    <p className="font-semibold">
                      Participants: {event.numberPlayerMin} -{" "}
                      {event.numberPlayerMax}
                    </p>
                  </div>
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

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import Image from "next/image";
import { Event } from "@prisma/client";

type EventCardProps = {
  event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  if (!event) return null;

  return (
    <Link
      className="mx-auto mt-4 flex max-w-[500px]"
      href={`/evenements/${event.id}`}
      passHref
    >
      <Card className="cursor-pointer bg-slate-200 pl-0">
        <CardContent className="p-0">
          <Image
            src={event.image}
            alt={event.title}
            width={500}
            height={300}
            className="h-48 w-full rounded-t-lg object-cover pl-0"
          />
        </CardContent>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
          <CardDescription>
            Débute le : {event.startAt.toLocaleDateString("fr-FR")}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

type EventUserRandomProps = {
  events: Event[];
};

const EventDisplay: React.FC<EventUserRandomProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, [events]);

  if (!events || events.length === 0) return null;

  return <EventCard event={events[currentIndex]} />;
};

export default EventDisplay;

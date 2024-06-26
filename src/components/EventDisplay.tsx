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
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={event.image}
            alt={event.title}
            width={500}
            height={300}
            className="h-48 object-cover"
          />
          <CardDescription>{event.description}</CardDescription>
        </CardContent>
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

"use client";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@prisma/client";
import Image from "next/image";
import React from "react";

type EventUserCarouselProps = {
  events: Event[];
};

const EventUserCarousel: React.FC<EventUserCarouselProps> = ({ events }) => {
  return (
    <>
      {events.length ? (
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 flex">
            {events.map((event) => (
              <CarouselItem key={event.id} className="pl-1">
                <Link href={`/evenements/${event.id}`} passHref>
                  <div className="cursor-pointer p-1">
                    <Card className="bg-slate-200">
                      {event.image && (
                        <Image
                          src={event.image}
                          alt={event.title}
                          className="h-32 w-full rounded-t-lg object-cover"
                          width={320}
                          height={180}
                        />
                      )}
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        Débute le : {event.startAt.toLocaleDateString("fr-FR")}
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 size-12 border-orange bg-white !p-0 text-orange" />
          <CarouselNext className="-right-4 size-12 border-orange bg-white !p-0 text-orange" />
        </Carousel>
      ) : (
        <p className="text-center text-lg text-gray-200">
          Vous n'êtes inscrit à aucun événement.
        </p>
      )}
    </>
  );
};

export default EventUserCarousel;

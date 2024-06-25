"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@prisma/client";
import Image from "next/image";

type EventUserCarouselProps = {
  events: Event[];
};

const EventUserCarousel: React.FC<EventUserCarouselProps> = ({ events }) => {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1 flex">
        {events.map((event) => (
          <CarouselItem key={event.id} className="flex-none basis-1/3 pl-1">
            <div className="p-1">
              <Card>
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
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default EventUserCarousel;

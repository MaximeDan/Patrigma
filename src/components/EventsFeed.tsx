import { getAllEvents } from "@/services/eventService";
import EventAccordion from "./EventAccordion";
import { Suspense } from "react";

async function getData() {
  try {
    const result = await getAllEvents();
    return result;
  } catch (error: any) {
    console.log(error);
  }
}

const EventsFeed = async () => {
  const events = await getData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {events && <EventAccordion events={events} />}
    </Suspense>
  );
};

export default EventsFeed;

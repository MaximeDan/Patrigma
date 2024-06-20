import EventAccordion from "./EventAccordion";
import { Suspense } from "react";

const EventsFeed = async () => {
  const res = await fetch(
    `${process.env.BASE_URL || "http://localhost:3000"}/api/events`,
    {
      cache: "no-cache",
    },
  );
  const events = await res.json();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventAccordion events={events.data} />
    </Suspense>
  );
};

export default EventsFeed;

import { getAllEvents } from "@/services/eventService";
import { handleException } from "@/app/utils/errorHandlerUtils";
import EventAccordion from "./EventAccordion";

async function getData() {
  try {
    const result = await getAllEvents();
    return result;
  } catch (error: any) {
    handleException(error);
  }
}

const EventsFeed = async () => {
  const events = await getData();
  if (!events) return;

  return <EventAccordion events={events} />;
};

export default EventsFeed;

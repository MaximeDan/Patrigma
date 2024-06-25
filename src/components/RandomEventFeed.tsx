import { getAllEvents } from "@/services/eventService";
import { handleException } from "@/utils/errorHandlerUtils";
import EventDisplay from "./EventDisplay";

async function getData() {
  try {
    const result = await getAllEvents();
    return result;
  } catch (error: any) {
    console.log(error, "error");
    handleException(error);
  }
}

const RandomEventsFeed = async () => {
  const events = await getData();
  if (!events) return;

  return <EventDisplay events={events} />;
};

export default RandomEventsFeed;

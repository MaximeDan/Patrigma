import { getEventsByUserId } from "@/services/userService";
import EventUserCarousel from "./EventUserCarousel";
import { Event } from "@prisma/client";

async function fetchUserEvents(userId: number): Promise<Event[]> {
  try {
    const events = await getEventsByUserId(userId);
    return events;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
}

const UserEventsFeed = async () => {
  // TODO: use the session
  const events = await fetchUserEvents(7);
  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <EventUserCarousel events={events} />
    </div>
  );
};

export default UserEventsFeed;

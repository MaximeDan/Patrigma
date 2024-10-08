import { getEventsByUserId } from "@/services/userService";
import EventUserCarousel from "./EventUserCarousel";
import { Event } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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
  const session = await getServerSession(authOptions);
  const events = await fetchUserEvents(session?.user?.id ?? 0);
  return (
    <div className="mx-auto mt-4 flex max-w-[500px] flex-col items-center justify-center">
      <EventUserCarousel events={events} />
    </div>
  );
};

export default UserEventsFeed;

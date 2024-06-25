import { getAllJourneys } from "@/services/journeyService";
import { handleException } from "@/app/utils/errorHandlerUtils";
import JourneyCard from "./JourneyCard";

async function getAllData() {
  try {
    const result = await getAllJourneys();
    return result;
  } catch (error: any) {
    handleException(error);
  }
}

const JourneysFeed = async () => {
  const journeys = await getAllData();
  if (!journeys) return;
  return (
    <>
      {journeys.map((journey, i) => (
        <JourneyCard key={i} journey={journey} />
      ))}
    </>
  );
};

export default JourneysFeed;

import RandomEventsFeed from "@/components/RandomEventFeed";
import TopBar from "@/components/TopBar";
import UserEventsFeed from "@/components/UserEventsFeed";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="mt-8">
        <h1 className="text-center text-3xl font-bold">Mes événements</h1>
        <UserEventsFeed />
        <h1 className="mt-8 text-center text-3xl font-bold">
          Événements Suggérés
        </h1>
        <RandomEventsFeed />
      </div>
    </>
  );
}

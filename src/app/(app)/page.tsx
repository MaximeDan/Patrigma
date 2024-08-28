import RandomEventsFeed from "@/components/RandomEventFeed";
import TopBar from "@/components/TopBar";
import UserEventsFeed from "@/components/UserEventsFeed";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="mt-8 px-5">
        <h1 className="text-center text-3xl font-bold text-orange">
          Mes événements
        </h1>
        <UserEventsFeed />
        <h2 className="mt-8 text-center text-2xl font-bold text-orange">
          Événements Suggérés
        </h2>
        <RandomEventsFeed />
      </div>
    </>
  );
}

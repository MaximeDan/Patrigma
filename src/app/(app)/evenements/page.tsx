import React from "react";
import AddButton from "@/components/AddButton";
import JourneyForm from "@/components/form/journey/JourneyForm";
import TopBar from "@/components/TopBar";
import EventsFeed from "@/components/EventsFeed";

const Event = () => {
  return (
    <>
      <TopBar />
      <main>
        <section className="flex flex-col gap-7 px-5 pb-40">
          <EventsFeed />
        </section>
        <JourneyForm />
        <AddButton action="journey" />
      </main>
    </>
  );
};

export default Event;

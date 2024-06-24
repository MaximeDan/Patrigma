import React, { Suspense } from "react";
import TopBar from "@/components/TopBar";
import EventsFeed from "@/components/EventsFeed";

const Event = () => {
  return (
    <>
      <TopBar />
      <main>
        <section className="flex flex-col gap-7 px-5 pb-40">
          <Suspense fallback={<div>Loading...</div>}>
            <EventsFeed />
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default Event;

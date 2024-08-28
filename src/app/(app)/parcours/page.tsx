import React, { Suspense } from "react";
import JourneysFeed from "@/components/JourneysFeed";
import AddButton from "@/components/AddButton";
import JourneyForm from "@/components/form/journey/JourneyForm";
import TopBar from "@/components/TopBar";

const Parcours = () => {
  return (
    <>
      <TopBar />
      <main className="container">
        <section className="grid grid-cols-1 gap-7 pb-40 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <Suspense fallback={<div>Loading...</div>}>
            <JourneysFeed />
          </Suspense>
        </section>
        <JourneyForm />
        <AddButton action="journey" />
      </main>
    </>
  );
};

export default Parcours;

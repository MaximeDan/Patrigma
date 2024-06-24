import React, { Suspense } from "react";
import JourneysFeed from "@/components/JourneysFeed";
import AddButton from "@/components/AddButton";
import JourneyForm from "@/components/form/journey/JourneyForm";
import TopBar from "@/components/TopBar";

const Parcours = () => {
  return (
    <>
      <TopBar />
      <main>
        <section className="flex flex-col gap-7 px-5 pb-40">
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

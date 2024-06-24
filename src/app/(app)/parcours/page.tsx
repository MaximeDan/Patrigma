import React from "react";
import JourneyCard from "@/components/JourneyCard";
import AddButton from "@/components/AddButton";
import JourneyForm from "@/components/form/journey/JourneyForm";
import TopBar from "@/components/TopBar";

const Parcours = () => {
  return (
    <>
      <TopBar />
      <main>
        <section className="flex flex-col gap-7 px-5 pb-40">
          {
            // to do: fetch parcours
            Array.from({ length: 10 }).map((_, i) => (
              <JourneyCard key={i} />
            ))
          }
        </section>
        <JourneyForm />
        <AddButton action="journey" />
      </main>
    </>
  );
};

export default Parcours;

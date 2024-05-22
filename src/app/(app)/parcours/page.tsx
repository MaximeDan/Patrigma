import React from "react";
import JourneyCard from "@/components/JourneyCard";
import AddButton from "@/components/AddButton";
import JourneyForm from "@/components/form/journey/JourneyForm";

const Parcours = () => {
  return (
    <main>
      {
        // to do: fetch parcours
        Array.from({ length: 10 }).map((_, i) => (
          <JourneyCard key={i} />
        ))
      }
      <JourneyForm />
      <AddButton action="journey" />
    </main>
  );
};

export default Parcours;

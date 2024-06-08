"use client";
import React from "react";
import { useJourneyFormStore } from "@/store/journeyFormStore";
import { Icons } from "./Icons";

type AddButtonProps = {
  action: "journey" | "event";
};

const AddButton = ({ action }: AddButtonProps) => {
  const { showModal } = useJourneyFormStore();
  return (
    <div
      onClick={() => {
        action === "journey" ? showModal() : showModal();
      }}
      className="fixed bottom-24 right-[20px] cursor-pointer rounded-lg bg-orange p-4 shadow-lg"
    >
      <Icons.plus color="#fff" />
    </div>
  );
};

export default AddButton;

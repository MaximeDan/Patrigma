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
      className="fixed bottom-24 right-5 cursor-pointer rounded-lg bg-orange p-4 shadow-lg sm:bottom-7 2xl:right-[calc(50%_-_668px)]"
    >
      <Icons.plus color="#fff" />
    </div>
  );
};

export default AddButton;

"use client";
import React from "react";
import { useJourneyFormStore } from "@/store/journeyFormStore";
import { Icons } from "./Icons";
import { useSession } from "next-auth/react";

type AddButtonProps = {
  action: "journey" | "event";
};

const AddButton = ({ action }: AddButtonProps) => {
  const { showModal } = useJourneyFormStore();
  const { data: session } = useSession();

  return (
    <div
      onClick={() => {
        if (!session) {
          window.location.href = "/signin";
        } else {
          action === "journey" ? showModal() : showModal();
        }
      }}
      className="fixed bottom-24 right-5 cursor-pointer rounded-lg bg-orange p-4 shadow-lg sm:bottom-7 2xl:right-[calc(50%_-_668px)]"
    >
      <Icons.plus color="#fff" />
    </div>
  );
};

export default AddButton;

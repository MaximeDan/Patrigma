"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ParticipantActions = ({
  event,
  participantCount,
}: {
  event: any;
  participantCount: any;
}) => {
  const { data: session } = useSession();
  const [isJoined, setIsJoined] = useState(
    event.userEvents.some(
      (userEvent: any) => userEvent.userId === session?.user.id,
    ),
  );
  const [count, setCount] = useState(participantCount);
  const router = useRouter();

  const handleJoin = async () => {
    if (!session) {
      signIn();
      return;
    }

    try {
      const response = await fetch(
        `/api/events/${event.id}/join/${session.user.id}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        },
      );
      if (response.ok) {
        setIsJoined(true);
        setCount(count + 1);
      } else {
        console.error("Failed to join the event");
      }
    } catch (error) {
      console.error("Error joining the event:", error);
    }
  };

  const handleLeave = async () => {
    try {
      const response = await fetch(
        `/api/events/${event.id}/leave/${session?.user.id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );
      if (response.ok) {
        setIsJoined(false);
        setCount(count - 1);
      } else {
        console.error("Failed to leave the event");
      }
    } catch (error) {
      console.error("Error leaving the event:", error);
    }
  };

  const handleStart = async () => {
    router.push(`${event.id}/start`);
  };

  return (
    <div>
      {isJoined && new Date() >= new Date(event.startAt) && (
        <Button
          className="mt-1 border-blue-700 bg-blue-600 p-2 text-white shadow-xl hover:bg-blue-500"
          onClick={handleStart}
        >
          <span>Lancer l'événement</span>
          <Icons.arrowLink
            stroke="#f0f0f0"
            width={20}
            height={20}
            className="ml-2"
          />
        </Button>
      )}
      <div>
        {isJoined ? (
          <Button
            className="mt-1 border-red-600 bg-red-600 p-2 text-white shadow-xl hover:bg-red-500"
            onClick={handleLeave}
          >
            <span>Quitter l'évènement</span>
            <Icons.close width={14} height={14} className="ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleJoin}
            type="submit"
            className="mt-1 border-orange bg-orange p-2 text-white shadow-xl hover:bg-orange"
          >
            <span>Rejoindre</span>
            <Icons.arrowLink
              stroke="#f0f0f0"
              width={20}
              height={20}
              className="ml-2"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ParticipantActions;

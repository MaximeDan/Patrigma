import prisma from "@/lib/prisma";
import { Event, UserEvent } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/events : get all events
export async function GET() {
    try {
        const events = await prisma.event.findMany();

        if(!events) {
            return NextResponse.json("Events not found", { status: 404 });
        }

        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch events:", error); 
        return NextResponse.json({ error: "Internal Server Error: Unable to process the request." }, { status: 500 });
    }
}

// POST /api/events : create a new event
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const event: Event = body.event;
        const userEvents: UserEvent[] = body.userEvents;

        const createdEvent = await prisma.event.create({
            data: {
                authorId: event.authorId,
                journeyId: event.journeyId,
                title: event.title,
                image: event.image,
                numberPlayerMin: event.numberPlayerMin,
                numberPlayerMax: event.numberPlayerMax,
                description: event.description,
                isPrivate: event.isPrivate,
                accessCode: event.accessCode,
                startTime: event.startTime,
                endTime: event.endTime,
                userEvents: {
                    createMany: {
                      data: userEvents.map(userEvent => ({
                        userId: userEvent.userId,
                        lastStepId: userEvent.lastStepId,
                      }))
                    }
                }
            },
        });

        return NextResponse.json(createdEvent, { status: 201 });
    } catch (error) {
        console.error("Failed to create event:", error);
        return NextResponse.json({ error: "Internal Server Error: Unable to process the request." }, { status: 500 });
    }
}
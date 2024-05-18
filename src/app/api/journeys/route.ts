import prisma from "@/lib/prisma";
import { Journey, Step } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/journeys : get all journeys
export async function GET() {
    try {
        const journeys = await prisma.journey.findMany();

        if(!journeys) {
            return NextResponse.json("Journeys not found", { status: 404 });
        }

        return NextResponse.json(journeys, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch journeys:", error); 
        return NextResponse.json({ error: "Internal Server Error: Unable to process the request." }, { status: 500 });
    }
}

// POST /api/journeys : create a new journey
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const journey: Journey = body.journey;
        const steps: Step[] = body.steps;

        const createdJourney = await prisma.journey.create({
            data: {
                authorId: journey.authorId,
                title: journey.title,
                description: journey.description,
                requirement: journey.requirement,
                treasure: journey.treasure,
                estimatedDistance: journey.estimatedDistance,
                estimatedDuration: journey.estimatedDuration,
                cluesDifficulty: journey.cluesDifficulty,
                physicalDifficulty: journey.physicalDifficulty,
                lastCompletion: journey.lastCompletion,
                mobilityImpaired: journey.mobilityImpaired,
                partiallySighted: journey.partiallySighted,
                partiallyDeaf: journey.partiallyDeaf,
                cognitivelyImpaired: journey.cognitivelyImpaired,
                steps: {
                    createMany: {
                      data: steps.map(step => ({
                        journeyId: journey.id,
                        puzzle: step.puzzle,
                        answer: step.answer,
                        hint: step.hint,
                        picturePuzzle: step.picturePuzzle,
                        pictureHint: step.pictureHint,
                        coordinates: step.coordinates,
                        address: step.address,
                        city: step.city,
                        postalCode: step.postalCode,
                        country: step.country,
                        stepNumber: step.stepNumber,
                      }))
                    }
                }
            },
        });

        return NextResponse.json(createdJourney, { status: 201 });
    } catch (error) {
        console.error("Failed to create journey:", error);
        return NextResponse.json({ error: "Internal Server Error: Unable to process the request." }, { status: 500 });
    }
}

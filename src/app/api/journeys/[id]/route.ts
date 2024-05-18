import prisma from "@/lib/prisma";
import { Journey, Step } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

// GET /api/journeys/[id] : get a journey by id
export async function GET({ params } : { params: { id: string }}) {
    const id = params.id;

    try {
        const journey = await prisma.journey.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!journey) {
            return NextResponse.json("Journey not found", { status: 404 });
        }

        return NextResponse.json(journey, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch journey:", error);
        return NextResponse.json({ error: "Internal Server Error: Unable to process the request." }, { status: 500 });
    }
}

// PUT /api/journeys/[id] : update a journey by id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id: number = Number(params.id);
        const body = await request.json();
        const journey: Journey = body.journey;
        const steps: Step[] = body.steps;

        const existingJourney = await prisma.journey.findUnique({
            where: {
                id: id
            }
        });

        if (!existingJourney) {
            return NextResponse.json("Journey not found", { status: 404 });
        }

        const updatedJourney = await prisma.journey.update({
            where: {
                id: id
            },
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

        return NextResponse.json(updatedJourney, { status: 200 });
    } catch (error) {
        console.error("Failed to update journey:", error);
        return NextResponse.json({ error: "Internal Server Error: Unable to process the request." }, { status: 500 });
    }
}

// DELETE /api/journeys/[id] : delete a journey by id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id: number = Number(params.id);
    console.log("ID : " + id);
    
    try {
        const deletedJourney = await prisma.journey.delete({
            where: {
                id: id
            }
        });

        if (!deletedJourney) {
            return NextResponse.json("Journey not found", { status: 404 });
        }

        return NextResponse.json({ message: "Journey deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete journey:", error);
        return NextResponse.json({ error: "Internal Server Error: Unable to process the request." }, { status: 500 });
    }
}

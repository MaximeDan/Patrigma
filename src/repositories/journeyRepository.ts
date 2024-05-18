import prisma from "@/lib/prisma";
import { Journey } from "@prisma/client";

export const createJourney = async (data: Journey): Promise<Journey> => {
    return await prisma.journey.create({
        data,
    });
};

export const getJourney = async (id: number): Promise<Journey | null> => {
    return await prisma.journey.findUnique({ where: { id } });
};

export const getJourneys = async (): Promise<Journey[]> => {
    return await prisma.journey.findMany();
};

export const updateJourney = async (id: number, data: Journey): Promise<Journey | null> => {
    return await prisma.journey.update({
        where: { id },
        data,
    });
};

export const deleteJourney = async (id: number): Promise<Journey | null> => {
    return await prisma.journey.delete({ where: { id } });
};

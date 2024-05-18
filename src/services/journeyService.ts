import { createJourney, readJourney, readJourneys, updateJourney, deleteJourney } from '../repositories/journeyRepository';
import { Journey } from '@prisma/client';

export const registerJourney = async (journeyData: Journey): Promise<Journey> => {
    return await createJourney(journeyData);
};

export const getJourneyById = async (id: number): Promise<Journey | null> => {
    const journey = await readJourney(id);
    if (!journey) {
        throw new Error('Journey not found');
    }
    return journey;
};

export const getAllJourneys = async (): Promise<Journey[]> => {
    return await readJourneys();
};

export const modifyJourney = async (id: number, journeyData: Journey): Promise<Journey | null> => {
    const journey = await readJourney(id);
    if (!journey) {
        throw new Error('Journey not found');
    }
    return await updateJourney(id, journeyData);
};

export const removeJourney = async (id: number): Promise<Journey | null> => {
    const journey = await readJourney(id);
    if (!journey) {
        throw new Error('Journey not found');
    }
    return await deleteJourney(id);
};

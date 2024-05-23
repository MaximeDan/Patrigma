import { InternalServerErrorException, NotFoundException } from '@/types/exceptions';
import { createJourney, getJourney, getJourneys, updateJourney, deleteJourney } from '../repositories/journeyRepository';
import { Journey } from '@prisma/client';

export const registerJourney = async (journeyData: Journey): Promise<Journey> => {
    const result = await createJourney(journeyData);

    if (!result) 
        throw new InternalServerErrorException('Internal server error');
    
    return result;
};

export const getJourneyById = async (id: number): Promise<Journey | null> => {
    const journey = await getJourney(id);

    if (!journey) 
        throw new NotFoundException('Journey not found');
    
    return journey;
};

export const getAllJourneys = async (): Promise<Journey[]> => {
    const journeys = await getJourneys();

    if(journeys.length === 0) 
        throw new NotFoundException('No journeys found');

    return journeys;
};

export const modifyJourney = async (id: number, journeyData: Journey): Promise<Journey | null> => {
    const journey = await getJourney(id);

    if (!journey) 
        throw new NotFoundException('Journey not found');
    
    const result = await updateJourney(id, journeyData);
    if(!result) 
        throw new InternalServerErrorException('Internal server error');
    
    return result;
};

export const removeJourney = async (id: number): Promise<Journey | null> => {
    const journey = await getJourney(id);

    if (!journey) 
        throw new NotFoundException('Journey not found');
    
    const result = await deleteJourney(id);

    if(!result) 
        throw new InternalServerErrorException('Internal server error');

    return result;
};

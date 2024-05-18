import { InternalServerErrorException, NotFoundException } from '@/types/exceptions';
import { createStep, readStep, readSteps, updateStep, deleteStep } from '../repositories/stepRepository';
import { Step } from '@prisma/client';

export const registerStep = async (stepData: Step): Promise<Step> => {
    const result = await createStep(stepData);

    if (!result) 
        throw new InternalServerErrorException('Internal server error');
    
    return result;
};

export const getStepById = async (id: number): Promise<Step | null> => {
    const step = await readStep(id);

    if (!step) 
        throw new NotFoundException('Step not found');
    
    return step;
};

export const getAllSteps = async (): Promise<Step[]> => {
    const steps = await readSteps();

    if(steps.length === 0) 
        throw new NotFoundException('No steps found');

    return steps;
};

export const modifyStep = async (id: number, stepData: Step): Promise<Step | null> => {
    const step = await readStep(id);

    if (!step) 
        throw new NotFoundException('Step not found');
    
    const result = await updateStep(id, stepData);
    
    if(!result) 
        throw new InternalServerErrorException('Internal server error');
    
    return result;
};

export const removeStep = async (id: number): Promise<Step | null> => {
    const step = await readStep(id);

    if (!step) 
        throw new NotFoundException('Step not found');
    
    const result = await deleteStep(id);

    if(!result) 
        throw new InternalServerErrorException('Internal server error');

    return result;
};

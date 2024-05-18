import { createStep, getStep, getSteps, updateStep, deleteStep } from '../repositories/stepRepository';
import { Step } from '@prisma/client';

export const registerStep = async (stepData: Step): Promise<Step> => {
    return await createStep(stepData);
};

export const getStepById = async (id: number): Promise<Step | null> => {
    const step = await getStep(id);
    if (!step) {
        throw new Error('Step not found');
    }
    return step;
};

export const getAllSteps = async (): Promise<Step[]> => {
    return await getSteps();
};

export const modifyStep = async (id: number, stepData: Step): Promise<Step | null> => {
    const step = await getStep(id);
    if (!step) {
        throw new Error('Step not found');
    }
    return await updateStep(id, stepData);
};

export const removeStep = async (id: number): Promise<Step | null> => {
    const step = await getStep(id);
    if (!step) {
        throw new Error('Step not found');
    }
    return await deleteStep(id);
};

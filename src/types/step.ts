export type StepWithoutDates = {
  id?: number;
  journeyId: number;
  puzzle: string;
  answer: string;
  hint: string;
  picturePuzzle?: string | null;
  pictureHint?: string | null;
  latitude: number;
  longitude: number;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  stepNumber: number;
};

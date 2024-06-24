export type EventUserStepWithoutId = {
  userId: number;
  stepId: number;
  eventId: number;
  startAt: Date | undefined;
  endAt: Date | null;
  durationMs: number | null;
};

import { TimeSeparator } from "@/types/enums/timeSeparator";

/**
 * @param milliseconds: number
 * @param separator: TimeSeparator
 * @returns string
 * @description Converts a duration from milliseconds to a formatted string with the specified separator.
 * @example convertMillisecondsToHoursMinutes(7384000, TimeSeparator.HourMin) // "2h03min"
 */
export function convertMillisecondsToHoursMinutes(
  milliseconds: number,
  separator: TimeSeparator = TimeSeparator.HourMin,
): string {
  if (typeof milliseconds !== "number" || milliseconds < 0)
    throw new Error(
      "Invalid input: milliseconds must be a non-negative number.",
    );

  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let formattedDuration;
  const paddedMinutes = String(minutes).padStart(2, "0"); // Ajout du zéro devant les minutes de 0 à 9

  switch (separator) {
    case TimeSeparator.HourMin:
      formattedDuration = `${hours}h${paddedMinutes}min`;
      break;
    case TimeSeparator.Hour:
      formattedDuration = `${hours}h${paddedMinutes}`;
      break;
    case TimeSeparator.Colon:
      formattedDuration = `${String(hours).padStart(2, "0")}:${paddedMinutes}`;
      break;
    default:
      throw new Error(
        "Invalid separator: Use TimeSeparator.HourMin, TimeSeparator.Hour, or TimeSeparator.Colon",
      );
  }

  return formattedDuration;
}

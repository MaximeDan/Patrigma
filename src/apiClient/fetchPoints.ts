// apiClient/fetchPoints.ts
import { CustomPoint, ApiResponse } from "@/types/pointsOfInterests";

const API_URL =
  "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-des-immeubles-proteges-au-titre-des-monuments-historiques&rows=1000";

export const fetchPoints = async (): Promise<CustomPoint[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ApiResponse = await response.json();

  const points = data.records
    .filter(
      (record) =>
        record.fields.coordonnees_au_format_wgs84 &&
        record.fields.coordonnees_au_format_wgs84.length === 2 &&
        record.fields.historique !== "",
    )
    .map((record) => ({
      id: record.recordid,
      name: record.fields.titre_editorial_de_la_notice,
      description: record.fields.historique,
      latitude: record.fields.coordonnees_au_format_wgs84[0],
      longitude: record.fields.coordonnees_au_format_wgs84[1],
    }));

  return points;
};

import { CustomPoint, ApiResponse } from "@/types/pointsOfInterests";

const API_URL =
  "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-des-immeubles-proteges-au-titre-des-monuments-historiques&rows=10000";

export const fetchPoints = async (): Promise<CustomPoint[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ApiResponse = await response.json();
  console.log(data, "Fetched points:");
  return data.records.map((record) => ({
    id: record.recordid,
    name: record.fields.titre_editorial_de_la_notice,
    latitude: record.fields.coordonnees_au_format_wgs84[0],
    longitude: record.fields.coordonnees_au_format_wgs84[1],
  }));
};

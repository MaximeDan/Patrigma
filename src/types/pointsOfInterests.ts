export interface Record {
  datasetid: string;
  recordid: string;
  fields: {
    commune_forme_index: string;
    reference: string;
    date_de_creation_de_la_notice: string;
    typologie_de_la_protection: string;
    siecle_de_la_campagne_principale_de_construction: string;
    titre_editorial_de_la_notice: string;
    region: string;
    precision_de_la_protection: string;
    date_et_typologie_de_la_protection: string;
    statut_juridique_de_l_edifice: string;
    technique_du_decor_porte_de_l_edifice: string;
    typologie_du_dossier: string;
    cadastre: string;
    domaine: string;
    cadre_de_l_etude: string;
    coordonnees_au_format_wgs84: [number, number];
    lieudit: string;
    departement_en_lettres: string;
    nature_de_la_protection: string;
    commune_forme_editoriale: string;
    identifiant_agregee: string;
    copyright: string;
    departement_format_numerique: string;
    observations: string;
    cog_insee_lors_de_la_protection: string;
    historique: string;
    denomination_de_l_edifice: string;
    format_abrege_du_siecle_de_construction: string;
    date_de_la_derniere_mise_a_jour: string;
    precision_de_la_localisation: string;
    lien_vers_la_base_archiv_mh: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  record_timestamp: string;
}

export interface ApiResponse {
  nhits: number;
  parameters: {
    dataset: string;
    rows: number;
    start: number;
    format: string;
    timezone: string;
  };
  records: Record[];
}

export interface CustomPoint {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

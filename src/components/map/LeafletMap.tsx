import dynamic from "next/dynamic"; // Composant LeafletMap chargé dynamiquement

const LeafletMap = dynamic(() => import("./Map"), { ssr: false });

export default LeafletMap;

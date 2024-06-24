import React from "react";
import ParallaxImage from "@/components/clients/ParallaxImage";
import Rating from "@/components/Rating";
import { Icons } from "@/components/Icons";

type Params = { id: string };

const EventDetail = ({ params }: { params: Params }) => {
  // get journey by id
  return (
    <main className="flex min-h-screen flex-col bg-gray">
      <ParallaxImage />
      <div className="relative flex-1 -translate-y-4 rounded-t-2xl px-5 pb-40 pt-14">
        <div className="absolute left-4 top-0 flex gap-[6px]">
          <div className="flex items-center rounded-b-md bg-white px-2 py-[6px]">
            <Icons.dumbbel />
            <p className="text-sm font-semibold text-gray">Facile</p>
          </div>
          <div className="flex items-center gap-1 rounded-b-md bg-green px-2 py-[6px]">
            <Icons.bulb />
            <p className="text-sm font-semibold text-gray">Intermédiaire</p>
          </div>
        </div>
        <h1 className="text-xl font-extrabold text-orange">
          Sentier du biscuit sablé
        </h1>
        <div className="flex items-center gap-1 text-beige-600">
          <Icons.mapPin fill="rgba(206, 192, 173, 60%)" />
          <p className="text-sm font-medium">Normandie</p>
        </div>
        <p>TODO: Par Jean Blonblon, le 23/06/2024</p>

        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          accumsan ligula tellus, a luctus eros lobortis eu. Fusce rhoncus
          turpis in metus fermentum, nec hendrerit elit mattis. In ipsum diam,
          pellentesque ut porttitor eu, laoreet et dolor. Sed bibendum nec nulla
          eu fringilla. Aliquam erat volutpat. Nullam quis risus scelerisque,
          aliquet sapien ultricies, vulputate urna. Aenean sed dolor a nisl
          pellentesque venenatis at eget lectus. Vestibulum tempus at dui quis
          faucibus.
        </p>
        <div className="mt-[18px] flex items-center justify-between text-lg font-semibold text-orange">
          <h2>Accessibilité</h2>
          <Icons.arrowLink />
        </div>
        <div className="mt-4 flex gap-6">
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.pmr />
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2  border-cadetblue bg-cadetblue-600">
            <Icons.partiallySighted />
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.partiallyDeaf />
          </div>
          <div className="flex aspect-[1/1] flex-1 items-center justify-center rounded-lg border-2 border-cadetblue bg-cadetblue-600">
            <Icons.cognitivelyImpaired />
          </div>
        </div>
        <h2 className="mt-[18px] text-lg font-semibold text-orange">
          Pré-requis
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus facilis velit dolores consectetur ea, molestias autem
          maiores dicta, laboriosam eaque, nesciunt esse accusamus libero
          aperiam.
        </p>

        <h2 className="mt-[18px] text-lg font-semibold text-orange">
          Commentaires
        </h2>
        <div className="flex gap-1">
          <Rating rating={3.5} ratingCount={4} />
        </div>
      </div>
    </main>
  );
};

export default EventDetail;

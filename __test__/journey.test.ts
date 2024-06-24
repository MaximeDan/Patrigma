import { testApiHandler } from "next-test-api-route-handler";
import * as journeyHandler from "@/app/api/journeys/route";
import * as journeyWithParamsHandler from "@/app/api/journeys/[id]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.journey.create({
    data: {
      id: 999,
      authorId: 1,
      title: "Mon premier parcours",
      description: "Ceci est un exemple de parcours",
      requirement: "Aucun",
      treasure: "Un trésor caché",
      estimatedDistance: 10,
      estimatedDuration: 120,
      cluesDifficulty: 3,
      physicalDifficulty: 2,
      lastCompletion: "2022-12-01T00:00:00.000Z",
      mobilityImpaired: "undefined",
      partiallySighted: "undefined",
      partiallyDeaf: "undefined",
      cognitivelyImpaired: "undefined",
      steps: {
        create: [
          {
            puzzle: "Première énigme",
            answer: "Réponse à la première énigme",
            hint: "Indice pour la première énigme",
            picturePuzzle: "url_de_l'image_de_l'énigme",
            pictureHint: "url_de_l'image_de_l'indice",
            latitude: 45.7578137,
            longitude: 4.8320114,
            address: "1 Place Bellecour",
            city: "Lyon",
            postalCode: "69002",
            country: "France",
            stepNumber: 1,
          },
        ],
      },
    },
  });
});

it("Get all Journeys", async () => {
  await testApiHandler({
    appHandler: journeyHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
    },
  });
});

it("Create a journey successfully", async () => {
  await testApiHandler({
    appHandler: journeyHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "POST",
        body: JSON.stringify({
          journey: {
            authorId: 1,
            title: "Mon premier parcours",
            description: "Ceci est un exemple de parcours",
            requirement: "Aucun",
            treasure: "Un trésor caché",
            estimatedDistance: 10,
            estimatedDuration: 120,
            cluesDifficulty: 3,
            physicalDifficulty: 2,
            lastCompletion: "2022-12-01T00:00:00.000Z",
            mobilityImpaired: "undefined",
            partiallySighted: "undefined",
            partiallyDeaf: "undefined",
            cognitivelyImpaired: "undefined",
          },
          steps: [
            {
              puzzle: "Première énigme",
              answer: "Réponse à la première énigme",
              hint: "Indice pour la première énigme",
              picturePuzzle: "url_de_l'image_de_l'énigme",
              pictureHint: "url_de_l'image_de_l'indice",
              latitude: 45.7578137,
              longitude: 4.8320114,
              address: "1 Place Bellecour",
              city: "Lyon",
              postalCode: "69002",
              country: "France",
              stepNumber: 1,
            },
            {
              puzzle: "Deuxième énigme",
              answer: "Réponse à la deuxième énigme",
              hint: "Indice pour la deuxième énigme",
              picturePuzzle: "url_de_l'image_de_l'énigme",
              pictureHint: "url_de_l'image_de_l'indice",
              latitude: 45.7582413,
              longitude: 4.835658,
              address: "2 Place Antonin Poncet",
              city: "Lyon",
              postalCode: "69002",
              country: "France",
              stepNumber: 2,
            },
          ],
        }),
      });
      expect(res.status).toBe(201);
    },
  });
});

it("Create a journey with missing arguments", async () => {
  await testApiHandler({
    appHandler: journeyHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "POST",
        body: JSON.stringify({
          journey: {
            authorId: 1,
            title: "Mon premier parcours",
            description: "Ceci est un exemple de parcours",
            requirement: "Aucun",
            treasure: "Un trésor caché",
            estimatedDistance: 10,
            estimatedDuration: 120,
            cluesDifficulty: 3,
            physicalDifficulty: 2,
            lastCompletion: "2022-12-01T00:00:00.000Z",
            mobilityImpaired: "undefined",
            partiallySighted: "undefined",
            partiallyDeaf: "undefined",
            cognitivelyImpaired: "undefined",
          },
        }),
      });
      expect(res.status).toBe(400);
    },
  });
});

it("Update a journey with a specific id", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "999";
    },
    appHandler: journeyWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "PUT",
        body: JSON.stringify({
          journey: {
            authorId: 1,
            title: "Mon premier parcours (modifié)",
            description: "Ceci est un exemple de parcours (modifié)",
            requirement: "Aucun",
            treasure: "Un trésor caché (modifié)",
            estimatedDistance: 10,
            estimatedDuration: 120,
            cluesDifficulty: 3,
            physicalDifficulty: 2,
            lastCompletion: "2022-12-01T00:00:00.000Z",
            mobilityImpaired: "undefined",
            partiallySighted: "undefined",
            partiallyDeaf: "undefined",
            cognitivelyImpaired: "undefined",
          },
          steps: [
            {
              puzzle: "Première énigme (modifié)",
              answer: "Réponse à la première énigme (modifié)",
              hint: "Indice pour la première énigme",
              picturePuzzle: "url_de_l'image_de_l'énigme",
              pictureHint: "url_de_l'image_de_l'indice",
              latitude: 45.7578137,
              longitude: 4.8320114,
              address: "1 Place Bellecour",
              city: "Lyon",
              postalCode: "69002",
              country: "France",
              stepNumber: 1,
            },
            {
              puzzle: "Deuxième énigme (modifié)",
              answer: "Réponse à la deuxième énigme (modifié)",
              hint: "Indice pour la deuxième énigme (modifié)",
              picturePuzzle: "url_de_l'image_de_l'énigme",
              pictureHint: "url_de_l'image_de_l'indice",
              latitude: 45.7582413,
              longitude: 4.835658,
              address: "2 Place Antonin Poncet",
              city: "Lyon",
              postalCode: "69002",
              country: "France",
              stepNumber: 2,
            },
          ],
        }),
      });
      expect(res.status).toBe(200);
    },
  });
});

it("Update a journey that doesn't exist", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "2345";
    },
    appHandler: journeyWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "PUT",
        body: JSON.stringify({
          journey: {
            authorId: 1,
            title: "Mon premier parcours (modifié)",
            description: "Ceci est un exemple de parcours (modifié)",
            requirement: "Aucun",
            treasure: "Un trésor caché (modifié)",
            estimatedDistance: 10,
            estimatedDuration: 120,
            cluesDifficulty: 3,
            physicalDifficulty: 2,
            lastCompletion: "2022-12-01T00:00:00.000Z",
            mobilityImpaired: "undefined",
            partiallySighted: "undefined",
            partiallyDeaf: "undefined",
            cognitivelyImpaired: "undefined",
          },
          steps: [
            {
              puzzle: "Première énigme (modifié)",
              answer: "Réponse à la première énigme (modifié)",
              hint: "Indice pour la première énigme",
              picturePuzzle: "url_de_l'image_de_l'énigme",
              pictureHint: "url_de_l'image_de_l'indice",
              latitude: 45.7578137,
              longitude: 4.8320114,
              address: "1 Place Bellecour",
              city: "Lyon",
              postalCode: "69002",
              country: "France",
              stepNumber: 1,
            },
          ],
        }),
      });
      expect(res.status).toBe(404);
    },
  });
});

it("Delete a journey with a specific id", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "999";
    },
    appHandler: journeyWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "DELETE" });
      expect(res.status).toBe(204);
    },
  });
});

it("Delete a journey that doesn't exist", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "2345";
    },
    appHandler: journeyWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "DELETE" });
      expect(res.status).toBe(404);
    },
  });
});

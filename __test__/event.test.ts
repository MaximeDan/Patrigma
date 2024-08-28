/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import * as eventHandler from "@/app/api/events/route";
import * as eventWithParamsHandler from "@/app/api/events/[id]/route";

it("Get all Events", async () => {
  await testApiHandler({
    appHandler: eventHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
    },
  });
});

it("Create an event successfully", async () => {
  await testApiHandler({
    appHandler: eventHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "POST",
        body: JSON.stringify({
          authorId: 1,
          journeyId: 1,
          title: "string",
          image: "https://www.google.com",
          numberPlayerMin: 1,
          numberPlayerMax: 10,
          description: "string",
          isPrivate: false,
          accessCode: undefined,
          startAt: "2024-08-28T10:12:39.162Z",
          endAt: "2024-08-28T10:12:39.162Z",
        }),
      });
      const data = await res.json();
      console.log("create event", data);
      expect(res.status).toBe(201);
    },
  });
});

it("Create an event with missing arguments", async () => {
  await testApiHandler({
    appHandler: eventHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "POST",
        body: JSON.stringify({
          authorId: 1,
          journeyId: 1,
          image: "string",
          numberPlayerMin: 1,
          numberPlayerMax: 10,
          description: "string",
          isPrivate: false,
          accessCode: undefined,
          startAt: "2024-08-28T10:12:39.162Z",
          endAt: "2024-08-28T10:12:39.162Z",
        }),
      });
      expect(res.status).toBe(400);
    },
  });
});

it("Update a journey with a specific id", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "1";
    },
    appHandler: eventWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "PUT",
        body: JSON.stringify({
          title: "new title",
          description: "string",
          numberPlayerMin: 1,
          numberPlayerMax: 10,
          isPrivate: false,
          authorId: 1,
          accessCode: undefined,
          startAt: "2024-08-28T10:12:39.162Z",
          endAt: "2024-08-28T10:12:39.162Z",
          image: "https://www.google.com",
        }),
      });
      const data = await res.json();
      console.log("update event", data);
      expect(res.status).toBe(200);
    },
  });
});

it("Update an event with missing arguments", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "1";
    },
    appHandler: eventWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "PUT",
        body: JSON.stringify({
          // title: "new title",
          description: "string",
          numberPlayerMin: 1,
          numberPlayerMax: 10,
          isPrivate: false,
          authorId: 1,
          accessCode: undefined,
          startAt: "2024-08-28T10:12:39.162Z",
          endAt: "2024-08-28T10:12:39.162Z",
        }),
      });
      expect(res.status).toBe(400);
    },
  });
});

it("Update an event that doesn't exist", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "100";
    },
    appHandler: eventWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({
        method: "PUT",
        body: JSON.stringify({
          title: "new title",
          description: "string",
          numberPlayerMin: 1,
          numberPlayerMax: 10,
          isPrivate: false,
          authorId: 1,
          accessCode: undefined,
          startAt: "2024-08-28T10:12:39.162Z",
          endAt: "2024-08-28T10:12:39.162Z",
          image: "https://www.google.com",
        }),
      });
      expect(res.status).toBe(404);
    },
  });
});

it("Delete an event with a specific id", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "1";
    },
    appHandler: eventWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "DELETE" });
      const data = await res.json();
      console.log("delete event", data);
      expect(res.status).toBe(204);
    },
  });
});

it("Delete an event that doesn't exist", async () => {
  await testApiHandler({
    paramsPatcher(params) {
      params.id = "100";
    },
    appHandler: eventWithParamsHandler,
    async test({ fetch }) {
      const res = await fetch({ method: "DELETE" });
      expect(res.status).toBe(404);
    },
  });
});

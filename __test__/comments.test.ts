/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import * as postCommentHandler from "@/app/api/comments/route";
import * as commentByIdHandler from "@/app/api/comments/[id]/route";

let commentId: number;
describe("Comment API", () => {
  describe("POST /api/comments", () => {
    it("should create a new comment successfully", async () => {
      await testApiHandler({
        appHandler: postCommentHandler,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              comment: {
                content: "This is a test comment from test",
                authorId: 1,
                journeyId: 5,
                rating: 5,
              },
            }),
          });

          const data = await res.json();
          commentId = data.data.id;

          expect(res.status).toBe(201);
          expect(data).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                content: "This is a test comment from test",
                authorId: 1,
                journeyId: 5,
                rating: 5,
              }),
            }),
          );
        },
      });
    });

    it("should return an error when required fields are missing", async () => {
      await testApiHandler({
        appHandler: postCommentHandler,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              comment: {
                content: "Incomplete comment",
              },
            }),
          });

          expect(res.status).toBe(400);
          const data = await res.json();
          expect(data).toEqual(
            expect.objectContaining({
              message: expect.any(String),
            }),
          );
        },
      });
    });
  });

  describe("GET /api/comments/[id]", () => {
    it("should retrieve a comment by id", async () => {
      await testApiHandler({
        appHandler: commentByIdHandler,
        params: { id: commentId.toString() },
        test: async ({ fetch }) => {
          const res = await fetch({ method: "GET" });
          const data = await res.json();

          expect(res.status).toBe(200);
          expect(data).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                id: commentId,
                authorId: 1,
                content: "This is a test comment from test",
                journeyId: 5,
                rating: 5,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              }),
            }),
          );
        },
      });
    });
  });

  describe("PUT /api/comments/[id]", () => {
    it("should update a comment successfully", async () => {
      await testApiHandler({
        appHandler: commentByIdHandler,
        paramsPatcher: (params) => {
          params.id = commentId.toString();
        },
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              comment: {
                content: "Updated test comment content",
                authorId: 1,
                journeyId: 5,
                rating: 4,
              },
            }),
          });

          const data = await res.json();

          expect(res.status).toBe(200);
          expect(data).toEqual(
            expect.objectContaining({
              data: expect.objectContaining({
                content: "Updated test comment content",
                authorId: 1,
                journeyId: 5,
                rating: 4,
              }),
            }),
          );
        },
      });
    });
  });

  describe("DELETE /api/comments/[id]", () => {
    it("should delete a comment successfully", async () => {
      await testApiHandler({
        appHandler: commentByIdHandler,
        paramsPatcher: (params) => {
          params.id = commentId.toString();
        },
        test: async ({ fetch }) => {
          const res = await fetch({ method: "DELETE" });

          expect(res.status).toBe(204);
        },
      });
    });
  });
});

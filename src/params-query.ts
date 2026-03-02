// PRAKTIKUM 2 - validasi params & query
import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())
  .get(
    "/products/:id",
    ({ params, query }) => {
      return {
        id: params.id,
        sort: query.sort
      };
    },
    {
      params: t.Object({
        id: t.Number()
      }),
      query: t.Object({
        sort: t.Union([
          t.Literal("asc"),
          t.Literal("desc")
        ])
      })
    }
  )
  .listen(3000);

console.log("Server running at http://localhost:3000");
// PRAKTIKUM 3 - validasi response
import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())

  .get(
    "/stats",
    () => {
      return {
        total: 275,
        active: 75
      };
    },
    {
      response: t.Object({
        total: t.Number(),
        active: t.Number()
      })
    }
  )

  .listen(3000);

console.log("Server running at http://localhost:3000");
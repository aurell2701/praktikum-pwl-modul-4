import { Elysia, t } from "elysia";

const app = new Elysia()

  .get(
    "/stats",
    () => {
      return {
        total: 100,
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
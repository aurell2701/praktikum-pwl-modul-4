// PRAKTIKUM 4 - beforeHandle
import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

new Elysia()
  .use(openapi())
  .get(
    "/admin",
    () => ({ stats: 1207 }),
    {
      headers: t.Object({
        authorization: t.String()
      }),
      beforeHandle({ headers, set }) {
        if (headers.authorization !== "Bearer 123") {
          set.status = 401;
          return {
            success: false,
            message: "Unauthorized"
          };
        }
      }
    }
  )
  .listen(3000);

console.log("Server running at http://localhost:3000");
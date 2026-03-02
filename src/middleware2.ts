import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())

  .onAfterHandle(({ response }) => {
    return {
      success: true,
      message: "data tersedia",
      data: response
    };
  })

  .get("/product", () => ({
    id: 4,
    name: "Earbud"
  }))

  .listen(3000);

console.log("Server running at http://localhost:3000");
import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())

  .onRequest(({ request }) => {
    console.log("📥", request.method, request.url);
    console.log("🕒", new Date().toISOString());
  })

  // ✅ PRAKTIKUM 5 - afterHandle 
  .onAfterHandle(({ response }) => {
  return {
    success: true,
    message: "data tersedia",
    data: response
  };
})

  // ✅ PRAKTIKUM 4 - beforeHandle
  .get(
    "/admin",
    () => {
      return {
        stats: 99
      };
    },
    {
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

  .get("/profile", () => ({
    name: "Aurellya"
  }))

  .get("/product", () => ({
  id: 1,
  name: "Laptop"
  }))

  .post(
    "/register",
    ({ body }) => body,
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" })
      })
    }
  )

  // ✅ PRAKTIKUM 6 - custom validation error
  .post(
  "/login",
  ({ body }) => body,
  {
    body: t.Object({
      email: t.String(),
      password: t.String({ minLength: 8 })
      })
    }
  )

  .onError(({ code, set }) => {

  if (code === "VALIDATION") {
    set.status = 400;
    return {
      success: false,
      error: "Validation Error"
    };
  }

  if (code === "NOT_FOUND") {
    set.status = 404;
    return {
      message: "Route not found"
    };
  }

  set.status = 500;
  return {
    message: "Internal Server Error"
    };
  })

  .get("/", () => "Hello Middleware")

  .listen(3000);

console.log("Server running at http://localhost:3000");
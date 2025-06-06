import { Elysia } from "elysia";
import { handleSetRiddle } from "./utils/helpers/global.helper";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .post("/trigger_new_riddle", async ({ body }) => {
    try {
      console.log("trigger_new_riddle");
      await handleSetRiddle();
      return { success: true };
    } catch (error) {
      return { success: false, error: error };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

async function main() {}

main();

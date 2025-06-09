import { Elysia } from "elysia";
import { handleSetRiddle } from "./utils/helpers/global.helper";
import { WebhookPayload } from "./utils/types/global.type";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .post("/trigger_new_riddle", async ({ body }: { body: WebhookPayload }) => {
    try {
      console.log("trigger_new_riddle");
      await handleSetRiddle();

      app.server?.publish("updates", JSON.stringify("New riddle available!"));

      return { success: true };
    } catch (error) {
      return { success: false, error: error };
    }
  })
  .post("/new_attempt", async ({ body }: { body: WebhookPayload }) => {
    try {
      app.server?.publish(
        "updates",
        JSON.stringify({
          type: "new_attempt",
          data: body.event.data.new,
          timestamp: body.created_at,
        })
      );

      return { success: true, message: "New attempt recorded" };
    } catch (error) {
      return { success: false, error: error };
    }
  })
  .ws("/updates", {
    open(ws) {
      ws.subscribe("updates");
    },
    message(ws, message) {
      ws.send("hello " + message);
    },
  })
  .listen(process.env.RIDDLE_API_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

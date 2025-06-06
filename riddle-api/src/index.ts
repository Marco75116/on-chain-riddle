import { Elysia } from "elysia";
import { handleSetRiddle } from "./utils/helpers/global.helper";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

async function main() {
  // handleSetRiddle();
}

main();

import { fromHono } from "chanfana";
import { Hono } from "hono";
import { HomePageRoute } from "./endpoints/get";
import { GenerateContactRoute } from "./endpoints/api/get";

// Start Hono app
const app = new Hono();

// Setup OpenAPI
const openapi = fromHono(app, { docs_url: "/docs" });

// Register OpenAPI endpoints
openapi.get("/api/contact", GenerateContactRoute);

// Register other endpoints
app.get("/", HomePageRoute);

// Export the Hono app
export default app;

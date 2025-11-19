import type { Context } from "hono";

export function HomePageRoute(cxt: Context): Response {
	// Redirect to the static frontend
	return cxt.redirect("/", 302);
}

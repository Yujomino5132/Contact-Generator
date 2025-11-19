import type { Context } from "hono";

export async function HomePageRoute(c: Context): Promise<Response> {
	// Serve the static HTML file
	return c.html(`<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" type="image/svg+xml" href="/vite.svg" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Contact Generator</title>
		<script type="module" crossorigin src="/assets/index-DkS9qtGY.js"></script>
		<link rel="stylesheet" crossorigin href="/assets/index-Oqak5WzN.css">
	</head>
	<body>
		<div id="root"></div>
	</body>
</html>`);
}

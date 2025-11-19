import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { generateContact } from "../../utils/generateContactUtil";

export class GenerateContactRoute extends OpenAPIRoute {
    schema = {
        tags: ["Contact"],
        summary: "Generate a random contact",
        description: "Generates a fake contact information entry with optional fields.",
        parameters: [
            {
                name: "includeEmail",
                in: "query",
                description: "Whether to include email in the contact",
                required: false,
                schema: { type: "boolean", default: true },
            },
            {
                name: "includePhone",
                in: "query",
                description: "Whether to include phone number in the contact",
                required: false,
                schema: { type: "boolean", default: true },
            },
            {
                name: "includeAddress",
                in: "query",
                description: "Whether to include address in the contact",
                required: false,
                schema: { type: "boolean", default: false },
            },
        ],
        responses: {
            "200": {
                description: "Contact generated successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                email: { type: "string" },
                                phone: { type: "string" },
                                address: {
                                    type: "object",
                                    properties: {
                                        street: { type: "string" },
                                        city: { type: "string" },
                                        state: { type: "string" },
                                        zipCode: { type: "string" },
                                        country: { type: "string" }
                                    }
                                }
                            }
                        },
                    },
                },
            },
            "400": {
                description: "Invalid request parameters",
            },
            "500": {
                description: "Internal Server Error",
            },
        },
    };

    async handle(c) {
        try {
            const url = new URL(c.req.url);

            // Parse and validate parameters
            const schema = z.object({
                includeEmail: z.enum(["true", "false"]).default("true"),
                includePhone: z.enum(["true", "false"]).default("true"),
                includeAddress: z.enum(["true", "false"]).default("false"),
            });

            const parsedParams = schema.safeParse({
                includeEmail: url.searchParams.get("includeEmail") ?? "true",
                includePhone: url.searchParams.get("includePhone") ?? "true",
                includeAddress: url.searchParams.get("includeAddress") ?? "false",
            });

            if (!parsedParams.success) {
                return c.json(
                    { error: "Invalid request parameters", details: parsedParams.error.format() },
                    400
                );
            }

            // Generate contact
            const { includeEmail, includePhone, includeAddress } = parsedParams.data;
            const contact = generateContact(
                includeEmail === "true",
                includePhone === "true", 
                includeAddress === "true"
            );

            return c.json(contact);
        } catch (error) {
            console.error("Error generating contact:", error);
            return c.json({ error: "Internal Server Error" }, 500);
        }
    }
}

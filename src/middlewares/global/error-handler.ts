import type { ErrorHandler } from "hono";
import { HTTPError } from "@utils/http-error";
import { ZodError } from "zod";

export const onErrorHandler: ErrorHandler = (err, c) => {
  console.log("=== GLOBAL ERROR HANDLER ===");
  console.log("Error type:", err?.constructor?.name);
  console.log("Error instanceof HTTPError:", err instanceof HTTPError);
  console.log("Error instanceof ZodError:", err instanceof ZodError);
  console.log("Full error:", err);

  if (err instanceof HTTPError) {
    console.log("Handling as HTTPError with status:", err.statusCode);

    return c.json(
      {
        response: false,
        message: err.message,
      },
      err.statusCode as any,
    );
  }

  if (err instanceof ZodError) {
    console.log("Handling as ZodError");
    return c.json(
      {
        response: false,
        message: "Validation error",
        errors: err.issues,
      },
      400,
    );
  }

  // Handle generic errors
  console.error("Handling as generic error");
  return c.json(
    {
      response: false,
      message: err instanceof Error ? err.message : "Internal server error",
    },
    500,
  );
};

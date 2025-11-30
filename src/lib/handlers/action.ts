// lib/handlers/action.ts
"use server";

import { ZodError, z } from "zod";
import { UnauthorizedError, ValidationError } from "../http-errors";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type ActionOptions<T> = {
  params?: T;
  schema?: z.ZodSchema<T>;
  authorize?: boolean;
};

const action = async <T>({ params, schema, authorize }: ActionOptions<T>) => {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      }
      return new Error("Schema validation failed");
    }
  }

  let session = null;

  if (authorize) {
    // Get actual session from Better Auth
    session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return new UnauthorizedError();
    }
  }

  return { params, session };
};

export default action;

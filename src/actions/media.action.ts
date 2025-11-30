// actions/media.action.ts
"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";

import { and, count, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  CreateMediaParams,
  MediaQueryParams,
  SelectMediaModel,
  UpdateMediaParams,
  createMediaSchema,
  media,
  mediaQuerySchema,
  updateMediaSchema,
} from "@/db/schema/media";
import { handleError } from "@/lib/handlers";
import action from "@/lib/handlers/action";
import { PaginatedSearchParamsSchema } from "@/lib/schema";
import { PaginatedSearchParams } from "@/types";

export const createMedia = async (
  params: CreateMediaParams
): Promise<ActionResponse<SelectMediaModel>> => {
  const validationResult = await action({
    params,
    schema: createMediaSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { fileName, originalUrl, mediaType, transformationConfig } =
    validationResult.params!;

  const userId = validationResult.session!.user.id;

  try {
    const [newMedia] = await db
      .insert(media)
      .values({
        fileName,
        originalUrl,
        mediaType,
        transformationConfig,
        userId,
      })
      .returning();

    if (!newMedia) {
      throw new Error("Failed to create media record");
    }

    revalidatePath("/");

    return { success: true, data: newMedia };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getMedia = cache(
  async (
    params: MediaQueryParams
  ): Promise<ActionResponse<SelectMediaModel>> => {
    const validationResult = await action({
      params,
      schema: mediaQuerySchema,
      authorize: true,
    });

    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    const { id } = validationResult.params!;
    const userId = validationResult.session!.user.id;

    try {
      const [mediaItem] = await db
        .select()
        .from(media)
        .where(and(eq(media.id, id), eq(media.userId, userId)))
        .limit(1);

      if (!mediaItem) {
        throw new Error("Media not found");
      }

      return { success: true, data: mediaItem };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
);

export const getAllMedia = cache(
  async (
    params: PaginatedSearchParams
  ): Promise<
    ActionResponse<{ media: SelectMediaModel[]; isNext: boolean }>
  > => {
    const validationResult = await action({
      params,
      schema: PaginatedSearchParamsSchema,
      authorize: true,
    });

    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    const { page = 1, pageSize = 10, filter } = validationResult.params!;
    const userId = validationResult.session!.user.id;
    const skip = (Number(page) - 1) * pageSize;
    const limit = Number(pageSize);

    try {
      const conditions = [eq(media.userId, userId)];

      if (filter) {
        conditions.push(
          eq(media.mediaType, filter.toUpperCase() as "IMAGE" | "VIDEO")
        );
      }

      const whereCondition = and(...conditions);

      const [totalResult] = await db
        .select({ count: count() })
        .from(media)
        .where(whereCondition);

      const totalCount = totalResult?.count || 0;

      const mediaItems = await db
        .select()
        .from(media)
        .where(whereCondition)
        .orderBy(desc(media.createdAt))
        .offset(skip)
        .limit(limit);

      const isNext = totalCount > skip + limit;

      return {
        success: true,
        data: {
          media: mediaItems,
          isNext,
        },
      };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
);

export const updateMedia = async (
  params: UpdateMediaParams
): Promise<ActionResponse<SelectMediaModel>> => {
  const validationResult = await action({
    params,
    schema: updateMediaSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { id, transformedUrl, transformationConfig } = validationResult.params!;
  const userId = validationResult.session!.user.id;

  try {
    const [updatedMedia] = await db
      .update(media)
      .set({
        transformedUrl,
        transformationConfig,
      })
      .where(and(eq(media.id, id), eq(media.userId, userId)))
      .returning();

    if (!updatedMedia) {
      throw new Error("Media not found or failed to update");
    }

    revalidatePath("/");
    revalidatePath(`/studio/${id}`);

    return { success: true, data: updatedMedia };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

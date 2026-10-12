"use server";

import { updateTag, unstable_cache } from "next/cache";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getComments(postId: string) {
  const getCachedComments = unstable_cache(
    async (postId: string) => {
      return await convex.query(api.blogComments.get, { postId });
    },
    [`comments-${postId}`],
    {
      tags: [`comments-${postId}`],
    },
  );

  return getCachedComments(postId);
}

export async function addComment(formData: FormData) {
  const postId = formData.get("postId") as string;
  const text = formData.get("text") as string;

  if (!text?.trim()) {
    return;
  }

  await convex.mutation(api.blogComments.addComment, { postId, text });

  updateTag(`comments-${postId}`);
}

export async function upvoteComment(formData: FormData) {
  const commentId = formData.get("commentId") as string;
  const postId = formData.get("postId") as string;

  await convex.mutation(api.blogComments.upvote, {
    postId,
    commentId: commentId as Id<"blogComments">,
  });

  updateTag(`comments-${postId}`);
}

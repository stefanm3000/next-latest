import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { CommentInput } from "./_components/comment-input";
import { ConvexClientProvider } from "./_components/convex-client-provider";
import { CommentsGrid } from "./_components/comments-grid";
import { CursorPagination } from "./_components/cursor-pagination";
import { CommentsPerPage } from "./_components/comments-per-page";
import { Routes } from "@/src/utils/routes";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "next 15 | comments",
  description: "leave me a comment, improvements, suggestions etc",
};

const getComments = async ({
  cursor,
  perPage = "5",
}: {
  cursor?: string | null;
  perPage?: string;
} = {}) =>
  await fetchQuery(api.comments.get, {
    paginationOptions: {
      numItems: parseInt(perPage),
      cursor: cursor || null,
    },
  });

async function CommentResults({
  searchParams,
}: {
  searchParams: Promise<{ cursor?: string; perPage?: string }>;
}) {
  const { cursor, perPage } = await searchParams;
  const commentsPromise = getComments({ cursor, perPage });

  return (
    <>
      <CommentsGrid commentsPromise={commentsPromise} />
      <CursorPagination
        commentsPromise={commentsPromise}
        baseUrl={Routes.COMMENTS}
      />
    </>
  );
}

export default function Comments({
  searchParams,
}: {
  searchParams: Promise<{ cursor?: string; perPage?: string }>;
}) {
  return (
    <ConvexClientProvider>
      <div className="min-h-[calc(100vh-140px)] flex flex-col gap-2 relative">
        <p className="text-gray-400 text-sm mb-6">
          built with{" "}
          <a
            href="https://www.convex.dev/"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            convex
          </a>
          . leave me a comment, but don&apos;t be mean
        </p>

        <div className="flex justify-between mb-4">
          <div></div>
          <Suspense fallback={<div className="h-10" />}>
            <CommentsPerPage />
          </Suspense>
        </div>

        <Suspense fallback={<p className="text-gray-400">Loading comments...</p>}>
          <CommentResults searchParams={searchParams} />
        </Suspense>

        <CommentInput />
      </div>
    </ConvexClientProvider>
  );
}

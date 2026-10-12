import { type SanityDocument } from "next-sanity";
import { client } from "@/src/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { Suspense, ViewTransition } from "react";
import { ArrowLeft } from "lucide-react";

import { PostBody } from "./_components/post-body";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { DynamicValue } from "./_components/dynamic-value";

import { ConvexClientProvider } from "../../comments/_components/convex-client-provider";
import { BlogComments } from "./_components/blog-comments";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

async function getPost(slug: string) {
  "use cache";
  cacheLife({ stale: 30, revalidate: 30, expire: 3600 });

  return client.fetch<SanityDocument | null>(POST_QUERY, { slug });
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const post = await getPost(params.slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(
    `*[_type == "post" && defined(slug.current)]{slug}`,
  );
  return posts.map((post) => ({ slug: post.slug.current }));
}

export default async function PostPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;

  const post = await getPost(params.slug);
  if (!post) notFound();
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-black">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8  text-sm"
          >
            <ArrowLeft size={16} />
            <span>back to blog</span>
          </Link>

          <article className="space-y-8">
            {postImageUrl && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                <ViewTransition name={`blog-post-image-${params.slug}`}>
                  <Image
                    src={postImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </ViewTransition>
              </div>
            )}

            <header className="space-y-4">
              <ViewTransition name={`blog-post-${params.slug}`}>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight ">
                  {post.title}
                </h1>
              </ViewTransition>

              <div className="flex items-center space-x-4 text-gray-400  text-sm">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="bg-white/10 text-white px-2 py-1 rounded text-xs">
                  article
                </span>
              </div>
            </header>

            <Suspense
              fallback={
                <div className="h-[50px] flex items-center max-w-[576px] mx-auto border border-white/10 rounded-md animate-pulse">
                  <span className="text-xs text-gray-400 mx-auto text-center">
                    loading...
                  </span>
                </div>
              }
            >
              <DynamicValue postId={post._id} />
            </Suspense>

            <PostBody post={post} urlFor={urlFor} />

            <Suspense fallback={<div>Loading...</div>}>
              <BlogComments postId={post._id} />
            </Suspense>
          </article>
        </div>
      </div>
    </ConvexClientProvider>
  );
}

import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/src/sanity/client";
import { BlogPostCard } from "./_components/blog-post-card";
import { Metadata } from "next";
import { cacheLife } from "next/cache";

export const metadata: Metadata = {
  title: "next 15 | blog",
  description: "read the latest articles, made w sanity",
};

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug, 
  publishedAt,
  excerpt,
  image,
}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function BlogPostPage() {
  "use cache";
  cacheLife({ stale: 30, revalidate: 30, expire: 3600 });

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  const noPosts = posts.length === 0;

  if (noPosts) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4 ">no posts found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-gray-400 text-sm mb-6  flex flex-col gap-2">
        <p>
          these blog posts are rendered using next.js{" "}
          <a
            href="https://nextjs.org/docs/app/getting-started/caching"
            className="underline"
          >
            PPR
          </a>{" "}
          with{" "}
          <a href="https://sanity.io" className="underline">
            sanity
          </a>{" "}
          as the cms. the comments are dynamic (and the other small client
          island), but the rest of the page is statically prerendered.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(({ _id, image, title, slug, excerpt, publishedAt }) => {
          const src = urlFor(image)?.width(400).height(225).url() ?? null;

          return (
            <BlogPostCard
              key={_id}
              imageSrc={src}
              title={title}
              slug={slug.current}
              excerpt={excerpt}
              publishedAt={publishedAt}
            />
          );
        })}
      </div>
    </div>
  );
}

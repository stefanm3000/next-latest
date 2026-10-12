import { ImageOffIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import Image from "next/image";

interface BlogPostCardProps {
  slug: string;
  excerpt: string;
  publishedAt: string;
  title: string;
  imageSrc: string | null;
}

export const BlogPostCard = ({
  imageSrc = null,
  title,
  slug,
  excerpt,
  publishedAt,
}: BlogPostCardProps) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group bg-white/5 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="relative aspect-[16/9]">
        {imageSrc ? (
          <ViewTransition name={`blog-post-image-${slug}`}>
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </ViewTransition>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-gray-500 text-center p-4 flex flex-col items-center gap-2">
              <ImageOffIcon size={48} />
              <p className="text-sm ">no image</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      <div className="p-4">
        <ViewTransition name={`blog-post-${slug}`}>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors  line-clamp-2">
            {title}
          </h2>
        </ViewTransition>

        {excerpt && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-3 ">{excerpt}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 ">
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span className="bg-white/10 text-white px-2 py-1 rounded">
            article
          </span>
        </div>
      </div>
    </Link>
  );
};

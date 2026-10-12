import { ViewTransition } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ViewTransition name="blog">
        <h1 className="text-2xl font-bold mb-8 text-white ">blog</h1>
      </ViewTransition>
      {children}
    </div>
  );
}

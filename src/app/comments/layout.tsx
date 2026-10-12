import { ViewTransition } from "react";

export default function CommentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ViewTransition name="comments">
        <h1 className="text-2xl font-bold mb-8 text-white">comments</h1>
      </ViewTransition>
      {children}
    </div>
  );
}

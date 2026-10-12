import { ViewTransition } from "react";
import { ConvexClientProvider } from "../comments/_components/convex-client-provider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ViewTransition name="chat">
        <h1 className="text-2xl font-bold mb-2">chat</h1>
      </ViewTransition>
      <p className="text-gray-400 text-sm mb-6">
        realtime chat built with{" "}
        <a
          href="https://www.convex.dev/"
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          convex
        </a>
        . open 2 tabs side by side to test sync
      </p>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </div>
  );
}

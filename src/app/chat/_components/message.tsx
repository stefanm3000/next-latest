import { Id } from "@/convex/_generated/dataModel";
import { ViewTransition } from "react";

interface Message {
  _id: Id<"messages">;
  _creationTime: number;
  user: string;
  userId: string;
  body: string;
}

export function Message({
  msg,
  isOwnMessage,
}: {
  msg: Message;
  isOwnMessage: boolean;
}) {
  return (
    <ViewTransition name={`message-${msg._id}`}>
      <div
        className={`flex flex-col gap-2 ${isOwnMessage ? "items-end" : "items-start"}`}
      >
        <div
          className={`text-sm text-neutral-500 flex items-center gap-2 ${isOwnMessage ? "ml-auto" : ""}`}
        >
          {msg.user} @<div>{new Date(msg._creationTime).toLocaleString()}</div>
        </div>
        <div
          className={`p-2 rounded-md text-white flex w-fit text-sm max-w-[70%] ${
            isOwnMessage ? "bg-blue-600 ml-auto" : "bg-neutral-900"
          }`}
        >
          {msg.body}
        </div>
      </div>
    </ViewTransition>
  );
}

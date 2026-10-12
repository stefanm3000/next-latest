"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, ViewTransition } from "react";
import { Message } from "./message";
import { useChatUser } from "../_hooks/use-chat-user";

export function Messages() {
  const messages = useQuery(api.chat.getMessages);
  const { userId } = useChatUser();

  useEffect(() => {
    if (messages) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <ViewTransition>
      <div className="flex flex-col gap-4 p-2 h-full overflow-y-auto w-full md:max-w-[800px] mx-auto whitespace-pre-wrap no-scrollbar">
        {messages?.map((msg) => {
          const isOwnMessage = msg.userId === userId;

          return (
            <Message key={msg._id} msg={msg} isOwnMessage={isOwnMessage} />
          );
        })}
      </div>
    </ViewTransition>
  );
}

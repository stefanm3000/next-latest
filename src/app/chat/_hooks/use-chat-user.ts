import { useSyncExternalStore } from "react";

interface ChatUser {
  userId: string;
  username: string;
  updateUsername: (newUsername: string) => void;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("chat-user-change", onStoreChange);

  if (!localStorage.getItem("chatUserId")) {
    localStorage.setItem("chatUserId", crypto.randomUUID());
  }

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("chat-user-change", onStoreChange);
  };
}

const getUserId = () => localStorage.getItem("chatUserId") || "";
const getUsername = () => localStorage.getItem("chatUsername") || "";
const getServerSnapshot = () => "";

export function useChatUser(): ChatUser {
  const userId = useSyncExternalStore(subscribe, getUserId, getServerSnapshot);
  const username = useSyncExternalStore(subscribe, getUsername, getServerSnapshot);

  const updateUsername = (newUsername: string) => {
    localStorage.setItem("chatUsername", newUsername);
    window.dispatchEvent(new Event("chat-user-change"));
  };

  return { userId, username, updateUsername };
}

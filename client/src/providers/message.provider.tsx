import { ReactNode, useState } from "react";
import { MessagesContext } from "../contexts/message.context";

interface Message {
  message: string;
}

interface Props {
  children: ReactNode;
}

export const MessageProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<Message[] | null>(null);

  const value = { messages, setMessages };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

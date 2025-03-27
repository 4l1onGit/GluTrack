import { createContext } from "react";


interface Message {
    message: string;
  }
  

interface MessageContextType {
  messages: Message[] | null
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
}

export const MessagesContext = createContext<MessageContextType>({
  messages: null,
  setMessages: () => {}
});

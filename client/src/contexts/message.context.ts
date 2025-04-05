import { createContext } from "react";
import { Message } from "../utils/util";


interface MessageContextType {
  messages: Message[] | null
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
}

export const MessagesContext = createContext<MessageContextType>({
  messages: null,
  setMessages: () => {}
});

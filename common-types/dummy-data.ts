import { IMessage } from "./types";

export const dummyMessages: IMessage[] = [
    { isFromUser: false, content: "Hi, how can I help you?" },
    { isFromUser: true, content: "I need help with my order.", done: false },
    { isFromUser: false, content: "Sure, what's your order number?" },
    { isFromUser: true, content: "12345" },
    {
      isFromUser: false,
      content: "Thank you, let me check on that.",
      done: false,
    },
    {
      isFromUser: false,
      content:
        "It looks like your order is on its way. This is some sort of garbage words to test the length fot ehtext that is supported",
    },
    {
      isFromUser: true,
      content:
        "Great, thanks! but anyway I will heve to get you assistant in the future also, there fore please make sure to remember my past chat and data",
    },
  ];
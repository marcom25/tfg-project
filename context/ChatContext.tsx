import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ConversationDetails,
  getConversation,
  getMessages,
  Messages,
  createMessage,
  Conversations,
  getConversations,
} from "@/actions/chat";
import { getLoggedUser, LoggedUser } from "@/actions/users";

interface ChatContextType {
  selectedConversation: ConversationDetails | null;
  messages: Messages;
  conversations: Conversations;
  setConversations: React.Dispatch<React.SetStateAction<Conversations>>;
  selectConversation: (conversationId: number) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  loggedUser: LoggedUser | null;
  isSidebarLoading: boolean;
  isChatLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
   const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [selectedConversation, setSelectedConversation] = useState<
    ConversationDetails | null
  >(null);
  const [messages, setMessages] = useState<Messages>([]);
  const [conversations, setConversations] = useState<Conversations>([]);
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
  const [isSidebarLoading, setIsSidebarLoading] = useState(false); // Estado de carga para el sidebar
  const [isChatLoading, setIsChatLoading] = useState(false); // Estado de carga para el chat

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsSidebarLoading(true); // Inicia el estado de carga del sidebar
      try {
        const [allConversations, user] = await Promise.all([
          getConversations(),
          getLoggedUser(),
        ]);

        const conversationId = params.get("conversation");
        if (conversationId) {
          const conversation = allConversations.find(
            (conv) => conv.conversacion_id === Number(conversationId)
          );
          selectConversation(conversation?.conversacion_id ?? 0);
        }

        setConversations(allConversations);
        setLoggedUser(user);
      } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
      } finally {
        setIsSidebarLoading(false); // Finaliza el estado de carga del sidebar
      }
    };

    fetchInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectConversation = async (conversationId: number) => {
    setIsChatLoading(true); // Inicia el estado de carga del chat
    try {
      const conversation = await getConversation(conversationId);
      const conversationMessages = await getMessages(conversationId);
      replace(`?conversation=${conversation?.conversacion_id}`);

      setSelectedConversation(conversation ?? null);
      setMessages(conversationMessages);

    } catch (error) {
      console.error("Error al seleccionar la conversación:", error);
    } finally {
      setIsChatLoading(false); // Finaliza el estado de carga del chat
    }
  };

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;

    setIsChatLoading(true); // Inicia el estado de carga del chat
    try {
      const newMessage = await createMessage(selectedConversation.conversacion_id, { message });

      // Actualizar los mensajes en el estado
      setMessages((prev) => [...prev, newMessage]);

      // Volver a obtener todas las conversaciones para mantener el estado sincronizado
      const updatedConversations = await getConversations();
      setConversations(updatedConversations);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    } finally {
      setIsChatLoading(false); // Finaliza el estado de carga del chat
    }
  };

  return (
    <ChatContext.Provider
      value={{
        selectedConversation,
        messages,
        conversations,
        setConversations,
        selectConversation,
        sendMessage,
        loggedUser,
        isSidebarLoading, // Proveer el estado de carga del sidebar
        isChatLoading, // Proveer el estado de carga del chat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

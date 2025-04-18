import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { createMessage, Messages } from "@/actions/chat";
import { humanizeDate } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageFormSchema, MessageFormSchemaType } from "@/lib/schemas";
import { useChatContext } from "@/context/ChatContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import MainChatSkeleton from "../skeletons/main-chat-skeleton";

function MainChat() {
  const {
    selectedConversation,
    messages,
    sendMessage,
    loggedUser,
    isChatLoading,
  } = useChatContext();

  const form = useForm<MessageFormSchemaType>({
    resolver: zodResolver(MessageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: MessageFormSchemaType) => {
    if (!selectedConversation) return; // Evitar enviar mensajes si no hay conversación seleccionada
    await sendMessage(data.message);
    form.reset();
  };

  if (isChatLoading) {
    return (
      <MainChatSkeleton />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="h-16 flex-shrink-0 flex justify-between items-center px-4 border-b border-blue-100">
        {selectedConversation ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={selectedConversation?.otherUser.imagen_perfil_id ?? ""}
                alt={selectedConversation?.otherUser.nombre ?? ""}
              />
              <AvatarFallback>{`${selectedConversation?.otherUser.nombre?.[0]}${selectedConversation?.otherUser.apellido?.[0]}`}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">
              {selectedConversation?.otherUser.nombre}
            </span>
          </div>
        ) : (
          <span className="text-gray-500">
            No hay conversación seleccionada
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col h-[calc(100%-64px)]">
        {selectedConversation ? (
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.mensaje_id}
                  className={`flex ${
                    msg.remitente_id === loggedUser?.usuario_id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        msg.remitente_id === loggedUser?.usuario_id
                          ? "bg-blue-100 text-blue-900"
                          : "bg-blue-300"
                      }`}
                    >
                      {msg.mensaje}
                      <div
                        className={`text-xs mt-1 ${
                          msg.remitente_id === loggedUser?.usuario_id
                            ? "text-blue-700"
                            : "text-blue-800"
                        } text-right`}
                      >
                        {humanizeDate(msg.fecha_creacion)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Selecciona una conversación para comenzar a chatear
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 p-4 bg-blue-50 border-t border-blue-100">
        <Form {...form}>
          <form
            className="flex items-center gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Escribe un mensaje..."
                      className="bg-white border-0"
                      {...field}
                      disabled={!selectedConversation} // Deshabilitar si no hay conversación seleccionada
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="hover:bg-blue-200 hover:text-blue-700 transition-colors"
              disabled={!selectedConversation} // Deshabilitar si no hay conversación seleccionada
            >
              <SendIcon className="h-5 w-5" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default MainChat;


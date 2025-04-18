import {
  CheckIcon,
  PlusIcon,
  SearchIcon,
  MessageSquareIcon,
} from "lucide-react"; // Importar íconos
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { createConversation, GetUsers, getUsers } from "@/actions/chat";
import { AvatarImage } from "@radix-ui/react-avatar";

import { humanizeDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useChatContext } from "@/context/ChatContext";
import ChatSidebarSkeleton from "../skeletons/chat-sidebar-skeleton";

function ChatSidebar() {
  const {
    loggedUser,
    selectConversation,
    selectedConversation,
    conversations,
    setConversations,
    isSidebarLoading,
  } = useChatContext();
 

  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el dropdown
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState<GetUsers>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const handleSelectUser = async (userId: number) => {
    const newConversation = await createConversation(userId);
    setConversations((prev) => [...prev, newConversation]);
    selectConversation(newConversation.conversacion_id);
    setSearchQuery("");
    setIsOpen(false);

    // Refrescar la lista de usuarios
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  const handleSelectConversation = (conversationId: number) => {
    selectConversation(conversationId); // Llama al contexto para actualizar la conversación seleccionada
  };

  if (isSidebarLoading) {
    return (
      <ChatSidebarSkeleton />
    );
  }

  return (
    <div className="w-80 border-r border-blue-100 bg-white">
      <div className="h-16 flex items-center justify-between px-4 border-b border-blue-100">
        <h1 className="text-lg font-semibold">Conversaciones</h1>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md hover:bg-blue-200 hover:text-blue-700 transition-colors"
              aria-label="Nueva conversación"
            >
              <PlusIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px] p-0">
            <Command>
              <CommandInput
                placeholder="Buscar usuarios..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center py-4">
                    <SearchIcon className="h-6 w-6 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">
                      No se encontraron usuarios.
                    </p>
                  </div>
                </CommandEmpty>
                <CommandGroup heading="Usuarios">
                  {Array.from(
                    new Set(
                      users
                        .filter((user) => {
                          const query = searchQuery.toLowerCase();
                          return (
                            user.nombre?.toLowerCase().startsWith(query) ||
                            user.apellido?.toLowerCase().startsWith(query) ||
                            user.email?.toLowerCase().startsWith(query)
                          );
                        })
                        .sort((a, b) => {
                          const query = searchQuery.toLowerCase();
                          const aStartsWith =
                            a.nombre?.toLowerCase().startsWith(query) ||
                            a.apellido?.toLowerCase().startsWith(query) ||
                            a.email?.toLowerCase().startsWith(query);
                          const bStartsWith =
                            b.nombre?.toLowerCase().startsWith(query) ||
                            b.apellido?.toLowerCase().startsWith(query) ||
                            b.email?.toLowerCase().startsWith(query);
                          return aStartsWith === bStartsWith
                            ? 0
                            : aStartsWith
                            ? -1
                            : 1;
                        })
                    )
                  ).map((user) => (
                    <CommandItem
                      key={user.usuario_id}
                      onSelect={() => handleSelectUser(user.usuario_id)}
                      className="flex items-center gap-2 py-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.imagen_perfil_id ?? ""}
                          alt={user.nombre ?? ""}
                        />
                        <AvatarFallback className="text-xs">
                          {`${user.nombre?.[0]}${user.apellido?.[0]}`}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {user.nombre} {user.apellido}
                        </span>
                        <span className="text-xs text-gray-500">
                          {user.email}
                        </span>
                      </div>
                      <CheckIcon className="h-4 w-4 ml-auto opacity-0 group-data-[selected]:opacity-100" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {conversations.length > 0 && (
        <ScrollArea className="h-[calc(100%-64px)]">
          {conversations.map((conv) => {
            let user;
            if (conv.usuario_receptor_id === loggedUser?.usuario_id) {
              user = conv.remitente;
            } else {
              user = conv.receptor;
            }
            return (
              <div
                key={conv.conversacion_id}
                className={`flex items-center gap-3 p-4 hover:bg-blue-100 cursor-pointer ${
                  selectedConversation?.conversacion_id === conv.conversacion_id
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => handleSelectConversation(conv.conversacion_id)}
              >
                <Avatar>
                  <AvatarImage
                    src={user.imagen_perfil_id ?? ""}
                    alt={user.nombre ?? ""}
                  />
                  <AvatarFallback className="text-xs">
                    {`${user.nombre?.[0]}${user.apellido?.[0]}`}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">
                      {user.nombre} {user.apellido}
                    </p>
                    <span className="text-xs text-gray-500">
                      {conv.mensajes?.[0]?.fecha_creacion
                        ? humanizeDate(conv.mensajes[0].fecha_creacion)
                        : "Sin mensajes"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate max-w-[200px]">
                    {conv.mensajes?.[0]?.mensaje || "No hay mensajes aún"}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      )}
      {conversations.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center pb-52">
          <MessageSquareIcon className="h-12 w-12 text-gray-300" />
          <p className="text-gray-500 mt-4">No tienes conversaciones.</p>
          <p className="text-sm text-gray-400">
            Comienza una nueva conversación seleccionando el botón <b>+</b>.
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatSidebar;


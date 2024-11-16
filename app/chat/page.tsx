

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BellIcon,
  Settings2Icon,
  PlusCircleIcon,
  SmileIcon,
  TypeIcon,
  MicIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  

  const conversations = [
    {
      id: 1,
      name: "Name",
      message: "Supporting line text lore...",
      time: "10 min",
    },
    {
      id: 2,
      name: "Name",
      message: "Supporting line text lore...",
      time: "10 min",
    },
    {
      id: 3,
      name: "Name",
      message: "Supporting line text lore...",
      time: "10 min",
    },
    {
      id: 4,
      name: "Name",
      message: "Supporting line text lore...",
      time: "10 min",
    },
    {
      id: 5,
      name: "Name",
      message: "Supporting line text lore...",
      time: "10 min",
    },
  ];

  const messages = [
    { id: 1, sender: "other", text: "that looks so good!" },
    {
      id: 2,
      sender: "me",
      preview: {
        title: "Homemade Dumplings",
        url: "everydumplingever.com",
        image: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      id: 3,
      sender: "me",
      text: "or we could make this?",
      quickReplies: ["Let's do it", "Great!"],
    },
  ];

  return (
    <div className="flex min-h-full">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-blue-100">
        <div className="h-16 flex items-center px-4 border-b border-blue-100">
          <h1 className="text-lg font-semibold">Conversations</h1>
        </div>
        <ScrollArea className="h-[calc(100%-64px)]">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer"
            >
              <Avatar>
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{conv.name}</p>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conv.message}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 flex justify-between items-center px-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <span className="font-semibold">Name</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings2Icon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[70%]">
                  {msg.text && (
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        msg.sender === "me"
                          ? "bg-blue-100 text-blue-900"
                          : "bg-blue-300"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
                  {msg.preview && (
                    <div className="bg-gray-100 rounded-2xl overflow-hidden">
                      <img
                        src={msg.preview.image}
                        alt=""
                        className="w-full h-48 object-cover bg-gray-200"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold">{msg.preview.title}</h3>
                        <p className="text-sm text-gray-500">
                          {msg.preview.url}
                        </p>
                      </div>
                    </div>
                  )}
                  {msg.quickReplies && (
                    <div className="flex gap-2 mt-2">
                      {msg.quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 hover:bg-blue-200 text-blue-900"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-blue-50">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <PlusCircleIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <SmileIcon className="h-5 w-5" />
            </Button>
            <Input
            //   value={message}
            //   onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white border-0"
            />
            <Button variant="ghost" size="icon">
              <TypeIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MicIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import ChatSidebar from "@/components/chat/chat-sidebar";
import MainChat from "@/components/chat/main-chat";
import { ChatProvider } from "@/context/ChatContext";
import { useEffect, useState } from "react";

export default function Page() {
  // State to track available height
  const [availableHeight, setAvailableHeight] = useState("100vh");

  // Calculate available height on mount and window resize
  useEffect(() => {
    const calculateHeight = () => {
      // Get navbar height
      const navbar = document.querySelector("header");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      // Set available height as viewport height minus navbar height
      setAvailableHeight(`calc(100vh - ${navbarHeight}px)`);
    };

    // Calculate on mount
    calculateHeight();

    // Recalculate on resize
    window.addEventListener("resize", calculateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <ChatProvider>
      <div className="flex overflow-hidden" style={{ height: availableHeight }}>
        <ChatSidebar />
        <MainChat />
      </div>
    </ChatProvider>
  );
}


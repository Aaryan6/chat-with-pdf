"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { UserButton } from "@clerk/nextjs";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

type ChatAppProps = {
  data: {
    id: number;
    user_id: string;
    pdf_url: string;
    pdf_name: string;
    document_id: string;
    created_at: string;
  };
};

export function ChatApp({ data }: ChatAppProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      document_id: data.document_id,
    },
  });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
  }, [messages]);

  return (
    <div key="1" className="flex-1 flex h-screen bg-background">
      <section className="flex flex-col w-full">
        <header className="flex justify-between items-center border-b dark:border-zinc-700 p-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Avatar className="relative overflow-visible w-10 h-10">
              <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-green-600" />
              <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>
                {data.pdf_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2>{data.pdf_name}</h2>
              <span className="text-xs text-green-600 block">Online</span>
            </div>
          </h2>
          <UserButton />
        </header>
        <main className="flex-1 overflow-auto p-4 space-y-2" ref={chatRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.role === "user" ? "flex justify-end" : ""}
            >
              <p
                className={`text-sm w-fit ${
                  message.role === "user"
                    ? "bg-secondary"
                    : "text-muted-foreground border border-secondary"
                } py-2.5 px-4 rounded-xl max-w-[90%] leading-normal`}
              >
                {message.content}
              </p>
            </div>
          ))}
        </main>
        <footer className="border-t dark:border-zinc-700">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 overflow-hidden px-2"
          >
            <Input
              className="flex-1 h-full py-6 focus-visible:ring-0 border-none focus-visible:border-none"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <Button>Send</Button>
          </form>
        </footer>
      </section>
    </div>
  );
}

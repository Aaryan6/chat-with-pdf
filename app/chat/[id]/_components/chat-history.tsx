"use client";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftFromLine, PencilIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function ChatHistory({ userChats }: { userChats: any }) {
  const router = useRouter();
  return (
    <aside className="w-80 border-r dark:border-zinc-700">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Button
            size={"sm"}
            variant="outline"
            className=""
            onClick={() => router.push("/")}
          >
            <ArrowLeftFromLine className="mr-1 w-4 h-4" />
            Back
          </Button>
          <ModeToggle />
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-wide">History</h2>
          <Button size="icon" variant="ghost">
            <PencilIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <Input
            className="pl-8"
            placeholder="Search messages..."
            type="search"
          />
          <Button
            className="absolute right-2.5 top-3"
            size="icon"
            variant="ghost"
          />
        </div>
        <div className="flex flex-col gap-2">
          {userChats.map((chat: any) => (
            <Link href={`/chat/${chat.id}`} key={chat.id}>
              <button className="w-full text-left bg-slate-900/50 text-slate-400 hover:text-white px-4 py-2 rounded-md">
                <span className="text-sm">{chat.pdf_name}</span>
              </button>
            </Link>
          ))}
          {userChats.length === 0 && (
            <h3 className="text-sm">No chats found</h3>
          )}
        </div>
      </div>
    </aside>
  );
}

"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useStore from "@/lib/hooks/store";
import ChatHistory from "./chat-history";

export default function MobileSidebar({ userChats }: { userChats: any[] }) {
  const sidebar = useStore((state) => state);
  return (
    <Sheet open={sidebar.open} onOpenChange={sidebar.onClose}>
      <SheetContent>
        <ChatHistory userChats={userChats} />
      </SheetContent>
    </Sheet>
  );
}

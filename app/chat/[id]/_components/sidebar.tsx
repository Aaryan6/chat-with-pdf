import { auth } from "@clerk/nextjs";
import ChatHistory from "./chat-history";
import { getChats } from "@/app/actions";
import MobileSidebar from "./mobile-sidebar";

export default async function Sidebar() {
  const { userId } = auth();
  const userChats = await getChats(userId!);
  return (
    <>
      <div className="hidden md:flex  h-full">
        <ChatHistory userChats={userChats} />
      </div>
      <div className="flex md:hidden">
        <MobileSidebar userChats={userChats!} />
      </div>
    </>
  );
}

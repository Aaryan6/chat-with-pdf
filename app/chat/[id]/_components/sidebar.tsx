import { auth } from "@clerk/nextjs";
import ChatHistory from "./chat-history";
import { getChats } from "@/actions/upload";

export default async function Sidebar() {
  const { userId } = auth();
  const userChats = await getChats(userId!);
  return <ChatHistory userChats={userChats} />;
}

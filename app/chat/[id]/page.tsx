import { ChatApp } from "@/components/component/chatapp";
import PDFViewer from "@/components/pdf-viewer";
import { getChatByChatId, getMessages } from "@/actions/upload";
import Sidebar from "./_components/sidebar";
import { redirect } from "next/navigation";

export default async function ChatPage({
  params: { id: chat_message_id },
}: {
  params: { id: number };
}) {
  const chatMessages = await getMessages(chat_message_id);
  const data = await getChatByChatId(chatMessages![0]?.chat_id);
  if (!chatMessages || !data) return redirect("/");
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <PDFViewer pdfURL={data[0]?.pdf_url} />
      <ChatApp chatMessages={chatMessages[0]} data={data[0]} />
    </div>
  );
}

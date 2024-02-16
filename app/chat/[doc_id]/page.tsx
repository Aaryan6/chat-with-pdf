import { ChatApp } from "@/components/component/chatapp";
import PDFViewer from "@/components/pdf-viewer";
import { auth } from "@clerk/nextjs";
import { getChatByDocId } from "@/actions/upload";
import Sidebar from "./_components/sidebar";

export default async function ChatPage({
  params: { doc_id },
}: {
  params: { doc_id: string };
}) {
  const { userId } = auth();
  const data = await getChatByDocId(doc_id, userId as string);
  if (!data) return null;
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <PDFViewer pdfURL={data[0]?.pdf_url} />
      <ChatApp data={data[0]} />
    </div>
  );
}

import { getAllUserChats } from "@/app/actions";
import { cn } from "@/lib/utils";
import { UserButton, auth } from "@clerk/nextjs";
import { Righteous } from "next/font/google";
import Link from "next/link";
const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default async function Navbar() {
  const { userId } = auth();
  const hasChats = await getAllUserChats(userId as string);
  return (
    <div className="text-white z-50 flex items-center justify-between w-full max-w-[87rem] mx-auto px-4 md:px-4 py-6">
      <div className="">
        <h1
          className={cn(
            "text-lg font-bold uppercase tracking-wide",
            righteous.className
          )}
        >
          VectorPDF
        </h1>
      </div>
      <div
        className={cn(
          "space-x-6 font-medium flex items-center",
          righteous.className
        )}
      >
        {hasChats && (
          <Link href={"/chat"} className="underline">
            Chats
          </Link>
        )}
        <a
          href="https://github.com/Aaryan6/chat-with-pdf"
          target="_blank"
          className="underline"
        >
          Github
        </a>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
}

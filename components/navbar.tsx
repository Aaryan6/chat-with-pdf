"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Righteous } from "next/font/google";
const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
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
        <a
          href="https://github.com/Aaryan6/ytsummarizer"
          target="_blank"
          className="underline"
        >
          Github
        </a>
        <UserButton />
      </div>
    </div>
  );
}
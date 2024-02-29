"use client";
import Uploader from "@/components/component/uploader";
import Sidebar from "./[id]/_components/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import useStore from "@/lib/hooks/store";

export default function Page() {
  const router = useRouter();
  const sidebar = useStore();
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="grid place-items-center w-full">
        <div className="">
          <Button
            size={"sm"}
            variant="outline"
            className=""
            onClick={() => {
              sidebar.onClose();
              router.back();
            }}
          >
            <ArrowLeftFromLine className="mr-1 w-4 h-4" />
            Back
          </Button>
          <p className="mb-4 text-center text-muted-foreground">
            Upload a pdf file
          </p>
          <Uploader />
        </div>
      </div>
    </div>
  );
}

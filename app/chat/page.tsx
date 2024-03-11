import Uploader from "@/components/component/uploader";
import Sidebar from "./[id]/_components/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="grid place-items-center w-full">
        <div className="w-full space-y-8 px-2">
          <Link href={"/"} className="">
            <Button size={"sm"} variant="outline" className="md:hidden flex">
              <ArrowLeftFromLine className="mr-1 w-4 h-4" />
              Back
            </Button>
          </Link>
          <p className="mb-4 text-center text-muted-foreground">
            Upload a pdf file
          </p>
          <Uploader />
        </div>
      </div>
    </div>
  );
}

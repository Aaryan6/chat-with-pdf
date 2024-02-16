"use client";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftFromLine, PencilIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/theme-toggle";

export default function Sidebar() {
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
        <div className="space-y-2">
          <Card>
            <CardContent className="py-3">
              <h3 className="text-sm">Contact Name</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Uploader() {
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (!pdf) {
        toast({ title: "No pdf found!" });
        return;
      }
      const date = Date.now().toString();
      const document_id = pdf.name.replace(".pdf", "-") + date;
      formData.append(document_id, pdf);
      formData.append("document_id", document_id);
      formData.append("file_name", pdf.name);

      const response = await fetch("/api/embeddings", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (response.success) {
        toast({ title: response.message });
        router.push(`/chat/${response?.data[0]?.document_id}`);
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex space-x-2" onSubmit={onSubmit}>
      <Input
        className="max-w-lg flex-1"
        type="file"
        onChange={(e: any) => {
          const file = e.currentTarget.files?.item(0) as File;
          const fileSizeLimit = 10 * 1024 * 1024; // 10MB

          if (file && file.size <= fileSizeLimit) {
            setPdf(file);
          } else {
            console.log("File size exceeds the limit");
          }
        }}
      />
      <Button
        className="border border-white text-white bg-black hover:bg-white hover:text-black"
        type="submit"
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}

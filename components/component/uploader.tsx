"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Loader, UploadCloud } from "lucide-react";

export default function Uploader() {
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles: any) => {
    setPdf(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async () => {
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

      if (response.success && response.data) {
        router.push(`/chat/${response.data![0]?.id}`);
      } else {
        toast({ title: "Something went wrong!" });
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pdf) {
      onSubmit();
    }
  }, [pdf]);

  return (
    <div className="flex space-x-2 justify-center">
      <div
        {...getRootProps()}
        className="h-56 w-auto mt-4 aspect-[3/1.5] mx-auto bg-sky-200/10 text-slate-400 rounded-xl border-2 border-slate-300 grid place-items-center px-6"
      >
        <input {...getInputProps()} />
        {pdf ? (
          <div className="space-y-3">
            <p>{pdf.name}</p>
            <Button
              type="button"
              className="border border-black text-black bg-white"
            >
              <Loader className="animate-spin" />
            </Button>
          </div>
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex justify-center flex-col">
            <UploadCloud className="mx-auto" />
            <p className="text-xs mt-2">
              File should be lower or equal to 10 MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Loader, UploadCloud } from "lucide-react";
import { KeyDialog } from "../key-dialog";

export default function Uploader() {
  const router = useRouter();
  const { toast } = useToast();
  const [pdf, setPdf] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);
  const [openai_key, setOpenai_key] = useState<string | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles[0].size > 10 * 1024 * 1024) {
        toast({ title: "File size should be lower or equal to 10 MB" });
        return;
      } else {
        if (openai_key) {
          onSubmit(acceptedFiles[0]);
          setPdf(acceptedFiles[0]);
        }
      }
    },
    [openai_key]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (pdf_file: File) => {
    setLoader(true);
    try {
      const formData = new FormData();
      if (!pdf_file) {
        toast({ title: "No pdf found!" });
        return;
      }
      const date = Date.now().toString();
      const document_id = pdf_file.name.replace(".pdf", "-") + date;
      formData.append(document_id, pdf_file);
      formData.append("document_id", document_id);
      formData.append("file_name", pdf_file.name);
      formData.append("key", openai_key as string);

      const response = await fetch("/api/embeddings", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (response.success && response.data) {
        router.push(`/chat/${response.data![0]?.id}`);
      } else {
        setPdf(null);
        toast({
          title: "Something went wrong!",
          description: response.message ?? "Try again",
        });
      }
    } catch (error) {
      setPdf(null);
      toast({ title: "Something went wrong!" });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const key = sessionStorage.getItem("vector_key");
    if (key) {
      setOpenai_key(key);
    }
  }, []);

  return (
    <div className="flex space-x-2 justify-center">
      {!openai_key ? (
        <KeyDialog setOpenai_key={setOpenai_key} />
      ) : (
        <div
          {...getRootProps()}
          className="h-56 w-full max-w-lg mt-4 mx-auto bg-sky-200/10 text-slate-400 rounded-xl border-2 border-slate-300 grid place-items-center px-6"
        >
          <input {...getInputProps()} />
          {pdf ? (
            <div className="space-y-3">
              <p>{pdf.name}</p>
              {loader && (
                <Button
                  type="button"
                  className="border border-black text-black bg-white"
                >
                  <Loader className="animate-spin" />
                </Button>
              )}
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
      )}
    </div>
  );
}

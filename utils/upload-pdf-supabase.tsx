"use client";

import { useState } from "react";

export default function UploadPdfSupabase() {
  const [pdf, setPdf] = useState<File | null>(null);

  const uploadPdf = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData();
      if (!pdf) {
        return;
      }
      const date = Date.now().toString();
      const file_name = pdf.name.replace(".pdf", "-") + date;
      formData.append(file_name, pdf);
      formData.append("file_name", file_name);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      Uplaod PDF
      <form onSubmit={uploadPdf}>
        <input
          type="file"
          onChange={(e: any) => {
            setPdf(e.target.files[0]);
          }}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

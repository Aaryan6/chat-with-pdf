"use client";

export default function PDFViewer({ pdfURL }: { pdfURL: string }) {
  return (
    <div className="flex-1 hidden lg:flex">
      <iframe src={pdfURL ?? ""} className="w-full h-full"></iframe>
    </div>
  );
}

import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

export async function loadPdf(pdf_url: Blob, document_id: string) {
  const loader = new WebPDFLoader(pdf_url);
  const docs = await loader.loadAndSplit();

  const formattedDoc = docs.map((doc) => {
    return {
      pageContent: doc.pageContent.replace(/\n/g, ""),
      metadata: {
        source: doc.metadata.source,
        pdf: doc.metadata.pdf,
        loc: doc.metadata.loc,
        document_id: document_id,
      },
    };
  });
  return formattedDoc;
}

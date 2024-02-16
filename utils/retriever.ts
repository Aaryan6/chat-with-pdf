"use server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

const embeddings = new OpenAIEmbeddings();
const sbUrl = process.env.SUPABASE_URL!;
const sbApiKey = process.env.SUPABASE_KEY!;
const client = createClient(sbUrl, sbApiKey);

export async function retrieveDoc(document_id: string) {
  const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents",
    filter: (rpc) =>
      rpc.filter("metadata->>document_id", "eq", document_id ?? ""),
  });

  const retriver = vectorStore.asRetriever();
  return retriver;
}

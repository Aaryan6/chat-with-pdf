"use server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { supabase } from "./use-supabase";

export async function retrieveDoc(document_id: string, vector_key: string) {
  const vectorStore = new SupabaseVectorStore(
    new OpenAIEmbeddings({ openAIApiKey: vector_key }),
    {
      client: supabase,
      tableName: "documents",
      queryName: "match_documents",
      filter: (rpc) =>
        rpc.filter("metadata->>document_id", "eq", document_id ?? ""),
    }
  );

  const retriver = vectorStore.asRetriever();
  return retriver;
}

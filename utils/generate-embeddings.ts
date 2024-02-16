import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config();

const client = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function generateEmbeddings(docs: any[]) {
  await SupabaseVectorStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });
  return { success: true };
}

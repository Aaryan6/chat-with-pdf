import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import * as dotenv from "dotenv";
import { supabase } from "./use-supabase";
dotenv.config();

export async function generateEmbeddings(docs: any[], openai_key: string) {
  try {
    const res = await SupabaseVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: openai_key }),
      {
        client: supabase,
        tableName: "documents",
        queryName: "match_documents",
      }
    );
    return { success: true, res };
  } catch (error) {
    console.log("from embedddings", error);
    return { success: false, error };
  }
}

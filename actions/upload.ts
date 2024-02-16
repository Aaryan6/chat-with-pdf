import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function uploadFile(pdf: File, file_name: string) {
  try {
    const { data, error } = await supabase.storage
      .from("files")
      .upload(file_name, pdf);
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getFileUrl(path: string) {
  try {
    const publicUrl = supabase.storage.from("files").getPublicUrl(path);
    return publicUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function createChat(
  userId: string,
  pdf_url: string,
  pdf_name: string,
  document_id: string
) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-chats")
      .insert([
        {
          user_id: userId,
          pdf_url: pdf_url,
          pdf_name: pdf_name,
          document_id: document_id,
        },
      ])
      .select();
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getChatByDocId(document_id: string, user_id: string) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-chats")
      .select("*")
      .eq("user_id", user_id)
      .eq("document_id", document_id);
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

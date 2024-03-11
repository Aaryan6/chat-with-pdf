import { supabase } from "@/utils/use-supabase";

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

export async function getChatByChatId(chat_id: number) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-chats")
      .select("*")
      .eq("id", chat_id);
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createMessage(chat_id: number, user_id: string) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-messages")
      .insert({
        chat_id,
        user_id,
        messages: [],
      })
      .select();
    if (error) console.log("create message", error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMessages(chat_id: string, messages: any[]) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-messages")
      .update({
        messages,
        updated_at: new Date().toISOString(),
      })
      .eq("chat_id", chat_id)
      .select();
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMessages(id: number) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-messages")
      .select("*")
      .eq("id", id);
    if (error) console.log("get", error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getChats(userId: string) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-chats")
      .select("*")
      .eq("user_id", userId);
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function storeEmail(email: string) {
  try {
    const { data, error } = await supabase.from("chatpdf-premium").insert([
      {
        email,
      },
    ]);
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function checkAccess(userId: string) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-chats")
      .select("*")
      .eq("user_id", userId);

    if (error) console.log(error);
    const isAccess = data!.length > 0 ? false : true;
    return isAccess;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUserChats(userId: string) {
  try {
    const { data, error } = await supabase
      .from("chatpdf-chats")
      .select("*")
      .eq("user_id", userId);

    if (error) console.log(error);
    const hasChats = data!.length > 0 ? true : false;
    return hasChats;
  } catch (error) {
    console.log(error);
  }
}

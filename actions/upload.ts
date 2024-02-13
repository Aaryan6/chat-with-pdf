import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function uploadFile(pdf: File) {
  try {
    const { data, error } = await supabase.storage
      .from("files")
      .upload("pdfs", pdf);
    if (error) console.log(error);
    else console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

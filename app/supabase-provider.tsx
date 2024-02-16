import { createClient } from "@supabase/supabase-js";

const sbUrl = process.env.SUPABASE_URL!;
const sbApiKey = process.env.SUPABASE_KEY!;
const supabase = createClient(sbUrl, sbApiKey);

export default supabase;

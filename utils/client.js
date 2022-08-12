import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   `${process.env.SUPABASE_URL}`,
//   `${process.env.SUPABASE_ANON_PUBLIC_KEY}`
// );
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export { supabase };

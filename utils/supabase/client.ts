import { Database } from '@/app/types/supabase'
import { createBrowserClient } from '@supabase/ssr'

function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const supabase = createClient();

export default supabase;
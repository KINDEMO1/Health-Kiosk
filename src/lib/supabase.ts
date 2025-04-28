import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Helper function to get the current session
export const getCurrentUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user
}

// Helper function to get user ID (useful for database operations)
export const getUserId = async () => {
  const user = await getCurrentUser()
  return user?.id
}

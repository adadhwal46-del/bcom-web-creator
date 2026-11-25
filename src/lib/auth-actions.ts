import type { OAuthProvider } from "@lovable.dev/cloud-auth-js";

import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export function createEmailAccount(email: string, password: string, redirectUri: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: redirectUri },
  });
}

export function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export function signInWithProvider(provider: OAuthProvider, redirectUri: string) {
  return lovable.auth.signInWithOAuth(provider, { redirect_uri: redirectUri });
}
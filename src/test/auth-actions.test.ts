import { beforeEach, describe, expect, it, vi } from "vitest";

const authMocks = vi.hoisted(() => ({
  signUp: vi.fn(),
  signInWithPassword: vi.fn(),
  signInWithOAuth: vi.fn(),
  from: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      signUp: authMocks.signUp,
      signInWithPassword: authMocks.signInWithPassword,
    },
    from: authMocks.from,
  },
}));

vi.mock("@/integrations/lovable/index", () => ({
  lovable: { auth: { signInWithOAuth: authMocks.signInWithOAuth } },
}));

import { createEmailAccount, signInWithEmail, signInWithProvider } from "@/lib/auth-actions";

describe("account sign-in actions", () => {
  beforeEach(() => vi.clearAllMocks());

  it("creates accounts with email confirmation and does not store profile details", async () => {
    authMocks.signUp.mockResolvedValue({ data: { user: null, session: null }, error: null });

    await createEmailAccount("aarush@example.com", "example-password", "https://portfolio.example");

    expect(authMocks.signUp).toHaveBeenCalledWith({
      email: "aarush@example.com",
      password: "example-password",
      options: { emailRedirectTo: "https://portfolio.example" },
    });
    expect(authMocks.from).not.toHaveBeenCalled();
  });

  it("signs in with an email and password", async () => {
    authMocks.signInWithPassword.mockResolvedValue({ data: { user: null, session: null }, error: null });

    await signInWithEmail("aarush@example.com", "example-password");

    expect(authMocks.signInWithPassword).toHaveBeenCalledWith({ email: "aarush@example.com", password: "example-password" });
  });

  it("uses the managed Google sign-in helper with a public same-origin return address", async () => {
    authMocks.signInWithOAuth.mockResolvedValue({ redirected: true, error: null });

    await signInWithProvider("google", "https://portfolio.example");

    expect(authMocks.signInWithOAuth).toHaveBeenCalledWith("google", { redirect_uri: "https://portfolio.example" });
  });
});
import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, LoaderCircle } from "lucide-react";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import type { OAuthProvider } from "@lovable.dev/cloud-auth-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEmailAccount, signInWithEmail, signInWithProvider } from "@/lib/auth-actions";

type AuthMode = "sign-in" | "sign-up";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or create an account — Aarush Dadhwal | BCom Student" },
      { name: "description", content: "Sign in or create an account for Aarush Dadhwal’s student portfolio." },
      { property: "og:title", content: "Sign in or create an account — Aarush Dadhwal | BCom Student" },
      { property: "og:description", content: "Sign in or create an account for Aarush Dadhwal’s student portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setPassword("");
    setError(null);
    setNotice(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      if (mode === "sign-up") {
        const { data, error: signUpError } = await createEmailAccount(
          email.trim(),
          password,
          window.location.origin,
        );
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        if (!data.session) {
          setPassword("");
          setNotice("Check your email for a confirmation link. You can sign in after confirming your account.");
          return;
        }
      } else {
        const { error: signInError } = await signInWithEmail(email.trim(), password);
        if (signInError) {
          setError(signInError.message);
          return;
        }
      }

      await navigate({ to: "/" });
    } catch {
      setError("We couldn’t complete that request. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function continueWith(provider: OAuthProvider) {
    if (busy) return;

    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      const result = await signInWithProvider(provider, window.location.origin);
      if (result.error) {
        setError(result.error.message);
        return;
      }
      if (result.redirected) return;
      await navigate({ to: "/" });
    } catch {
      setError("We couldn’t connect your account. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Your account</p>
            <h1 id="auth-title" className="mt-3 text-3xl font-bold leading-tight">
              {mode === "sign-up" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="body-copy mt-3">
              {mode === "sign-up" ? "Set up an account to continue." : "Sign in to your account."}
            </p>
          </div>
          <Button asChild variant="ghost" size="icon" aria-label="Return to portfolio">
            <Link to="/"><ArrowUpRight /></Link>
          </Button>
        </div>

        <div className="auth-mode-switch" role="group" aria-label="Choose an account action">
          <Button type="button" variant={mode === "sign-in" ? "default" : "ghost"} aria-pressed={mode === "sign-in"} onClick={() => changeMode("sign-in")}>
            Sign in
          </Button>
          <Button type="button" variant={mode === "sign-up" ? "default" : "ghost"} aria-pressed={mode === "sign-up"} onClick={() => changeMode("sign-up")}>
            Create account
          </Button>
        </div>

        <div className="mt-6 grid gap-3">
          <Button type="button" variant="outline" className="auth-provider-button" disabled={busy} onClick={() => void continueWith("google")}>
            <GoogleMark />
            Continue with Google
          </Button>
          <Button type="button" variant="outline" className="auth-provider-button" disabled={busy} onClick={() => void continueWith("lovable")}>
            <LovableMark className="size-[18px]" />
            Continue with Lovable
          </Button>
        </div>

        <div className="auth-separator my-6" aria-hidden="true"><span>or use email</span></div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="account-email" className="mb-2 block text-sm font-semibold">Email address</label>
            <Input
              id="account-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={busy}
              className="h-11"
            />
          </div>
          <div>
            <label htmlFor="account-password" className="mb-2 block text-sm font-semibold">Password</label>
            <Input
              id="account-password"
              name="password"
              type="password"
              autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
              minLength={mode === "sign-up" ? 6 : undefined}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={busy}
              className="h-11"
            />
          </div>

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {notice && <p role="status" className="border-l-2 border-primary pl-3 text-sm leading-6 text-foreground">{notice}</p>}

          <Button type="submit" className="w-full" size="lg" disabled={busy}>
            {busy ? <LoaderCircle className="animate-spin" /> : <>{mode === "sign-up" ? "Create account" : "Sign in"}<ArrowRight /></>}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
          Signing up with email requires confirming your email address before your first sign-in.
        </p>
      </section>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}
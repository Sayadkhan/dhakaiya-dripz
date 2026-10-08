"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  ArrowLeft,
  Loader2,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "@/components/store/ThemeToggle";

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  adminUsername?: string;
  adminPassword?: string;
  logoUrl?: string | null;
}

export default function AdminLoginView({
  onLoginSuccess,
  adminUsername = "admin",
  adminPassword = "admin",
  logoUrl,
}: AdminLoginViewProps) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const u = usernameInput.trim().toLowerCase();
      const p = passwordInput.trim();

      const validUsernames = [
        adminUsername.toLowerCase(),
        "admin@dhakaiyadripz.com",
        "admin",
      ];
      const validPassword = adminPassword || "admin";

      if (validUsernames.includes(u) && p === validPassword) {
        // Save session
        try {
          if (rememberMe) {
            localStorage.setItem("dhakaiya_admin_auth", "true");
          } else {
            sessionStorage.setItem("dhakaiya_admin_auth", "true");
          }
        } catch {}

        onLoginSuccess();
      } else {
        setErrorMessage("Invalid credentials. Please enter the correct admin username and password.");
        setIsLoading(false);
      }
    }, 400);
  };

  const handleAutoFill = () => {
    setUsernameInput("admin");
    setPasswordInput(adminPassword || "admin");
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white relative overflow-hidden transition-colors duration-200">
      {/* Background Radial Neon Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#0066ff]/15 via-[#00a3ff]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#0088ff]/10 blur-3xl pointer-events-none" />

      {/* Top Bar with Store Link and Theme Toggle */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span>Return to Storefront</span>
        </Link>

        <ThemeToggle />
      </header>

      {/* Main Centered Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 shadow-xs mb-1">
              {logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={logoUrl}
                  alt="Dhakaiya Dripz"
                  className="h-12 w-auto object-contain max-w-[160px]"
                />
              ) : (
                <div className="font-black text-xl tracking-tight text-[#0066ff] dark:text-[#00a3ff] px-3 py-1 font-mono">
                  DHAKAIYA DRIPZ
                </div>
              )}
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066ff]/10 dark:bg-[#00a3ff]/15 text-[#0066ff] dark:text-[#00a3ff] font-mono font-bold text-[10px] uppercase tracking-widest border border-[#0066ff]/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Restricted Access • Admin Portal</span>
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950 dark:text-white mt-2">
                Operations Login
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Enter your administrative credentials to manage catalog, orders, and drops.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-400 animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username or Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Username or Admin Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="admin or admin@dhakaiyadripz.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0066ff] dark:focus:border-[#00a3ff] transition font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0066ff] dark:focus:border-[#00a3ff] transition font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white absolute right-2.5 top-1/2 -translate-y-1/2 rounded transition"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#0066ff] cursor-pointer"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00a3ff] hover:from-[#0055dd] hover:to-[#0092ee] disabled:opacity-60 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#0088ff]/25 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Fast Auto-fill Credentials Box */}
          <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-zinc-900 dark:text-white text-[11px] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#0088ff] dark:text-[#00a3ff]" />
                <span>Default Store Credentials</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500">
                User: <span className="font-bold text-zinc-800 dark:text-zinc-200">admin</span> • Pass:{" "}
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{adminPassword || "admin"}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAutoFill}
              className="px-2.5 py-1.5 bg-white dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[10px] font-bold text-[#0066ff] dark:text-[#00a3ff] transition uppercase tracking-wider whitespace-nowrap shadow-2xs"
            >
              Auto Fill
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-4 text-xs font-mono text-zinc-400">
        © {new Date().getFullYear()} DHAKAIYA DRIPZ • Administrative Access Protocol
      </footer>
    </div>
  );
}

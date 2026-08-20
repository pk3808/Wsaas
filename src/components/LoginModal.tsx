"use client";

import { useState } from "react";
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoggedInUser("Alex Rivers (Google)");
    }, 1200);
  };

  const handleSignOut = () => {
    setLoggedInUser(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative text-white overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm p-2 rounded-full hover:bg-white/10"
          >
            ✕
          </button>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">Welcome to WishCraft</h2>
              <p className="text-xs text-slate-400 mt-1">
                Sign in to save your wish links, track visitor wishes & unlock premium templates.
              </p>
            </div>

            {loggedInUser ? (
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-indigo-500/40 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white font-bold flex items-center justify-center text-xl mx-auto shadow-lg">
                  AR
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{loggedInUser}</h3>
                  <p className="text-xs text-emerald-400 flex items-center justify-center gap-1 mt-1">
                    <Check className="w-3.5 h-3.5" /> Authenticated with Google
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="text-xs text-slate-400 hover:text-rose-400"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {/* Official Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoggingIn ? (
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-900 px-3">
                    Instant 1-Click Access
                  </div>
                </div>

                <div className="space-y-2 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>No passwords required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span>Manage all your active wishing links</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

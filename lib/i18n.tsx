"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DICT, type Dict, type Lang } from "./dict";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LangContext = createContext<Ctx | null>(null);
const KEY = "caribe-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "en" || saved === "es") setLangState(saved);
      else if (navigator.language?.toLowerCase().startsWith("es")) setLangState("es");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang, t: DICT[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

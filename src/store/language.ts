import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "@/lib/translations";

interface LanguageStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: "id",
      setLang: (lang) => set({ lang }),
    }),
    { name: "ghania-lang" }
  )
);

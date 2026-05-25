"use client";

import { useLanguageStore } from "@/store/language";
import type { Lang } from "@/lib/translations";

export function useT() {
  const lang = useLanguageStore((s) => s.lang);

  function t(obj: { id: string; en: string }): string {
    return obj[lang];
  }

  function tArr(obj: { id: readonly string[]; en: readonly string[] }): readonly string[] {
    return obj[lang];
  }

  return { t, tArr, lang };
}

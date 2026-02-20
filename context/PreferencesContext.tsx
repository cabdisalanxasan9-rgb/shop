"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemePreference = "light" | "dark";

export type LanguagePreference = "en" | "so" | "ar";

type PreferencesState = {
  theme: ThemePreference;
  language: LanguagePreference;
  pushNotifications: boolean;
  emailNotifications: boolean;
};

type PreferencesContextValue = PreferencesState & {
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
  setLanguage: (language: LanguagePreference) => void;
  setPushNotifications: (enabled: boolean) => void;
  setEmailNotifications: (enabled: boolean) => void;
};

const STORAGE_KEY = "veggiefresh:preferences:v1";

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function safeParsePreferences(raw: string | null): Partial<PreferencesState> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as Partial<PreferencesState>;
  } catch {
    return null;
  }
}

function getSystemTheme(): ThemePreference {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemePreference>("light");
  const [language, setLanguage] = useState<LanguagePreference>("en");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from storage on first mount (client only)
  useEffect(() => {
    const saved = safeParsePreferences(window.localStorage.getItem(STORAGE_KEY));
    if (saved?.theme === "light" || saved?.theme === "dark") {
      setTheme(saved.theme);
    } else {
      setTheme(getSystemTheme());
    }

    if (saved?.language === "en" || saved?.language === "so" || saved?.language === "ar") {
      setLanguage(saved.language);
    }

    if (typeof saved?.pushNotifications === "boolean") {
      setPushNotifications(saved.pushNotifications);
    }
    if (typeof saved?.emailNotifications === "boolean") {
      setEmailNotifications(saved.emailNotifications);
    }

    setHydrated(true);
  }, []);

  // Persist & apply to DOM
  useEffect(() => {
    if (!hydrated) return;

    const prefs: PreferencesState = { theme, language, pushNotifications, emailNotifications };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));

    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.lang = language;
  }, [theme, language, pushNotifications, emailNotifications, hydrated]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      theme,
      language,
      pushNotifications,
      emailNotifications,
      setTheme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      setLanguage,
      setPushNotifications,
      setEmailNotifications,
    }),
    [theme, language, pushNotifications, emailNotifications]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}

export function languageLabel(lang: LanguagePreference) {
  switch (lang) {
    case "en":
      return "English";
    case "so":
      return "Somali";
    case "ar":
      return "Arabic";
    default:
      return "English";
  }
}


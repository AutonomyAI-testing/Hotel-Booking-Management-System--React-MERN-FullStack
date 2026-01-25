import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
  storageKey = "hotel-booking-theme",
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      // Check localStorage first (only in browser)
      if (typeof window !== "undefined" && window.localStorage) {
        const storedTheme = localStorage.getItem(storageKey) as Theme | null;
        if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
          return storedTheme;
        }
      }
      
      // Check system preference
      if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch (error) {
      console.error("Error accessing localStorage or system preferences:", error);
    }
    
    return defaultTheme;
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      
      // Remove both classes first
      root.classList.remove("light", "dark");
      
      // Add the current theme class
      root.classList.add(theme);
      
      // Save to localStorage (only in browser)
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(storageKey, theme);
      }
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

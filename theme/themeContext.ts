import { createContext, useContext, useState } from "react";

//for Light Theme

export type Theme = {
  background: string;
  text: string;
};

export const lightTheme: Theme = {
  background: "#F2EAC5",
  text: "#6F5643",
};

//for Dark Theme
export const darkTheme: Theme = {
  background: "#14161B",
  text: "#fff",
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be within a ThemeProvider");
  }
  return context;
};

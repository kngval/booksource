import { useState } from "react";
import { ThemeContext, lightTheme, darkTheme, Theme } from "./themeContext";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  }

  return (
    <ThemeContext.Provider value={{ theme,toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}



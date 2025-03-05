import { createContext, useState } from "react"

//for Light Theme

export type Theme = {
  background:string;
  text:string;
}


export const lightTheme:Theme = {
  background: '#F2EAC5',
  text:'#6F5643'
}

//for Dark Theme
export const darkTheme:Theme = {
  background:'#14161B',
  text:'#fff'
}

interface ThemeContextType {
  theme : Theme,
  toggleTheme : () => void
}

export const ThemeContext = createContext<ThemeContextType|undefined>(undefined);




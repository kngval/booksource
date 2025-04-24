import { useTheme } from "@/theme/themeContext";
import { StatusBar } from "react-native";
import { ThemeProvider } from "@/theme/ThemeProvider";
import * as NavigationBar from "expo-navigation-bar"
import { useEffect } from "react";
import { LibraryProvider } from "@/books/BookContext";
import { Stack } from "expo-router";

//TSX
export default function Layout() {
  return (
    <ThemeProvider>
      <LibraryProvider>
        <RootLayout />
      </LibraryProvider>
    </ThemeProvider>
  )
}


function RootLayout() {
  const { theme } = useTheme();
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.background);
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, [theme.background])
  return (
    <>
      <StatusBar backgroundColor={theme.background} />
      <Stack screenOptions={
        {
          contentStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          
        }
      }>

        <
          Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            animation:"slide_from_left",
            animationDuration:500
          }} 
        />
        <Stack.Screen 
          name="books/[id]" 
          options={{ 
            headerShown: true,
            headerTitle:"",
            headerShadowVisible: false,
            headerStyle : {
            backgroundColor: theme.background
            },
            
          }}
        />
      </Stack>
    </>
  )
}


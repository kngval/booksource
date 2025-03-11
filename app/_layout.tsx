import { useTheme } from "@/theme/themeContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { ThemeProvider } from "@/theme/ThemeProvider";
import * as NavigationBar from "expo-navigation-bar"
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <ThemeProvider>
      <SafeAreaView style={{flex:1}}>
        <RootLayout />
      </SafeAreaView>

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
          headerTintColor: theme.text
        }
      }>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}


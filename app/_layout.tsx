import { useTheme } from "@/theme/themeContext";
import { StatusBar, View } from "react-native";
import { ThemeProvider } from "@/theme/ThemeProvider";
import * as NavigationBar from "expo-navigation-bar"
import { useEffect, useState } from "react";
import { LibraryProvider } from "@/books/BookContext";
import { Stack } from "expo-router";
import FilterSvg from "@/assets/filterSvg";

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
const [menuVisibility, setMenuVisibility] = useState(false);
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
          name="index"
          options={{
            headerShown: true,
            title: "All Books",
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: 700,
              fontSize: 20,
              color: theme.text,
            },
            animation: "slide_from_left",
            animationDuration: 500,

            headerRight: () => (
              <View style={{
                flexDirection: "row",
                gap: 25,
              }}>
                <FilterSvg width={20} height={20} color={theme.text} />
              </View>
            )
          }}

        />
        <Stack.Screen
          name="books/[id]"
          options={{
            headerShown: true,
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: theme.background
            },

          }}
        />
      </Stack>
    </>
  )
}


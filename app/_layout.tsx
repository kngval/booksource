import { useTheme } from "@/theme/themeContext";
import { StatusBar, View } from "react-native";
import { ThemeProvider } from "@/theme/ThemeProvider";
import * as NavigationBar from "expo-navigation-bar"
import { useEffect } from "react";
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
    hideNavBar();
  }, [theme.background])

  const hideNavBar = async () => {
    await NavigationBar.setBackgroundColorAsync(theme.background);
    await NavigationBar.setVisibilityAsync("hidden");
    await NavigationBar.setBehaviorAsync("overlay-swipe");
    console.log("hiding navs");
  }
  return (
    <>
      <StatusBar translucent backgroundColor={theme.background} />
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
              fontSize: 19,
              color: theme.text,
            },
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
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="books/reading/[id]"
          options={{
            headerShown: true,
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: theme.background
            },
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </>
  )
}


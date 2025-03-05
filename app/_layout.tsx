import { ThemeProvider } from "../theme/ThemeProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="home" />
      </Stack>
    </ThemeProvider>
  )
}

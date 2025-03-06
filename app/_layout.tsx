import { ThemeProvider } from "../theme/ThemeProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  )
}

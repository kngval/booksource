import { ThemeProvider } from "@/theme/ThemeProvider";
import Layout from "./Layout";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Layout />
    </ThemeProvider>
  )
}

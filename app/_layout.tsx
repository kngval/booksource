import { ThemeProvider } from "@/theme/ThemeProvider";
import App from "../App";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <App />
    </ThemeProvider>
  )
}

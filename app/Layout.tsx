import { useTheme } from "@/theme/themeContext";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Stack } from "expo-router";

export default function Layout(){

  const {theme} = useTheme();
  return (
      <Stack screenOptions={{
        contentStyle:{ backgroundColor:theme.background }
      }}>
        <Stack.Screen name="index"
          options={{
            title:"All Books",
            headerStyle:{
              backgroundColor:theme.background,
              
            },
            headerTitleStyle: {
              fontWeight:"bold",
              fontSize:25,
              color:theme.text
            },
            headerShadowVisible:false
          }}
        />
      </Stack>
  )
}

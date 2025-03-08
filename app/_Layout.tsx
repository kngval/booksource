import { useTheme } from "@/theme/themeContext";
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet, View } from "react-native";

export default function Layout() {

  const { theme } = useTheme();
  return (
    <Stack screenOptions={{
      contentStyle: { backgroundColor: theme.background }
    }}>
      <Stack.Screen name="index"
        options={{
          title: "All Books",
          headerRight: () => (
            <TouchableOpacity style={{padding:12,margin:15}}>
              <View>
                <View style></View>
              </View>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: theme.background,

          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: theme.text
          },
          headerShadowVisible: false
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
   
})


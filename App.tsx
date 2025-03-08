import { useTheme } from "@/theme/themeContext";
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet, View } from "react-native";
export default function App() {
  const { theme } = useTheme();

  return (
    <Stack screenOptions={{
      contentStyle: { backgroundColor: theme.background }
    }}>
      <Stack.Screen name="index"
        options={{
          title: "All Books",
          headerRight: () => (
            <TouchableOpacity style={styles.menuContainer}>
              <View style={{...styles.menu,backgroundColor:theme.text}}></View>
              <View style={{...styles.menu,backgroundColor:theme.text}}></View>
              <View style={{...styles.menu,backgroundColor:theme.text}}></View>
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
  menuContainer: {
    marginRight: 16, // Align to the right
    // flexDirection: "column",
  },
  menu: {
    width: 5,
    height: 5,
    borderRadius: 3, // Half of width/height for a perfect circle
    marginVertical:1.2 , // Adds spacing between dots
  },
});

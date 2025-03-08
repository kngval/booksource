import { useTheme } from "@/theme/themeContext";
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import  FilterSvg  from "./assets/filterSvg";
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
            <View style={styles.rightContainer}>
              <FilterSvg width={20} height={20} color={theme.text}/>
              <TouchableOpacity style={styles.menuContainer}>
                <View style={{ ...styles.menu, backgroundColor: theme.text }}></View>
                <View style={{ ...styles.menu, backgroundColor: theme.text }}></View>
                <View style={{ ...styles.menu, backgroundColor: theme.text }}></View>
              </TouchableOpacity>
            </View>
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
  rightContainer : {
    marginRight: 16, // Align to the right
    flexDirection: "row",
    gap:10

  },
  menuContainer: {
    // flexDirection: "column",
  },
  menu: {
    width: 5,
    height: 5,
    borderRadius: 3, // Half of width/height for a perfect circle
    marginVertical: 1.2, // Adds spacing between dots
  },
});

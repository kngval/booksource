import { useTheme } from "@/theme/themeContext";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { theme } = useTheme();
  return (
    <View style={{ ...styles.wrapper, backgroundColor: theme.background }}>
      <Text>HELLO HOME</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
})



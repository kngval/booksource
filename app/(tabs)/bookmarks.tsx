import { useTheme } from "@/theme/themeContext";
import { StyleSheet, Text, View } from "react-native";

export default function BookMarks() {
  const { theme } = useTheme();
  return (
    <View style={{...styles.wrapper, backgroundColor : theme.background }}>
      <Text>hello book marks</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper : {
    flex : 1
  }
})

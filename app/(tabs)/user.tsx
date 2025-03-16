import { useTheme } from "@/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-svg";


export default function UserScreen(){
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor : theme.background }}>
      <Text>HELLO USER</Text>
    </View>
  )
}


const styles = StyleSheet.create({
})

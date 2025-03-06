import { useTheme } from "../theme/themeContext";
import { Text, View } from "react-native";

export default function Index() {
  const { theme,toggleTheme } = useTheme();
  return (
    <View style={{backgroundColor : theme.background}}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

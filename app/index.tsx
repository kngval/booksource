import { Theme, useTheme } from "../theme/themeContext";
import { StyleSheet, Text, View } from "react-native";


export default function Index() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.screenWrapper}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    screenWrapper: {
      backgroundColor: theme.background,
      height:"100%"
    },
    text: {
      color: theme.text
    }
  })
}

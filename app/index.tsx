import { Theme, useTheme } from "../theme/themeContext";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{flex:1}} edges={["top", "bottom"]}>
      <View style={styles.screenWrapper}>
        <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    screenWrapper: {
      // backgroundColor: theme.background,
      flex:1
    },
    text: {
      color: theme.text,
      fontFamily: "Poppins_400Regular"
    }
  })
}

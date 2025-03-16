import { useTheme } from "@/theme/themeContext";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PaperProvider, Menu } from "react-native-paper";

export default function MenuButton() {
  const { theme } = useTheme();
  const [visible, setVisibility] = useState<boolean>(false);

  return (
    <PaperProvider>
      <View>
        <Menu
          visible={visible}
          onDismiss={() => setVisibility(false)}
          anchor={
            <TouchableOpacity onPress={() => setVisibility(true)} style={styles.anchorButton}>
              <View style={styles.dotsContainer}>
                <View style={{ ...styles.menuStyle, backgroundColor: theme.text }} />
                <View style={{ ...styles.menuStyle, backgroundColor: theme.text }} />
                <View style={{ ...styles.menuStyle, backgroundColor: theme.text }} />
              </View>
            </TouchableOpacity>
          }
          contentStyle={styles.menuContainer} // Fix: Restrict menu size
        >
          <Menu.Item onPress={() => console.log("Import Books")} title="Import Books" />
        </Menu>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  anchorButton: {
    padding: 10, // Ensure the touch area is big enough
    alignItems: "center",
    justifyContent: "center",
  },
  dotsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  menuStyle: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginVertical: 1.2,
  },
  menuContainer: {
    width: 150, // 🚀 **Fix: Set a proper width for the menu**
    paddingVertical: 5, // 🚀 **Fix: Reduce unnecessary spacing**
  },
});

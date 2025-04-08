import { useTheme } from "@/theme/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
  const { theme } = useTheme();

  useEffect(() => {
    const loadBooks = async () => {
      const jsonValue = await AsyncStorage.getItem('library');
      console.log('📚 Your library:', jsonValue != null ? JSON.parse(jsonValue) : []);
    }
    loadBooks();
  }, []);

  return (
    <View style={{ ...styles.wrapper, backgroundColor: theme.background }}>
      <Text>HELLO HOME</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

import { useFile } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Epub from "epubjs";
export default function HomeScreen() {
  const { theme } = useTheme();
  const { selectedFile } = useFile();

  useEffect(() => {
    const loadEpub = async () => {
      if (!selectedFile) {
        console.log("file error");
        return;
      }

      try {
        const book = Epub(selectedFile);  
        await book.ready;
        console.log("Book : ", book);
      } catch (error) {
        console.error("Error loading epub : ", error);
      }
    };
    loadEpub();
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

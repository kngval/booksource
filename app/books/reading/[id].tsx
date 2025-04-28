import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { getBookData } from "@/utils/getBookData";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function ReadingScreen() {
  const [loadingBook, setLoadingBook] = useState<boolean>(false);
  const { library } = useLibrary();
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadBook();
  }, [])
  const loadBook = async () => {
    try {
      setLoadingBook(true);
      const book = library.find(b => b.id == id);
      console.log("Passed Book : ", book?.title)
      if (book) {
        if (book.path) {
          const newBook = await getBookData(book.path)
          const metadata = await newBook.loaded.metadata;
          console.log("New Book Title : ", metadata.title);
        }

      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBook(false);
    }

  }
  if (loadingBook) {
    return (
      <View style={{
        flexDirection: "row",
        width: "100%",
        height: "90%",
        justifyContent: "center",
      }}>
        <ActivityIndicator size={46} color={theme.text} />
      </View>
    )
  }
  return (
    <ScrollView style={{ height: "100%" }}>

    </ScrollView>
  )
}

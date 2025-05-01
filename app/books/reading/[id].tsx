import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { getBookData } from "@/utils/getBookData";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { WebView } from "react-native-webview";
export default function ReadingScreen() {
  const [loadingBook, setLoadingBook] = useState<boolean>(false);
  const [bookHtml, setBookHtml] = useState<string | null>(null);
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
          const bookData = await getBookData(book.path)
          await bookData.ready;
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
    <WebView
      originWhitelist={['*']}
      source={{ html: bookHtml ? generateHTML(bookHtml) : "<p>Loading Book...</p>" }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
    />
  )
}
const generateHTML = (bookHtml: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EPUB Reader</title>
  <style>
    html, body { margin: 0; padding: 0; height: 100%; }
    #viewer { height: 100%; }
  </style>
</head>
<body>
  <div id="viewer">${bookHtml}</div>
<script>
console.log("webview JS");
</script>
</body>
</html>
`

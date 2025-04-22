import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { TBookMetaData } from "@/types/book.types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import HTMLView from "react-native-htmlview"
export default function BookDetails() {
  const [book, setBook] = useState<TBookMetaData | null>(null);
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();
  const { library } = useLibrary();

  useEffect(() => {
    loadBook();
  }, [])

  const loadBook = () => {
    const book = library.find(b => b.id === id);
    if (book) {
      console.log("info : ", book.title, book.cover);
      setBook(book);
    } else {
      throw new Error(`No book found with id : ${id}`)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {book ? (
        <>
          <View style={{ alignItems: "center", marginTop: 50, marginBottom: 80 }}>
            <Image
              source={{ uri: book.cover }}
              style={{ width: 180, height: 300,borderRadius:10,borderWidth:2,borderColor:theme.nav }}
            />
          </View>

          <View style={{ minHeight: "100%", backgroundColor: theme.nav, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30 }}>
            <Text style={{ color: theme.background, fontSize: 22, fontWeight: 900 }}>{book.title}</Text>
            <Text style={{ color: theme.background, fontSize: 15, marginBottom: 20 }}>{book.creator}</Text>


            <Text style={{ fontSize:18,color:theme.background,fontWeight:700,marginBottom:5 }}>Description</Text>
            <HTMLView
              value={`<div>${book.description}</div>`}
              stylesheet={{
                p: {
                  color: theme.background
                },
                div: { color: theme.background },
              }}
            />
          </View>
        </>
      ) : (
        <Text>No book found with id : {id}</Text>
      )}
    </ScrollView>
  )
}

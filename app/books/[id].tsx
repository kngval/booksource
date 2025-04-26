import { useLibrary } from "@/books/BookContext";
import { lightTheme, useTheme } from "@/theme/themeContext";
import { TBookMetaData } from "@/types/book.types";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import HTMLView from "react-native-htmlview"
export default function BookDetails() {
  const [book, setBook] = useState<TBookMetaData | null>(null);
  const { theme } = useTheme();
  const { library } = useLibrary();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadBook();
  },[])

  const loadBook = () => {
    const b = library.find(b => b.id === id);
    if(b){
      setBook(b);
    } else {
      setBook(null);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: theme.background,minHeight:"100%" }}>
      {book ? (
        <>
          <View style={{ alignItems: "center", marginTop: 50, marginBottom: 80 }}>
            <Image
              source={{ uri: book.cover }}
              style={{ width: 180, height: 300,borderRadius:5 }}
            />
          </View>

          <View style={{ minHeight: "100%", backgroundColor: theme.nav, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30 }}>
            <Text style={{ color: theme.background == "#F2EAC5" ? theme.background: theme.text, fontSize: 22, fontWeight: 900 }}>{book.title}</Text>
            <Text style={{ color: theme.background == "#F2EAC5" ? theme.background: theme.text, fontSize: 15, marginBottom: 20,fontStyle:"italic" }}> - {book.creator}</Text>

            <Pressable onPress={() => console.log("test")}>
              <Text>Read</Text>
            </Pressable>


            <Text style={{ fontSize:18,color:theme.background == "#F2EAC5" ? theme.background: theme.text,fontWeight:700,marginBottom:5 }}>Description</Text>
            <HTMLView
              value={`<div>${book.description.length > 0 ? book.description : "There are no description available for this book"}</div>`}
              stylesheet={{
                div: { color: theme.background ==  "#F2EAC5"? theme.background : theme.text },
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

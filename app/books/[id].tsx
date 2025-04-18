import { useLibrary } from "@/books/BookContext";
import { TBookMetaData } from "@/types/book.types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function BookDetails() {
  const [book, setBook] = useState<TBookMetaData | null>(null);
  const { id } = useLocalSearchParams();
  const { library } = useLibrary();


  useEffect(() => {
    loadBook();
  }, [])

  const loadBook = () => {
    const book = library.find(b => b.id === id);
    if (book) {
      console.log("info : ",book.title,book.cover);
      setBook(book);
    } else {
      throw new Error(`No book found with id : ${id}`)
    }
  }

  return (
    <View>
      {book ? (
        <>
          <Text>{book.title}</Text>
          <Image 
            source={{ uri: book.cover }}
            style={{ width : 150, height:250 }}
          />
        </>
      ) : (
        <Text>No book found with id : {id}</Text>
      )}
    </View>
  )
}

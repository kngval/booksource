import { useLibrary } from "@/books/BookContext";
import { TBookMetaData } from "@/types/book.types";
import { getBookData } from "@/utils/getBookData";
import Epub from "epubjs";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function ReadingScreen() {
  const { library } = useLibrary();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadBook();
  },[])
  const loadBook = async() => {
    const book = library.find(b => b.id == id);
    if (book) {
      if(book.path){
        const newBook = await getBookData(book.path)
        const metadata = await newBook.loaded.metadata;
        console.log("New Book Title : " ,metadata.title);
      }

    }

  }
  return (
    <ScrollView>

    </ScrollView>
  )
}

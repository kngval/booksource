import { TBookMetaData } from "@/types/book.types"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type TLibraryContext = {
  library: TBookMetaData[];
  addBook: (book: TBookMetaData) => Promise<void>;
  loadLibrary : () => Promise<void>;
}

const LibraryContext = createContext<TLibraryContext | null>(null)

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);

  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");

  return ctx;
}

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [library, setLibrary] = useState<TBookMetaData[]>([]);

  const loadLibrary = async() => {
    const jsonValue = await AsyncStorage.getItem("library");
    const books = jsonValue ? JSON.parse(jsonValue) : [];
    setLibrary(books);
  }

  const addBook = async (book: TBookMetaData) => {
    const updated = [...library, book];
    setLibrary(updated);
    await AsyncStorage.setItem('library', JSON.stringify(updated));
  }

  useEffect(() => {
    loadLibrary();
  },[])
  return (
    <LibraryContext.Provider value={{ library, addBook,loadLibrary }}>
      {children}
    </LibraryContext.Provider>
  )

}

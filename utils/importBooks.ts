import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TBookMetaData } from "@/types/book.types";


export const importBook = async (bookUri: string, bookMetaData: TBookMetaData) => {

  const newPath = `${FileSystem.documentDirectory}${bookMetaData.title}.epub`
  console.log("New Path : ", newPath);
  await FileSystem.copyAsync({
    from: bookUri,
    to: newPath
  })
  bookMetaData.path = newPath;
  console.log("NEW Book metadata : ", bookMetaData);
  addBookToLibrary(bookMetaData);
}

const addBookToLibrary = async (book:TBookMetaData):Promise<void> => {
  const jsonValue = await AsyncStorage.getItem('library');
  const currentLibrary:typeof book[] = jsonValue != null ? JSON.parse(jsonValue) : [];
  currentLibrary.push(book);
  await AsyncStorage.setItem('library',JSON.stringify(currentLibrary));

}


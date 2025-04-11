import * as FileSystem from "expo-file-system";
import { TBookMetaData } from "@/types/book.types";
import { v4 as uuidv4 } from 'uuid';

export const importBook = async (bookUri: string, bookMetaData: TBookMetaData) => {

  const id = uuidv4();
  const newPath = `${FileSystem.documentDirectory}${id}.epub`
  console.log("New Path : ", newPath);
  await FileSystem.copyAsync({
    from: bookUri,
    to: newPath
  })
  const newBook:TBookMetaData = {
    ...bookMetaData,
    path : newPath
  }

  console.log("NEW Book metadata : ", newBook);
  return newBook;
}

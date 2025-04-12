import * as FileSystem from "expo-file-system";
import { TBookMetaData } from "@/types/book.types";
import { getBookData } from "./getBookData";
import * as Crypto from "expo-crypto";
export const importBook = async (bookUri: string):Promise<TBookMetaData> => {

  const id = Crypto.randomUUID();

  const book = await getBookData(bookUri);

  //cover
  const cover = await book.loaded.cover;
  const coverBase64 = await book.archive.getBase64(cover);

  //metadata
  const metadata = await book.loaded.metadata;
  //uuid
  const newPath = `${FileSystem.documentDirectory}${id}.epub`
  console.log("New Path : ", newPath);
  await FileSystem.copyAsync({
    from: bookUri,
    to: newPath
  })

  const newBook: TBookMetaData = {
    ...metadata,
    id: id,
    path: newPath,
    cover: coverBase64
  }

  return newBook;
}

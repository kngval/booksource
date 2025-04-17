import * as FileSystem from "expo-file-system";
import { TBookMetaData } from "@/types/book.types";
import { getBookData } from "./getBookData";
import * as Crypto from "expo-crypto";
export const importBook = async (bookUri: string): Promise<TBookMetaData> => {

  const id = Crypto.randomUUID();

  const book = await getBookData(bookUri);

  //cover
  const cover = await book.loaded.cover;
  const coverBase64 = await book.archive.getBase64(cover);

  //remove data:image prefix
  const cleanedBase64 = coverBase64.replace(/^data:image\/\w+;base64,/, '');
  console.log("cleaned base64 : ", cleanedBase64.slice(0,20));
  //file extension jpg/png
  const extension = coverBase64.includes("image/png") ? "png" : "jpg";
  const coverFilePath = `${FileSystem.documentDirectory}${id}-cover.${extension}`;

  console.log("Cover Path : ", coverFilePath);
  console.log("Base64 starts with:", coverBase64.slice(0, 10));

  console.log("Base64 Length : ", coverBase64.length);
  await FileSystem.writeAsStringAsync(coverFilePath, cleanedBase64, {
    encoding: FileSystem.EncodingType.Base64,
  });

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
    cover: coverFilePath
  }

  return newBook;
}


import Epub, { Book } from "epubjs";
import * as FileSystem from "expo-file-system";

export const getBookData = async (uri : string):Promise<Book> => {

  const base64Content = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const binaryString = atob(base64Content);
  const buffer = new ArrayBuffer(binaryString.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binaryString.length; i++) {
    view[i] = binaryString.charCodeAt(i);
  }

  const book = Epub(buffer);
  return book;
}

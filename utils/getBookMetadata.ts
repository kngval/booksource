import Epub from "epubjs";
import { PackagingMetadataObject } from "epubjs/types/packaging";
import { getBook } from "./getBookData";

export const getBookMetadata = async (uri: string):Promise<PackagingMetadataObject> => {
  const book = await getBook(uri);
  const metadata = await book.loaded.metadata;
  console.log("BOOK METADATA : ", metadata);
  return metadata;
};

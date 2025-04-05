import Epub from "epubjs";
import { PackagingMetadataObject } from "epubjs/types/packaging";
import { getBookData } from "./getBookData";

export const getBookMetadata = async (uri: string):Promise<PackagingMetadataObject> => {
  const book = await getBookData(uri);
  const metadata = await book.loaded.metadata;
  console.log("BOOK METADATA : ", metadata);
  return metadata;
};

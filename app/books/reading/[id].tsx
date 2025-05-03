import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { useLocalSearchParams } from "expo-router";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { XMLParser } from "fast-xml-parser";
export default function ReadingScreen() {
  const [loadingBook, setLoadingBook] = useState<boolean>(false);
  // const [bookHtml, setBookHtml] = useState<string | null>(null);
  const { library } = useLibrary();
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadBook();
  }, [])
  const loadBook = async () => {
    try {
      setLoadingBook(true);
      const book = library.find(b => b.id == id);
      console.log("Passed Book : ", book?.title)
      if (book) {
        if (book.path) {
          const unzippedEpub = await unzipEpub(book.path);
          const opfPath = await getOpfPath(unzippedEpub);
          console.log("Opf : ",opfPath);


        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBook(false);
    }

  }

  const unzipEpub = async(epubUri : string):Promise<JSZip> => {
    const epubBinary = await FileSystem.readAsStringAsync(epubUri,{
      encoding : FileSystem.EncodingType.Base64,
    })
    const zip = await JSZip.loadAsync(epubBinary,{base64 : true})
    return zip;
  }

  const getOpfPath = async(zip:JSZip):Promise<string> => {
    const containerXml =  await zip.file('META-INF/container.xml')?.async('text');
    console.log("Container XML : " ,containerXml);
    if(!containerXml) throw new Error("container.xml not found");
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix:'@_',
      processEntities : true,
      ignoreDeclaration: true,
      removeNSPrefix:true
    });
    const xml = parser.parse(containerXml);
    console.log("XML : " ,xml);
    return xml.container.rootfiles.rootfile['@_full-path'];
  }


  if (loadingBook) {
    return (
      <View style={{
        flexDirection: "row",
        width: "100%",
        height: "90%",
        justifyContent: "center",
      }}>
        <ActivityIndicator size={46} color={theme.text} />
      </View>
    )
  }
  return (
   <View></View> 
  )
}

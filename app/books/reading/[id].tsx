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
          const spine = await getBookSpine(unzippedEpub,opfPath);
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
    return xml.container.rootfiles.rootfile['@_full-path'];
  }

  const getBookSpine = async(zip : JSZip, opfPath : string):Promise<void> => {
    const rawOpfText = await zip.file(opfPath)?.async('text');
    if(!rawOpfText) throw new Error("Opf not found");
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix:'@_',
      processEntities : true,
      ignoreDeclaration: true,
      removeNSPrefix:true
    });
    const opf = parser.parse(rawOpfText);

    const manifest = Array.isArray(opf.package.manifest.item) ? opf.package.manifest.item : [opf.package.manifest.item];
    
    const spine = Array.isArray(opf.package.spine.itemref) ? opf.package.spine.itemref : opf.package.spine.itemref;
    const idToHref = new Map();

    for(const item of manifest){
      idToHref.set(item['@_id'], item['@_href']);
    }
    idToHref.forEach(i => console.log(i))

    const opfBase = opfPath.split('/').slice(0,-1).join('/');
    const ss = spine.map((s:{ '@_idref' : string }) => `${opfBase}/${idToHref.get(s['@_idref'])}`);
    return ss;
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

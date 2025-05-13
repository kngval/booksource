import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { useLocalSearchParams } from "expo-router";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { XMLParser } from "fast-xml-parser";
import { WebView } from 'react-native-webview';

export default function ReadingScreen() {
  const [loadingBook, setLoadingBook] = useState<boolean>(false);
  const [bookView, setBookView] = useState<string | null>(null);
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
          const spine = await getBookSpine(unzippedEpub, opfPath);
          const htmlContent = await getCombinedHtml(unzippedEpub, spine);
          console.log("HTML CONTENT : ", htmlContent);
          setBookView(htmlContent);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBook(false);
    }
  }

  const unzipEpub = async (epubUri: string): Promise<JSZip> => {
    const epubBinary = await FileSystem.readAsStringAsync(epubUri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const zip = await JSZip.loadAsync(epubBinary, { base64: true })
    return zip;
  }

  const getOpfPath = async (zip: JSZip): Promise<string> => {
    const containerXml = await zip.file('META-INF/container.xml')?.async('text');
    if (!containerXml) throw new Error("container.xml not found");
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      processEntities: true,
      ignoreDeclaration: true,
      removeNSPrefix: true
    });
    const xml = parser.parse(containerXml);
    return xml.container.rootfiles.rootfile['@_full-path'];
  }

  const getBookSpine = async (zip: JSZip, opfPath: string): Promise<string[]> => {
    const rawOpfText = await zip.file(opfPath)?.async('text');
    if (!rawOpfText) throw new Error("Opf not found");
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      processEntities: true,
      ignoreDeclaration: true,
      removeNSPrefix: true
    });
    const opf = parser.parse(rawOpfText);

    const manifest = Array.isArray(opf.package.manifest.item) ? opf.package.manifest.item : [opf.package.manifest.item];

    const spine = Array.isArray(opf.package.spine.itemref) ? opf.package.spine.itemref : opf.package.spine.itemref;
    const idToHref = new Map();

    for (const item of manifest) {
      idToHref.set(item['@_id'], item['@_href']);
    }
    idToHref.forEach(i => console.log(i))

    const opfBase = opfPath.split('/').slice(0, -1).join('/');
    return spine.map((s: { '@_idref': string }) => `${opfBase}/${idToHref.get(s['@_idref'])}`);

  }

  const getCombinedHtml = async (zip: JSZip, paths: string[]): Promise<string> => {
    // const htmlParts = await Promise.all(
    //   paths.map(async(path) => {
    //     const file = await zip.file(path)?.async('text');
    //     return file ?? '';
    //   })
    // );
    // return htmlParts.join('\n');
    const htmlContent = await zip.file(paths[15])?.async('text');
    if (!htmlContent) return "";

    const styledHtml = htmlContent.replace(
      /<head[^>]*>/i,
      match => `${match}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>
        body {
            font-size: 0.8rem !important;
            background-color: ${theme.background};
            padding-left:1rem;
            padding-right:1rem;
          }
          h2{

            text-align: center;
          }
         a {
            color:${theme.text};
            font-size: 1.5rem
          }
          p{
            color: ${theme.text}
          }
          .indented {
            text-indent: 2rem;
          }
      </style>`

    );
    return styledHtml ?? "";
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
    <WebView
      originWhitelist={['*']}
      source={{ html: bookView ?? "" }}
      setBuiltInZoomControls={false}
    />
  )
}

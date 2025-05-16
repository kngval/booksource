import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { useLocalSearchParams } from "expo-router";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { XMLParser } from "fast-xml-parser";
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReadingScreen() {
  const [loadingBook, setLoadingBook] = useState<boolean>(false);
  const [bookView, setBookView] = useState<string | null>(null);
  const { library } = useLibrary();
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadBook();
  }, [])

  //helpers for caching
  const getSpineCacheKey = (id: string) => `book-spine-${id}`;
  const getHtmlCachePath = (id: string, index: number) => `${FileSystem.cacheDirectory}epub-${id}-html-${index}.xhtml`;

  //load book function
  const loadBook = async (): Promise<void> => {
    try {
      setLoadingBook(true);
      const book = library.find(b => b.id == id);
      if (!book || !book.path) return;
      console.log("Passed Book : ", book.title)
      console.log("Passed Book ID: ", book.id)
      // const cachedSpineRaw = await AsyncStorage.getItem(getSpineCacheKey(book.id));

      const unzippedEpub = await unzipEpub(book.path);
      const opfPath = await getOpfPath(unzippedEpub);
      const spine = await getBookSpine(unzippedEpub, opfPath);
      spine.forEach(i => console.log("FINAL SPINE : ", i));
      const htmlContent = await getCombinedHtml(unzippedEpub, spine);

      setBookView(htmlContent);
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
    console.log("OPF PATH : ", opfPath);
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

    console.log("OPF : ", opf);
    console.log("MANIFEST : ", opf.package.manifest.item);

    const manifest = Array.isArray(opf.package.manifest.item) ? opf.package.manifest.item : [opf.package.manifest.item];

    const spine = Array.isArray(opf.package.spine.itemref) ? opf.package.spine.itemref : opf.package.spine.itemref;
    console.log("SPINE : ", opf.package.spine.itemref);

    const idToHref = new Map();

    for (const item of manifest) {
      idToHref.set(item['@_id'], item['@_href']);
    }
    idToHref.forEach(i => console.log("SPINE MAP : ", i));

    if (opfPath.includes("/")) {
      const opfBase = opfPath.split('/').slice(0, -1).join('/');
      return spine.map((s: { '@_idref': string }) => `${opfBase}/${idToHref.get(s['@_idref'])}`);
    }

    const opfB = opfPath.split('.').slice(0, -1).join('/');

    console.log("NEW OPF BASE : ", opfB);
    return spine.map((s: { '@_idref': string }) => `${idToHref.get(s['@_idref'])}`);
  }

  const getCombinedHtml = async (zip: JSZip, paths: string[]): Promise<string> => {
    const htmlParts = await Promise.all(
      paths.map(async (path) => {
        const htmlContent = await zip.file(path)?.async('text');
        if (!htmlContent) return "";

    const styledHtml = htmlContent.replace(
      /<head[^>]*>/i,
      match => `${match}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>
        body {
            background-color: ${theme.background};
            word-break:break-word;
            padding-left:1rem;
            padding-right:1rem;
            color:${theme.text};
            margin-top: 5rem;
          }
          h2{
            text-align: center;
            font-size: 1.5rem;
          }
         a {
            font-size: 1.5rem;
            color:${theme.text};
            text-align:center;
            display:hidden;
          }
          p{
            color: ${theme.text};
            text-indent:1rem;
            text-align:justify;
            font-size: 0.9rem;
          }
      </style>`

    );
        return styledHtml;
      })
    );
    return htmlParts.join('\n');


    // const htmlContent = await zip.file(paths[20])?.async('text');
    // console.log(typeof htmlContent);
    // if (!htmlContent) return "";
    //
    // const styledHtml = htmlContent.replace(
    //   /<head[^>]*>/i,
    //   match => `${match}
    //   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    //   <style>
    //     body {
    //         font-size: 0.8rem !important;
    //         background-color: ${theme.background};
    //         padding-left:1rem;
    //         padding-right:1rem;
    //         color:${theme.text};
    //       }
    //       h2{
    //         text-align: center;
    //         font-size: 1.5rem;
    //       }
    //      a {
    //         font-size: 1.5rem;
    //         color:${theme.text};
    //       }
    //       p{
    //         color: ${theme.text};
    //         text-indent:1rem;
    //         text-align:justify;
    //         font-size: 1rem;
    //       }
    //   </style>`
    //
    // );
    // console.log("STYLED HTML : " ,styledHtml);
    // return styledHtml;

    // return htmlContent;
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

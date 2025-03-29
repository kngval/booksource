import { useTheme } from "@/theme/themeContext";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useFile } from "@/books/BookContext";
import Epub from "epubjs";
import { WebView } from "react-native-webview";

export default function MenuButton() {
  const { theme,toggleTheme } = useTheme();
  const { selectedFile,setSelectedFile } = useFile();
  const [visibility, setVisibility] = useState<boolean>(false);
  const [cover,setCover] = useState<string | null>(null);

  const pickEpubFile = async() => {
   try {
      //FILE SELECTION
      console.log("Testing");
      const result = await DocumentPicker.getDocumentAsync({
        type:"application/epub+zip",
        // copyToCacheDirectory: true
      })
      if(result.canceled){
        console.log("User canceled file selection");
        return;
      };
      const { uri,name } = result.assets[0];
      console.log("SELECTED FILE  : ", name,uri);

      const base64Content = await FileSystem.readAsStringAsync(uri, {
        encoding : FileSystem.EncodingType.Base64,
      });

      const binaryString = atob(base64Content);
      const buffer = new ArrayBuffer(binaryString.length);
      const view = new Uint8Array(buffer);
      for(let i = 0; i < binaryString.length; i++){
        view[i] = binaryString.charCodeAt(i)
      }

      const book = Epub(buffer);
      const metadata = await book.loaded.metadata;
      console.log("BOOK METADATA : ", metadata);

      const cover = await book.loaded.cover;
      const cover64 = await book.archive.getBase64(cover);
      console.log("cover :" ,cover64);
      setCover(cover64);

    } catch(error){
      console.error("Error picking file: ", error);
    }
  }

  const blobToBase64 = async(blob:Blob):Promise<string> => {
    return new Promise ((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    })
  }

  // const extractCoverImage = async(book) => {}
  return (
    <>
      <TouchableOpacity style={{ width:10 }} onPress={() => setVisibility(!visibility)}>
        <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
        <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
        <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
      </TouchableOpacity>

      {/* MENU POPUP */}

      {visibility === true && (
        <View style={{
          backgroundColor: theme.menu,
          elevation:5,
          position: "absolute",
          gap: 15,
          top: 35,
          right: 0,
          zIndex: 10,
          padding: 15
        }}>
          <TouchableOpacity onPress={() => pickEpubFile()}>
            <Text style={{ color: theme.text, fontSize:17 }}>Import</Text>
             
          </TouchableOpacity>


          <TouchableOpacity onPress={() => toggleTheme()}>
            <Text style={{ color: theme.text, fontSize:17 }}>Theme Switch Test</Text>
             
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{ color: theme.text, fontSize:17 }}>Import Books</Text>
             
          </TouchableOpacity>
          {cover && (
            <Image source={{uri:cover}} style={{ width:100,height:100 }}/>
          )}
        </View>
      )}

    </>
  );
}

const styles = StyleSheet.create({
  anchorButton: {
    padding: 10, // Ensure the touch area is big enough
    alignItems: "center",
    justifyContent: "center",
  },
  dotsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  menuStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginVertical: 1.2,
  },
});

import { useTheme } from "@/theme/themeContext";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useFile } from "@/books/BookContext";
import Epub from "epubjs";
export default function MenuButton() {
  const { theme,toggleTheme } = useTheme();
  const { selectedFile,setSelectedFile } = useFile();
  const [visibility, setVisibility] = useState<boolean>(false);

  const pickEpubFile = async() => {
   try {
      console.log("Testing");
      const result = await DocumentPicker.getDocumentAsync({
        type:"application/epub+zip",
        copyToCacheDirectory: true
      })

      if(result.canceled){
        console.log("User canceled file selection");
        return;
      };
      console.log("SELECTED FILE : ", result.assets[0]);

      const fileUri = result.assets[0].uri;
      const fileContent = await FileSystem.readAsStringAsync(fileUri,{
        encoding: FileSystem.EncodingType.Base64,
      });
      const epubBlob = `data:application/epub+zip;base64,${fileContent}`;

      const book = Epub(epubBlob)
      // await book.ready;
      console.log('BOOK EPUB : ', book);

      console.log("BOOK : ",selectedFile);
    } catch(error){
      console.error("Error picking file: ", error);
    }
  }
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

import { useTheme } from "@/theme/themeContext";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { getBookData } from "@/utils/getBookData";
import { importBook } from "@/utils/importBooks";
import { TBookMetaData } from "@/types/book.types";

export default function MenuButton() {
  const { theme,toggleTheme } = useTheme();
  const [visibility, setVisibility] = useState<boolean>(false);
  const [cover,setCover] = useState<string | null>(null);

  const pickEpubFile = async() => {
   try {
      //FILE SELECTION
      console.log("Testing");
      const result = await DocumentPicker.getDocumentAsync({
        type:"application/epub+zip",
      })
      if(result.canceled){
        console.log("User canceled file selection");
        return;
      };

      const { uri,name } = result.assets[0];
      console.log("SELECTED FILE  : ", name,uri);


      const book = await getBookData(uri);
      const metadata = await book.loaded.metadata; 
      console.log("Metadata: ", metadata);
      const bookMetadata:TBookMetaData = {
        title: metadata.title,
        creator: metadata.creator,
        description: metadata.description,
      }

      await importBook(uri,bookMetadata);
       
      
      const cover = await book.loaded.cover;
      const cover64 = await book.archive.getBase64(cover);
      setCover(cover64);

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

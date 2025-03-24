import { useTheme } from "@/theme/themeContext";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';

export default function MenuButton() {
  const { theme } = useTheme();
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
    } catch(error){
      console.error("Error picking file: ", error);
    }
  }
  return (
    <>
      <TouchableOpacity onPress={() => setVisibility(!visibility)}>
        <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
        <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
        <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
      </TouchableOpacity>

      {/* MENU POPUP */}

      {visibility === true && (
        <View style={{
          backgroundColor: theme.background,
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


          <TouchableOpacity>
            <Text style={{ color: theme.text, fontSize:17 }}>Import Books</Text>
             
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
  menuContainer: {
    width: 150, // 🚀 **Fix: Set a proper width for the menu**
    paddingVertical: 5, // 🚀 **Fix: Reduce unnecessary spacing**
  },
});

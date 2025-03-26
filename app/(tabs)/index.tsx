import { useFile } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { unzip } from "react-native-zip-archive";
export default function HomeScreen() {
  const { theme } = useTheme();
  const { selectedFile } = useFile();
  
  useEffect(() => {
    const loadCover = async() => {
      try{
      }catch(error){

      }
    }
  },[])
  return (
    <View style={{ ...styles.wrapper, backgroundColor: theme.background }}>
      <Text>HELLO HOME</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
})



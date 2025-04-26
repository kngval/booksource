import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { TBookMetaData } from "@/types/book.types";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { importBook } from "@/utils/importBooks";
import { ImportIcon } from "@/assets/importSvg";
import { DarkModeIcon } from "@/assets/darkModeSvg";
import { LightModeIcon } from "@/assets/lightModeSvg";
import BookIcon from "@/assets/bookSvg";


//TSX
export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();
  const { library, deleteBook, loadLibrary, addBook } = useLibrary();
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
  const [loadingBook, setLoadingBook] = useState<boolean>(false)
  useEffect(() => {
    // deleteBook();
    loadLibrary();
  }, []);

  const pickEpubFile = async () => {
    try {
      //FILE SELECTION
      console.log("Testing");
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/epub+zip",
      })
      if (result.canceled) {
        console.log("User canceled file selection");
        return;
      };

      const { uri, name } = result.assets[0];
      console.log("SELECTED FILE  : ", name, uri);

      setMenuVisibility(false);
      setLoadingBook(true);
      //IMPORT BOOK
      const importedBook = await importBook(uri);
      await addBook(importedBook);


    } catch (error) {
      console.error("Error picking file: ", error);
    }finally {
      setLoadingBook(false);
    }
  }

  const renderBook = ({ item }: { item: TBookMetaData }) => {
    if(item.id === "loading"){
      return(
        <View style={{ width:100,height:170,justifyContent:"center" }}>
          <ActivityIndicator size={36} color={theme.text}/>
        </View>
      )
    }
    return (
      <Link
        href={`/books/${item.id}`}
        style={{ alignItems: "center", paddingBottom: 10, marginHorizontal: 5 }}>

        <View style={{ alignItems: "center" }}>
          {item.cover && (
            <Image
              source={{ uri: item.cover }}
              style={{ width: 100, height: 170, borderRadius: 5 }}
            />
          )}

          <Text style={{ color: theme.text, width: 100, textAlign: "center", fontSize: 12, fontWeight: 700, marginTop: 8, flexWrap: "wrap" }}>{item.title}</Text>
        </View>
      </Link>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: theme.background, position: "relative", paddingHorizontal: 12 }}>
      {library.length > 0 ? (
        <FlatList
          data={[...(loadingBook ? [{ id:"loading",title:"importing book",creator:"val",cover:null,description:"..." }] : []),...library]}
          keyExtractor={(item) => item.id}
          renderItem={renderBook}
          contentContainerStyle={styles.wrapper}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />

      ) : (
        <View style={{ alignItems: "center", justifyContent: "center", height: "80%" }}>
          <BookIcon width={100} height={100} color={theme.text} />
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: 700, width: "90%", textAlign: "center", marginTop: 5 }}>There are currently no books in your library.</Text>
        </View>
      )
      }

      <Modal
        visible={menuVisibility}
        transparent
        statusBarTranslucent
        animationType="slide"
        onRequestClose={() => setMenuVisibility(false)}
      >
        <View
          style={{
            backgroundColor: theme.background,
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
            elevation: 5,
            width: 250,
            height: 350,
            padding: 20,
            borderRadius: 10
          }}
        >
          <ScrollView>

            <TouchableOpacity onPress={() => pickEpubFile()} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>

              <ImportIcon width={20} height={20} color={theme.text} />
              <Text style={{ color: theme.text, fontWeight: 700, fontSize: 16 }}>Import Books</Text>

            </TouchableOpacity>

            {theme.background == "#F2EAC5" ? (
              <TouchableOpacity onPress={() => toggleTheme()} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>

                <DarkModeIcon width={20} height={20} color={theme.text} />
                <Text style={{ color: theme.text, fontWeight: 700, fontSize: 16 }}>Dark Mode</Text>

              </TouchableOpacity>
            ) : (

              <TouchableOpacity onPress={() => toggleTheme()} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>

                <LightModeIcon width={20} height={20} color={theme.text} />
                <Text style={{ color: theme.text, fontWeight: 700, fontSize: 16 }}>Light Mode</Text>
              </TouchableOpacity>
            )}

          </ScrollView>


          <TouchableOpacity onPress={() => setMenuVisibility(!menuVisibility)} style={{ width: "100%", backgroundColor: theme.background, position: "absolute", bottom: 20, alignItems: "center", alignSelf: "center", }}>
            <Text style={{ color: theme.text, textAlign: "center", fontWeight: 700 }}>Close</Text>

          </TouchableOpacity>
        </View>
      </Modal>

      {menuVisibility === false && (
        <TouchableOpacity onPress={() => setMenuVisibility(!menuVisibility)} style={{
          position: "absolute",
          width: 50,
          height: 50,
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
          bottom: 20,
          right: 20,
          backgroundColor: theme.background == "#F2EAC5" ? theme.background : theme.menu,

        }}
        >
          <View>
            <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
            <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
            <View style={{ ...styles.menuStyle, backgroundColor: theme.text }}></View>
          </View>
        </TouchableOpacity>
      )}

    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 50,
  },
  menuStyle: {
    width: 20,
    height: 3,
    borderRadius: 3,
    marginVertical: 1.2,
  },
});

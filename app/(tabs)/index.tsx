import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { TBookMetaData } from "@/types/book.types";
import { useEffect } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
  const { theme } = useTheme();
  const { library, loadLibrary, deleteBook } = useLibrary();
  useEffect(() => {
    // deleteBook();

    loadLibrary();
  }, []);

  const renderBook = ({ item }: { item: TBookMetaData }) => {
    return (
      <View style={{ elevation: 2, borderWidth: 0.1, marginHorizontal: 2, alignItems: "center",paddingBottom:10 }}>
        {item.cover && (
          <Image
            source={{ uri: item.cover }}
            style={{ width: 110, height: 160 }}
          />
        )}

        <Text style={{ color: theme.text, width: 100, textAlign: "center", fontWeight: 600, marginVertical: 10, flexWrap: "wrap" }}>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={{ width:"100%",height:"100%", backgroundColor: theme.background,paddingHorizontal:5,alignItems:"center" }}>
      <FlatList
        data={library}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        contentContainerStyle={styles.wrapper}
        numColumns={3}
        showsVerticalScrollIndicator={false}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 5,
    // alignSelf: "center",
    paddingBottom: 50,
    flexWrap: "wrap"
  },
});

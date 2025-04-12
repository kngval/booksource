import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { TBookMetaData } from "@/types/book.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
  const { theme } = useTheme();
  const { library, loadLibrary, deleteBook } = useLibrary();
  useEffect(() => {
    // deleteBook();

    loadLibrary();
  }, [library]);

  const renderBook = ({ item }: { item: TBookMetaData }) => {
    return (
      <View style={{ elevation:2,borderWidth:0.1,marginHorizontal:2 }}>
        <Image
          source={{ uri: item.cover }}
          style={{ width: 110, height: 150 }}
        />

        <Text style={{ color: theme.text, width: 100, textAlign: "center", fontWeight: 800, marginVertical: 10 }}>{item.title}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={library}
      keyExtractor={(item) => item.id}
      renderItem={renderBook}
      contentContainerStyle={[styles.wrapper, { backgroundColor: theme.background }]}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
    gap: 5,
    height:"100%",
    paddingBottom:50

  },
});

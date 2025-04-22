import { useLibrary } from "@/books/BookContext";
import { useTheme } from "@/theme/themeContext";
import { TBookMetaData } from "@/types/book.types";
import { useEffect } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
export default function HomeScreen() {
  const { theme } = useTheme();
  const { library, loadLibrary, deleteBook } = useLibrary();
  const router = useRouter();
  useEffect(() => {
    // deleteBook();

    loadLibrary();
  }, []);

  const renderBook = ({ item }: { item: TBookMetaData }) => {
    return (
      <Pressable onPress={() => router.push(`/books/${item.id}`)} style={{ alignItems: "center", paddingBottom: 10, marginHorizontal:8}}>
        <View style={{ alignItems:"center" }}>
          {item.cover && (
            <Image
              source={{ uri: item.cover }}
              style={{ width: 100, height: 170,borderRadius:5,borderColor:theme.text,borderWidth:2 }}
            />
          )}

          <Text style={{ color: theme.text, width: 100, textAlign: "center",fontSize:12, fontWeight: 700, marginTop:8,flexWrap: "wrap" }}>{item.title}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: theme.background, alignItems: "center" }}>
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
    paddingBottom: 50,
  },
});

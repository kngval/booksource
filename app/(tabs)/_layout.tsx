import BookMarkIcon from "@/assets/bookmarkSvg";
import FilterSvg from "@/assets/filterSvg";
import HomeIcon from "@/assets/homeSvg";
import UserIcon from "@/assets/userSvg";
import { useTheme } from "@/theme/themeContext";
import { Tabs } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
export default function TabsLayout() {
  const { theme } = useTheme();
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        width:330,
        height:80,
        backgroundColor: theme.nav,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        alignSelf: "center",
        alignItems: "center",
        flexDirection : "row",
        paddingBottom:Platform.OS === "android" ? 20 : 0
      },

    }}>
      <Tabs.Screen name="index" options={{
        title: "All Books",
        headerTitleStyle: {
          fontWeight: 700,
          fontSize: 25,
          color: theme.text,
        },
        tabBarLabel: "",
        tabBarIcon: () => (
          <HomeIcon width={25} height={30} color={theme.background} />
        )
        ,
        headerStyle: {
          backgroundColor: theme.background,
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: "transparent",
          borderBottomWidth: 0,
        },
        headerRight: () => (
          <View style={styles.rightContainer}>
            <FilterSvg width={25} height={25} color={theme.text} />
            <TouchableOpacity style={styles.menuContainer}>
              <View style={{ ...styles.menu, backgroundColor: theme.text }}></View>
              <View style={{ ...styles.menu, backgroundColor: theme.text }}></View>
              <View style={{ ...styles.menu, backgroundColor: theme.text }}></View>
            </TouchableOpacity>
          </View>
        ),
      }} />



      <Tabs.Screen name="user" options={{
        title: "User",
        headerTitleStyle: {
          fontWeight: 700,
          fontSize: 25,
          color: theme.text,
        },
        tabBarLabel: "",
        tabBarIcon: () => (
          <UserIcon width={30} height={30} color={theme.background} />
        )
        ,
        headerStyle: {
          backgroundColor: theme.background,
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: "transparent",
          borderBottomWidth: 0,
        },
      }} />


      <Tabs.Screen name="bookmarks" options={{
        title: "Book Marks",
        headerTitleStyle: {
          fontWeight: 700,
          fontSize: 25,
          color: theme.text,
        },
        tabBarLabel: "",
        tabBarIcon: () => (
          <BookMarkIcon width={30} height={30} color={theme.background} />
        )
        ,
        headerStyle: {
          backgroundColor: theme.background,
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: "transparent",
          borderBottomWidth: 0,
        },
      }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  rightContainer: {
    marginRight: 16, // Align to the right
    flexDirection: "row",
    gap: 10

  },
  menuContainer: {
    // flexDirection: "column",
  },
  menu: {
    width: 5,
    height: 5,
    borderRadius: 3, // Half of width/height for a perfect circle
    marginVertical: 1.2, // Adds spacing between dots
  },
});

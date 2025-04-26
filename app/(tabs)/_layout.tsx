// import BookMarkIcon from "@/assets/bookmarkSvg";
// import FilterSvg from "@/assets/filterSvg";
// import HomeIcon from "@/assets/homeSvg";
// import UserIcon from "@/assets/userSvg";
// import MenuButton from "@/components/Menu";
// import { useTheme } from "@/theme/themeContext";
// import { Tabs } from "expo-router";
// import { View, StyleSheet, Platform } from "react-native";
//
// export default function TabsLayout() {
//   const { theme } = useTheme();
//   return (
//     <Tabs screenOptions={{
//       tabBarStyle: {
//         width: "100%",
//         height: 70,
//         backgroundColor: theme.nav,
//         // borderTopLeftRadius: 28,
//         // borderTopRightRadius: 28,
//         borderColor:theme.nav,
//         alignSelf: "center",
//         alignItems: "center",
//         flexDirection: "row",
//         paddingBottom: Platform.OS === "android" ? 30 : 0
//       },
//
//     }}>
//       <Tabs.Screen name="index" options={{
//         title: "All Books",
//         headerTitleStyle: {
//           fontWeight: 700,
//           fontSize: 20,
//           color: theme.text,
//           
//         },
//         tabBarLabel: "",
//         tabBarIcon: () => (
//           <HomeIcon width={20} height={25} color={theme.tabIcon} />
//         )
//         ,
//         headerStyle: {
//           backgroundColor: theme.background,
//           borderWidth: 0,
//           elevation: 0,
//           shadowOpacity: 0,
//           shadowColor: "transparent",
//           borderBottomWidth: 0,
//         },
//         headerRight: () => (
//           <View style={styles.rightContainer}>
//             <FilterSvg width={20} height={20} color={theme.text} />
//             <MenuButton />
//           </View>
//
//         ),
//       }} />
//
//
//
//       <Tabs.Screen name="user" options={{
//         title: "User",
//         headerTitleStyle: {
//           fontWeight: 700,
//           fontSize: 25,
//           color: theme.text,
//         },
//         tabBarLabel:"",
//         tabBarIcon: () => (
//           <UserIcon width={25} height={25} color={theme.tabIcon} />
//         )
//         ,
//         headerStyle: {
//           backgroundColor: theme.background,
//           borderWidth: 0,
//           elevation: 0,
//           shadowOpacity: 0,
//           shadowColor: "transparent",
//           borderBottomWidth: 0,
//         },
//       }} />
//
//
//       <Tabs.Screen name="bookmarks" options={{
//         title: "Book Marks",
//         headerTitleStyle: {
//           fontWeight: 700,
//           fontSize: 25,
//           color: theme.text,
//         },
//         tabBarLabel: "",
//         tabBarIcon: () => (
//           <BookMarkIcon width={25} height={25} color={theme.tabIcon} />
//         )
//         ,
//         headerStyle: {
//           backgroundColor: theme.background,
//           borderWidth: 0,
//           elevation: 0,
//           shadowOpacity: 0,
//           shadowColor: "transparent",
//           borderBottomWidth: 0,
//         },
//       }} />
//
//     </Tabs>
//   )
// }
//
// const styles = StyleSheet.create({
//   rightContainer: {
//     flexDirection: "row",
//     gap: 25,
//     marginRight:20
//   },
// });

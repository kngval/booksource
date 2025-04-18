import { Stack } from "expo-router";

export default function BookLayout(){
  return <Stack screenOptions={{ animation : 'slide_from_left',headerShown: false}}>
    <Stack.Screen name="[id]"
      options={{
        headerShown : false
      }}
    />
  </Stack>
}

import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="(tabs)/index">
      <Stack.Screen name="(tabs)/index" options={{ title: "Movie Browser" }} />
      <Stack.Screen name="movie/[id]" options={{ title: "Movie Details" }} />
    </Stack>
  );
}


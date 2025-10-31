import { FlatList, StyleSheet, Text, View } from "react-native";
import MovieCard from "./MovieCard";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

type Props = {
  movies: Movie[];
};

export default function MovieList({ movies }: Props) {
  if (!movies.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies found 😔</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.imdbID}
      renderItem={({ item }) => <MovieCard movie={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 60,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    color: "#110101ff",
    letterSpacing: 0.5,
    fontWeight: "600",
  },
});

import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MovieList from "../../components/MovieList";
import SearchBar from "../../components/SearchBar";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchMovies = async () => {
    if (!query.trim()) return;
    const res = await fetch(`https://www.omdbapi.com/?apikey=9d31ef4c&s=${query}`);
    const data = await res.json();
    setMovies(data.Search || []);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎬 Movie Browser</Text>
      <SearchBar value={query} onChange={setQuery} onSearch={searchMovies} />
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MovieList movies={[item]} />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noResults}>No results yet.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7a95b79e", 
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#504dffff", 
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  listContainer: {
    paddingBottom: 32,
  },
  cardWrapper: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  noResults: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#999",
  },
});

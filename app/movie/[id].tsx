import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type MovieDetails = {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
};

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=9d31ef4c&i=${id}`)
      .then((res) => res.json())
      .then(setMovie);
  }, [id]);

  if (!movie) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Image
        source={{ uri: movie.Poster }}
        style={styles.poster}
        resizeMode="contain"
      />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text style={styles.subTitle}>{movie.Year} • {movie.Genre}</Text>
      <Text style={styles.plot}>{movie.Plot}</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Director:</Text>
        <Text style={styles.infoText}>{movie.Director}</Text>
      </View>
      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Actors:</Text>
        <Text style={styles.infoText}>{movie.Actors}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#79cbc7ff",
    padding: 16,
  },
  loading: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#999",
  },
  poster: {
    width: "100%",
    height: 400,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4d1a3dff",
    marginBottom: 8,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  plot: {
    fontSize: 16,
    color: "#000000ff",
    lineHeight: 22,
    marginBottom: 16,
  },
  infoBlock: {
    backgroundColor: "#9cafb4ff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 12,
    color: "#000000ff",
    marginBottom: 2,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 14,
    color: "#000000ff",
  },
});

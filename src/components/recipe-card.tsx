import { Image, StyleSheet, Text, View } from 'react-native';

export type Recipe = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  rating: number;
};

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text>Кухня: {recipe.cuisine}</Text>
        <Text>Сложность: {recipe.difficulty}</Text>
        <Text>Рейтинг: {recipe.rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 200,
  },

  info: {
    padding: 12,
    gap: 5,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
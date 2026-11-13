import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { Recipe } from '../../components/recipe-card';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipe() {
      setLoading(true);
      setError('');
      setRecipe(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Рецепт не найден');
        }

        const data: Recipe = await response.json();

        if (!controller.signal.aborted) {
          setRecipe(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Не удалось загрузить рецепт');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadRecipe();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={styles.center}
      />
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.center}>
        <Text>{error || 'Рецепт не найден'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>

        <Text>Кухня: {recipe.cuisine}</Text>
        <Text>Сложность: {recipe.difficulty}</Text>
        <Text>Рейтинг: {recipe.rating}</Text>
        <Text>ID рецепта: {id}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 260,
  },

  content: {
    padding: 20,
    gap: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

import { useLocalSearchParams } from 'expo-router';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useRecipe } from '../../hooks/useRecipe';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { recipe, loading, error } = useRecipe(id);

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

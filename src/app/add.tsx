import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { RecipeForm } from '../components/recipe-form';

export default function AddRecipeScreen() {
  const router = useRouter();

  function handleAddRecipe(
    name: string,
    cuisine: string,
    difficulty: string
  ) {
    // Пока не сохраняем рецепт между экранами
    router.back();
  }

  return (
    <View style={styles.container}>
      <RecipeForm onAddRecipe={handleAddRecipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

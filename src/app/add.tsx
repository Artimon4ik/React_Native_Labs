import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { RecipeForm } from '../components/recipe-form';
import { useRecipes } from '../context/RecipeContext';

export default function AddRecipeScreen() {
  const router = useRouter();
  const { addRecipe } = useRecipes();

  function handleAddRecipe(
    name: string,
    cuisine: string,
    difficulty: string
  ) {
    addRecipe(name, cuisine, difficulty);
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

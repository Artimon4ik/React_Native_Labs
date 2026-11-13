import { Stack } from 'expo-router';
import { RecipeProvider } from '../context/RecipeContext';

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="recipes/[id]"
          options={{ title: 'Подробности рецепта' }}
        />

        <Stack.Screen
          name="add"
          options={{ title: 'Добавить рецепт' }}
        />
      </Stack>
    </RecipeProvider>
  );
}

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
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
        options={{
          title: 'Добавить рецепт',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}

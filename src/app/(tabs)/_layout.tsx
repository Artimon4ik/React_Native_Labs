import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Рецепты',
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="my-recipes"
        options={{
          title: 'Мои рецепты',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

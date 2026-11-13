
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecipeCard } from '../../components/recipe-card';
import { useRecipes } from '../../context/RecipeContext';

export default function MyRecipesScreen() {
  const { localRecipes } = useRecipes();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={localRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} />
        )}
        contentContainerStyle={styles.content}

        ListHeaderComponent={
          <Text style={styles.title}>
            Мои рецепты
          </Text>
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Вы ещё не добавили ни одного рецепта
            </Text>
          </View>
        }

        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  content: {
    padding: 16,
    flexGrow: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  emptyText: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
  },

  separator: {
    height: 8,
  },
});

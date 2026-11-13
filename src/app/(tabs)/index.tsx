import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecipeCard } from '../../components/recipe-card';
import { useRecipes } from '../../hooks/useRecipes';

export default function HomeScreen() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { recipes, total, loading, error, pageSize } = useRecipes(page);

  const totalPages = Math.ceil(total / pageSize);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={loading || error ? [] : filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} />
        )}
        contentContainerStyle={styles.content}

        ListHeaderComponent={
          <View>
            <Text style={styles.title}>
              Каталог рецептов
            </Text>

            <Pressable
              style={styles.addButton}
              onPress={() => router.push('/add')}
            >
              <Text style={styles.addButtonText}>
                + Добавить рецепт
              </Text>
            </Pressable>

            <TextInput
              style={styles.searchInput}
              placeholder="Поиск рецептов..."
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
            />
          </View>
        }

        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              style={styles.loader}
            />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <Text style={styles.empty}>
              Рецепты не найдены
            </Text>
          )
        }

        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}

        ListFooterComponent={
          <View style={styles.pagination}>
            <Pressable
              style={[
                styles.button,
                (page === 1 || loading) &&
                  styles.buttonDisabled,
              ]}
              disabled={page === 1 || loading}
              onPress={() => setPage((prev) => prev - 1)}
            >
              <Text style={styles.buttonText}>
                Назад
              </Text>
            </Pressable>

            <Text style={styles.pageText}>
              Страница {page} / {totalPages}
            </Text>

            <Pressable
              style={[
                styles.button,
                (page >= totalPages || loading) &&
                  styles.buttonDisabled,
              ]}
              disabled={page >= totalPages || loading}
              onPress={() => setPage((prev) => prev + 1)}
            >
              <Text style={styles.buttonText}>
                Далее
              </Text>
            </Pressable>
          </View>
        }
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

  addButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  loader: {
    marginVertical: 30,
  },

  error: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 30,
    color: 'red',
  },

  empty: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 30,
  },

  separator: {
    height: 8,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#333333',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  pageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

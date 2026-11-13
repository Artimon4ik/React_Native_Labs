
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

import type { Recipe } from '../../components/recipe-card';
import { RecipeCard } from '../../components/recipe-card';
import { useRecipes } from '../../context/RecipeContext';

type RecipesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};

const PAGE_SIZE = 10;

export default function HomeScreen() {
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { localRecipes } = useRecipes();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Объединяем локальные рецепты и рецепты из API
  const allRecipes = [...localRecipes, ...recipes];

  // Фильтрация по поисковой строке
  const filteredRecipes = allRecipes.filter((recipe) =>
    recipe.name
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  // Данные, которые передаём в FlatList
  const visibleRecipes =
    loading || error
      ? localRecipes.filter((recipe) =>
          recipe.name
            .toLowerCase()
            .includes(search.toLowerCase().trim())
        )
      : filteredRecipes;

  // Загрузка рецептов из API
  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipes() {
      setLoading(true);
      setError(null);

      try {
        const skip = (page - 1) * PAGE_SIZE;

        const response = await fetch(
          `https://dummyjson.com/recipes?limit=${PAGE_SIZE}&skip=${skip}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: RecipesResponse = await response.json();

        if (!controller.signal.aborted) {
          setRecipes(data.recipes);
          setTotal(data.total);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Не удалось получить рецепты');
          setRecipes([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => controller.abort();
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={visibleRecipes}
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

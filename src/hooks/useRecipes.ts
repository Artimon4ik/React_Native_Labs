import { useEffect, useState } from 'react';
import { getRecipes } from '../api/recipesApi';
import type { Recipe } from '../types/recipe';

const PAGE_SIZE = 10;

export function useRecipes(page: number) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipes(
          page,
          PAGE_SIZE,
          controller.signal
        );

        if (controller.signal.aborted) return;

        setRecipes(data.recipes);
        setTotal(data.total);
      } catch (e) {
        if (controller.signal.aborted) return;

        setError('Не удалось загрузить рецепты');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => controller.abort();
  }, [page]);

  return {
    recipes,
    total,
    loading,
    error,
    pageSize: PAGE_SIZE,
  };
}

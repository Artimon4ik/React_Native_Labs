import { useEffect, useState } from 'react';
import { getRecipe } from '../api/recipesApi';
import type { Recipe } from '../types/recipe';

export function useRecipe(id: string | undefined) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        setRecipe(null);

        const recipeId = Number(id);

        if (!id || !Number.isInteger(recipeId) || recipeId <= 0) {
          throw new Error('Некорректный ID рецепта');
        }

        const data = await getRecipe(recipeId, controller.signal);

        if (controller.signal.aborted) return;

        setRecipe(data);
      } catch (e) {
        if (controller.signal.aborted) return;

        setError('Не удалось загрузить рецепт');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => controller.abort();
  }, [id]);

  return { recipe, loading, error };
}

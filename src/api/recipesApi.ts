import type { Recipe, RecipesResponse } from '../types/recipe';

const BASE_URL = 'https://dummyjson.com/recipes';

export async function getRecipes(
  page: number,
  pageSize: number,
  signal?: AbortSignal,
): Promise<RecipesResponse> {
  const skip = (page - 1) * pageSize;

  const response = await fetch(
    `${BASE_URL}?limit=${pageSize}&skip=${skip}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function getRecipe(
  id: number,
  signal?: AbortSignal,
): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/${id}`, { signal });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

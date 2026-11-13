import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';

import type { Recipe } from '../components/recipe-card';

type RecipeContextType = {
  localRecipes: Recipe[];
  addRecipe: (
    name: string,
    cuisine: string,
    difficulty: string
  ) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(
  undefined
);

export function RecipeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [localRecipes, setLocalRecipes] = useState<Recipe[]>([]);

  function addRecipe(
    name: string,
    cuisine: string,
    difficulty: string
  ) {
    const newRecipe: Recipe = {
      id: Date.now(),
      name,
      cuisine,
      difficulty,
      image: '',
      rating: 0,
    };

    setLocalRecipes((prev) => [newRecipe, ...prev]);
  }

  return (
    <RecipeContext.Provider value={{ localRecipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error('useRecipes должен использоваться внутри RecipeProvider');
  }

  return context;
}

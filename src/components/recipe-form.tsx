import { useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

type RecipeFormProps = {
  onAddRecipe: (
    name: string,
    cuisine: string,
    difficulty: string
  ) => void;
};

export function RecipeForm({ onAddRecipe }: RecipeFormProps) {
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [difficulty, setDifficulty] = useState('');

  function handleSubmit() {
    if (
      !name.trim() ||
      !cuisine.trim() ||
      !difficulty.trim()
    ) {
      Alert.alert(
        'Ошибка',
        'Пожалуйста, заполните все поля'
      );
      return;
    }

    onAddRecipe(
      name.trim(),
      cuisine.trim(),
      difficulty.trim()
    );

    setName('');
    setCuisine('');
    setDifficulty('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Добавить свой рецепт
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Название рецепта"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Кухня (например, Italian)"
        value={cuisine}
        onChangeText={setCuisine}
      />

      <TextInput
        style={styles.input}
        placeholder="Сложность (например, Easy)"
        value={difficulty}
        onChangeText={setDifficulty}
      />

      <Pressable
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Добавить рецепт
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#333333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

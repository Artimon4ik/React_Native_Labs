import { StyleSheet, Text, View } from 'react-native';

export default function MyRecipesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мои рецепты</Text>

      <Text style={styles.description}>
        Здесь позже появятся добавленные рецепты.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

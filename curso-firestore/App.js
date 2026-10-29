import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CursoScreen from './src/screens/CursoScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Estilizar a tela conforme protótipos</Text>
      <CursoScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

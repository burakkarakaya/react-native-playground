import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// helper
import { SafeAreaView } from 'react-native-safe-area-context';

// screens
import FormExample from '@/screens/form';

export default function App() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <FormExample />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

import { StyleSheet } from "react-native";

// Stil tanımlamaları
const styles = StyleSheet.create({
  infoBox: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorBox: {
    backgroundColor: '#fee2e2', // Açık kırmızı arka plan
    borderColor: '#f87171',
    borderWidth: 1,
  },
  successBox: {
    backgroundColor: '#dcfce7', // Açık yeşil arka plan
    borderColor: '#86efac',
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
  },
  errorText: {
    color: '#b91c1c', // Koyu kırmızı metin
  },
  successText: {
    color: '#16a34a', // Koyu yeşil metin
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
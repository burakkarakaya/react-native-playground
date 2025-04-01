import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2563eb', // Varsayılan mavi renk
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    }
});

export default styles;
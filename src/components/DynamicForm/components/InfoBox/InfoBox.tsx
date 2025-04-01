import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

// types
import { IInfoBoxProps } from "../../types";

// styles
import styles from "./style";

// InfoBox bileşeni - Hata ve başarı mesajlarını göstermek için
const InfoBox: React.FC<IInfoBoxProps> = ({
    text,
    status,
    onClose,
    style,
    textStyle
}) => {
    return (
        <View style={[
            styles.infoBox,
            status === 'error' ? styles.errorBox : styles.successBox,
            style
        ]}>
            <Text style={[
                styles.infoText,
                status === 'error' ? styles.errorText : styles.successText,
                textStyle
            ]}>
                {text}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
        </View>
    );
};

export { InfoBox };
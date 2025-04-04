import { Text, View, TextInput } from "react-native";

// context
import { useFormContext, Controller } from "react-hook-form";

// types
import { IFormFieldProps } from "../../types";

// styles
import styles from "./style";

// Text Input Component
const FormField: React.FC<IFormFieldProps> = ({
    name,
    label,
    placeholder,
    secureTextEntry = false,
    multiline = false,
    numberOfLines = 1,
    required = false
}) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <View style={styles.fieldContainer}>
            {label && (
                <Text style={styles.label}>
                    {label} {required && <Text style={styles.requiredMark}>*</Text>}
                </Text>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.input,
                            errors[name] && styles.inputError,
                            multiline && styles.textArea
                        ]}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={secureTextEntry}
                        multiline={multiline}
                        numberOfLines={multiline ? numberOfLines : 1}
                    />
                )}
            />
            {errors[name] && (
                <Text style={styles.errorText}>
                    {errors[name]?.message?.toString() || "Bu alan gereklidir"}
                </Text>
            )}
        </View>
    );
};

export { FormField };
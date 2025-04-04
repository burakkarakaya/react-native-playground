import { Text, View, Switch, Platform } from "react-native";

// context
import { useFormContext, Controller } from "react-hook-form";

// types
import { IFormCheckboxProps } from "../../types";

// styles
import styles from "./style";

const FormCheckbox: React.FC<IFormCheckboxProps> = ({
    name,
    label,
    required = false
}) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>
                {label} {required && <Text style={styles.requiredMark}>*</Text>}
            </Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <View style={styles.checkboxRow}>
                        <Switch
                            value={value || false}
                            onValueChange={onChange}
                            trackColor={{ false: "#d3d3d3", true: "#4285F4" }}
                            thumbColor={Platform.OS === 'android' ? "#f9f9f9" : ""}
                        />
                    </View>
                )}
            />
            {errors[name] && (
                <Text style={styles.errorText}>
                    {errors[name]?.message?.toString()}
                </Text>
            )}
        </View>
    );
};

export { FormCheckbox };
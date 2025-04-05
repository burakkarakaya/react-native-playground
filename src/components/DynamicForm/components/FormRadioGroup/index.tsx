
import { Text, View, TouchableOpacity } from "react-native";

// context
import { useFormContext, Controller } from "react-hook-form";

// types
import { IFormRadioGroupProps } from "../../types";

// styles
import styles from "./style";


const FormRadioGroup: React.FC<IFormRadioGroupProps> = ({
    name,
    label,
    options,
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
                    <>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.radioRow}
                                onPress={() => onChange(option)}
                            >
                                <View style={styles.radioOuterCircle}>
                                    {value === option && <View style={styles.radioInnerCircle} />}
                                </View>
                                <Text style={styles.radioText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </>
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

export { FormRadioGroup };
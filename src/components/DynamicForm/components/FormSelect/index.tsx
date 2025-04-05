import { Text, View, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';

// context
import { useFormContext, Controller } from "react-hook-form";

// types
import { IFormSelectProps } from "../../types";

// styles
import styles from "./style";

// Select / Dropdown Component
const FormSelect: React.FC<IFormSelectProps> = ({
    name,
    label,
    options,
    placeholder = "Seçiniz...",
    required = false,
    search = false,
    multiple = false,
    disabled = false,
    dropdownPosition = 'auto',
    containerStyle,
    placeholderStyle,
    selectedTextStyle,
    inputSearchStyle,
    itemTextStyle,
    activeColor,
    onChange: externalOnChange,
}) => {
    const { control, formState: { errors } } = useFormContext();

    const DropdownComponent = multiple ? MultiSelect : Dropdown;

    return (
        <View style={[styles.fieldContainer, containerStyle]}>
            <Text style={styles.label}>
                {label} {required && <Text style={styles.requiredMark}>*</Text>}
            </Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    const handleChange = (item: any) => {
                        onChange(item);
                        externalOnChange?.(item);
                    };

                    return (
                        <DropdownComponent
                            style={[styles.dropdown, errors[name] && styles.inputError]}
                            placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
                            selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
                            inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
                            itemTextStyle={[styles.itemTextStyle, itemTextStyle]}
                            activeColor={activeColor || styles.activeColor?.color}
                            data={options}
                            search={search}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={placeholder}
                            value={value}
                            onChange={handleChange}
                            disable={disabled}
                            dropdownPosition={dropdownPosition}
                            {...(multiple && {
                                selectedStyle: styles.selectedStyle,
                            })}
                        />
                    );
                }}
            />
            {errors[name] && (
                <Text style={styles.errorText}>
                    {errors[name]?.message?.toString()}
                </Text>
            )}
        </View>
    );
};

export { FormSelect };
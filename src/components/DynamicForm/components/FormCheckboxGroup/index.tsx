import { Text, View, Switch, Platform, TouchableOpacity } from "react-native";

// context
import { useFormContext, Controller } from "react-hook-form";

// types
import { IFormCheckboxGroupProps } from "../../types";

// styles
import styles from "./style";


// Checkbox Group Component
export const FormCheckboxGroup: React.FC<IFormCheckboxGroupProps> = ({ 
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
        render={({ field: { onChange, value = [] } }) => (
          <>
            {options.map((option, index) => {
              const isSelected = Array.isArray(value) && value.includes(option);
              
              const toggleOption = () => {
                let newValues;
                
                if (isSelected) {
                  newValues = value.filter((item: string) => item !== option);
                } else {
                  newValues = [...value, option];
                }
                
                onChange(newValues);
              };
              
              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.checkboxRow}
                  onPress={toggleOption}
                >
                  <Text>{option}</Text>
                  <Switch
                    value={isSelected}
                    onValueChange={toggleOption}
                    trackColor={{ false: "#d3d3d3", true: "#4285F4" }}
                    thumbColor={Platform.OS === 'android' ? "#f9f9f9" : ""}
                  />
                </TouchableOpacity>
              );
            })}
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
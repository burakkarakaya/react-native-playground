//
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

// context
import { useFormContext } from "react-hook-form";
import { useCustomFormContext } from "../../context";

// types
import { IButtonProps } from "../../types";

// styles
import styles from "./style";

const Button: React.FC<IButtonProps> = ({
  style,
  textStyle,
  children,
  loadingColor = '#fff'
}) => {
  const { formState: { isSubmitting } } = useFormContext();
  const { loading, submitForm } = useCustomFormContext();
  const isLoading = isSubmitting || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.buttonDisabled, style]}
      disabled={isLoading}
      onPress={submitForm} // Context'ten gelen submitForm metodunu kullan
    >
      {isLoading ? (
        <ActivityIndicator color={loadingColor} size="small" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export { Button };
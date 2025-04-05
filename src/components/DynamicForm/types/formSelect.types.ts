import { StyleProp, ViewStyle, TextStyle } from "react-native";

interface ISelectOption {
    label: string;
    value: string | number;
}

interface IFormSelectProps {
    name: string;
    label: string;
    options: ISelectOption[];
    placeholder?: string;
    required?: boolean;
    search?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    dropdownPosition?: 'auto' | 'top' | 'bottom';
    containerStyle?: StyleProp<ViewStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    selectedTextStyle?: StyleProp<TextStyle>;
    inputSearchStyle?: StyleProp<TextStyle>;
    itemTextStyle?: StyleProp<TextStyle>;
    activeColor?: string;
    onChange?: (value: any) => void;
}

export { IFormSelectProps };
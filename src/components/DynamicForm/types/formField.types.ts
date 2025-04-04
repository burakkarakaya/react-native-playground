// Form field props interface
interface IFormFieldProps {
    name: string;
    label?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    required?: boolean;
}

export { IFormFieldProps };
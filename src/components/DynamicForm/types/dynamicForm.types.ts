// form
import { z } from "zod";

// types
import { IInfoBoxProps } from "./infobox.types";
import { IButtonProps } from "./button.types";

interface IFormProps {
    schema: z.ZodSchema<any>;
    endpoint?: string; // API endpoint
    onSuccess?: (data: any) => void; // Başarılı sonuç callback'i
    onError?: (error: string) => void; // Hata callback'i
    children: React.ReactNode;
    style?: any; // React Native stil objesi
    defaultValues?: Record<string, any>; // Formun başlangıç değerleri
    resetOnSuccess?: boolean; // Başarılı gönderimlerde formu sıfırlama
    successMessage?: string; // Başarı mesajı
    customErrorMessage?: string; // Özel hata mesajı
    dryRun?: boolean; // Test modu (API'ye gönderim yapmaz)
}

interface IDynamicFormProps extends React.FC<IFormProps> {
    Button: React.FC<IButtonProps>;
    ErrorMessageInfoBox: React.FC<Pick<IInfoBoxProps, 'style' | 'textStyle'>>;
    SuccessMessageInfoBox: React.FC<Pick<IInfoBoxProps, 'style' | 'textStyle'>>;
}

export { IDynamicFormProps };
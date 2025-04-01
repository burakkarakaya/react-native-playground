// DynamicForm.tsx
// Bu bileşen, React Native için esnek, modüler ve performanslı bir form bileşenidir.
// onSubmit işlemi React Native'e uygun şekilde düzeltilmiştir.

import React, { ReactNode, useState, useCallback, createContext, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

// form işlemleri için
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Tip tanımlamaları
interface FormContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  success: string;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  submitForm: () => Promise<void>; // Form gönderimi için metod eklendi
}

// Form durumunu paylaşmak için context
const CustomFormContext = createContext<FormContextProps | undefined>(undefined);

// Context hook'u
const useCustomFormContext = () => {
  const context = useContext(CustomFormContext);
  if (!context) {
    throw new Error("useCustomFormContext must be used within a CustomFormProvider");
  }
  return context;
};

// Ana form bileşeni props'ları
interface DynamicFormProps {
  schema: z.ZodSchema<any>;
  endpoint?: string; // API endpoint
  onSuccess?: (data: any) => void; // Başarılı sonuç callback'i
  onError?: (error: string) => void; // Hata callback'i
  children: ReactNode;
  style?: any; // React Native stil objesi
  defaultValues?: Record<string, any>; // Formun başlangıç değerleri
  resetOnSuccess?: boolean; // Başarılı gönderimlerde formu sıfırlama
  successMessage?: string; // Başarı mesajı
  customErrorMessage?: string; // Özel hata mesajı
  dryRun?: boolean; // Test modu (API'ye gönderim yapmaz)
}

// Alt bileşenler için tip tanımlamaları
interface ButtonProps {
  style?: any;
  textStyle?: any;
  children?: ReactNode;
  loadingColor?: string;
}

interface InfoBoxProps {
  style?: any;
  textStyle?: any;
}

// DynamicForm bileşeni için genişletilmiş interface
interface DynamicFormComponent extends React.FC<DynamicFormProps> {
  Button: React.FC<ButtonProps>;
  ErrorInfoBox: React.FC<InfoBoxProps>;
  SuccessMessageInfoBox: React.FC<InfoBoxProps>;
}

// InfoBox bileşeni - Hata ve başarı mesajlarını göstermek için
const InfoBox = ({ 
  text, 
  status, 
  onClose,
  style,
  textStyle
}: { 
  text: string, 
  status: 'error' | 'info', 
  onClose: () => void,
  style?: any,
  textStyle?: any
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

// Button bileşeni - Form gönderme butonu
const Button: React.FC<ButtonProps> = ({ 
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

// ErrorInfoBox bileşeni - Hata mesajlarını gösterir
const ErrorInfoBox: React.FC<InfoBoxProps> = ({ style, textStyle }) => {
  const { error, setError } = useCustomFormContext();

  return error ? (
    <InfoBox
      style={style}
      textStyle={textStyle}
      text={error}
      status="error"
      onClose={() => setError("")}
    />
  ) : null;
};

// SuccessMessageInfoBox bileşeni - Başarı mesajlarını gösterir
const SuccessMessageInfoBox: React.FC<InfoBoxProps> = ({ style, textStyle }) => {
  const { success, setSuccess } = useCustomFormContext();

  return success ? (
    <InfoBox
      style={style}
      textStyle={textStyle}
      text={success}
      status="info"
      onClose={() => setSuccess("")}
    />
  ) : null;
};

// Ana DynamicForm bileşeni
const DynamicForm: DynamicFormComponent = ({
  schema,
  endpoint,
  onSuccess,
  onError,
  children,
  style,
  defaultValues = {},
  resetOnSuccess = false,
  successMessage = '',
  customErrorMessage = '',
  dryRun = false,
}) => {
  // State tanımlamaları
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Zod şeması tipini belirle
  type TSchema = z.infer<typeof schema>;

  // Form işleyicisini oluştur
  const formMethods = useForm<TSchema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues
  });

  const { handleSubmit, formState: { errors }, reset } = formMethods;

  // defaultValues değiştiğinde formu güncelle
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // Form gönderim işleyicisi
  const onSubmit = useCallback(async (data: any) => {
    // Dry run modunda sadece onSuccess çağrılır, API'ye gönderim yapılmaz
    if (dryRun) {
      console.log("Dry run mode, data:", data);
      onSuccess?.(data);
      return;
    }

    try {
      // Endpoint kontrolü
      if (!endpoint) {
        throw new Error('DynamicForm bileşeni için endpoint gerekli, ancak sağlanmadı.');
      }
  
      setLoading(true);
      setError("");

      // API isteği gönder
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      // Başarılı sonuç işleme
      if (response.ok && result.isSuccess) {
        onSuccess?.(result.data);
        
        if (successMessage) {
          setSuccess(successMessage);
        }
        
        // Başarılı gönderimlerde formu sıfırla
        if (resetOnSuccess) {
          reset();
          // Form sıfırlandıktan sonra hata mesajlarını temizle
          setTimeout(() => {
            formMethods.clearErrors();
          }, 1);
        }
      } else {
        // Hata mesajı işleme
        const errorMessage = result?.error?.message || result?.errorMessage || customErrorMessage || "Bir hata oluştu";
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (error) {
      // İstisna işleme
      const errorMessage = error instanceof Error ? error.message || customErrorMessage : "Bir hata oluştu";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpoint, onError, onSuccess, resetOnSuccess, reset, successMessage, dryRun, customErrorMessage]);

  // Form gönderme işlemini tetikleyen metod
  const submitForm = useCallback(async () => {
    return handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return (
    <CustomFormContext.Provider value={{ 
      loading, 
      setLoading, 
      error, 
      setError, 
      success, 
      setSuccess,
      submitForm // Context'e submitForm metodunu ekle
    }}>
      <FormProvider {...formMethods}>
        <View style={[styles.container, style]}>
          {/* Form içeriği (field'lar, butonlar vb.) */}
          {children}
        </View>
      </FormProvider>
    </CustomFormContext.Provider>
  );
};

// Stil tanımlamaları
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    backgroundColor: '#2563eb', // Varsayılan mavi renk
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  infoBox: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorBox: {
    backgroundColor: '#fee2e2', // Açık kırmızı arka plan
    borderColor: '#f87171',
    borderWidth: 1,
  },
  successBox: {
    backgroundColor: '#dcfce7', // Açık yeşil arka plan
    borderColor: '#86efac',
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
  },
  errorText: {
    color: '#b91c1c', // Koyu kırmızı metin
  },
  successText: {
    color: '#16a34a', // Koyu yeşil metin
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Bileşen display adları
DynamicForm.displayName = 'DynamicForm';
Button.displayName = 'DynamicForm.Button';
ErrorInfoBox.displayName = 'DynamicForm.ErrorInfoBox';
SuccessMessageInfoBox.displayName = 'DynamicForm.SuccessMessageInfoBox';

// Alt bileşenleri ana bileşene bağla
DynamicForm.Button = Button;
DynamicForm.ErrorInfoBox = ErrorInfoBox;
DynamicForm.SuccessMessageInfoBox = SuccessMessageInfoBox;

// Form için özel hooks
export { useFormContext, useCustomFormContext };

export default DynamicForm;
// FormExample.tsx
// Örnek bir form uygulaması

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { z } from 'zod';
import DynamicForm, { useFormContext } from '@/components/DynamicForm';

// Form alanı bileşeni
const FormField = ({ 
  name,
  label,
  placeholder,
  secureTextEntry = false
}: { 
  name: string; 
  label: string; 
  placeholder?: string;
  secureTextEntry?: boolean;
}) => {
  const { register, setValue, formState: { errors } } = useFormContext();

  // React Hook Form ile entegrasyon
  React.useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[name] && styles.inputError]}
        placeholder={placeholder}
        onChangeText={(text) => setValue(name, text, { shouldValidate: true })}
        secureTextEntry={secureTextEntry}
      />
      {errors[name] && (
        <Text style={styles.errorText}>
          {errors[name]?.message?.toString() || "Bu alan gereklidir"}
        </Text>
      )}
    </View>
  );
};

// Form şeması
const formSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

// Ana uygulama
const FormExample = () => {
  const handleSuccess = (data: any) => {
    console.log("Form başarıyla gönderildi:", data);
  };

  const handleError = (error: string) => {
    console.error("Form gönderim hatası:", error);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kullanıcı Girişi</Text>
      
      <DynamicForm
        schema={formSchema}
        endpoint="https://api.example.com/login"
        onSuccess={handleSuccess}
        onError={handleError}
        resetOnSuccess={true}
        successMessage="Giriş başarılı!"
        defaultValues={{
          email: "",
          password: ""
        }}
      >
        <FormField 
          name="email" 
          label="E-posta Adresi" 
          placeholder="ornek@mail.com" 
        />
        
        <FormField 
          name="password" 
          label="Şifre" 
          placeholder="Şifrenizi girin" 
          secureTextEntry={true} 
        />
        
        {/* Form durumu bilgilendirmeleri */}
        <DynamicForm.ErrorInfoBox style={styles.infoBox} />
        <DynamicForm.SuccessMessageInfoBox style={styles.infoBox} />
        
        {/* Gönderme butonu */}
        <DynamicForm.Button style={styles.submitButton}>
          Giriş Yap
        </DynamicForm.Button>
      </DynamicForm>
    </ScrollView>
  );
};

// Stiller
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: '#3b82f6',
  },
  infoBox: {
    marginBottom: 12,
  },
});

export default FormExample;
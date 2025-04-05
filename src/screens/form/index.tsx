// FormExample.tsx
// Örnek bir form uygulaması

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { z } from 'zod';
import { DynamicForm, FormField, FormCheckbox, FormCheckboxGroup, FormRadioGroup, FormSelect } from '@/components/DynamicForm';

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

  const interestOptions = [
    "Teknoloji",
    "Spor",
    "Müzik",
    "Sanat",
    "Seyahat"
  ];

  const genderOptions = [
    { label: "Erkek", value: "male" },
    { label: "Kadın", value: "female" },
    { label: "Diğer", value: "other" },
  ];

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
          password: "",
          rememberMe: true,
          interests: ["Seyahat"]
        }}
      >

        {/* Form Field */}

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

        {/* Form Checkbox */}
        <FormCheckbox
          name="rememberMe"
          label="Beni Hatırla"
        />

        {/* Form Checkbox Group */}
        <FormCheckboxGroup
          name="interests"
          label="İlgi Alanları"
          options={interestOptions}
          required
        />

        {/* Form Radio Group */}
        <FormRadioGroup
          name="notification"
          label="Bildirim Tercihleri"
          options={["E-posta", "SMS", "Uygulama Bildirimleri"]}
        />

        {/* Form Select */}
        <FormSelect
          name="gender"
          label="Cinsiyet"
          options={genderOptions}
          required
          dropdownPosition="top"
        />

        <FormSelect
          name="interests"
          label="İlgi Alanları"
          multiple
          options={[
            { label: 'Spor', value: 'sports' },
            { label: 'Müzik', value: 'music' },
            { label: 'Sanat', value: 'art' }
          ]}
          placeholder="İlgi alanlarınızı seçiniz"
        />

        <FormSelect
          name="city"
          label="Şehir"
          options={[
            { label: 'İstanbul', value: '34' },
            { label: 'Ankara', value: '06' },
            { label: 'İzmir', value: '35' }
          ]}
          search
          placeholder="Şehir ara..."
        />

        {/* Form durumu bilgilendirmeleri */}
        <DynamicForm.ErrorMessageInfoBox style={styles.infoBox} />
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
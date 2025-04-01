import React, { useState, useCallback, useEffect } from "react";

//
import { View } from "react-native";

// context
import { CustomFormContext } from "./context";

// types
import { IDynamicFormProps } from "./types";

// components
import { ErrorMessageInfoBox, SuccessMessageInfoBox, Button } from "./components";

// form
import { useFormContext, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const DynamicForm: IDynamicFormProps = ({
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
                <View style={[style]}>
                    {/* Form içeriği (field'lar, butonlar vb.) */}
                    {children}
                </View>
            </FormProvider>
        </CustomFormContext.Provider>
    );
};

// Bileşen display adları
DynamicForm.displayName = 'DynamicForm';
Button.displayName = 'DynamicForm.Button';
ErrorMessageInfoBox.displayName = 'DynamicForm.ErrorMessageInfoBox';
SuccessMessageInfoBox.displayName = 'DynamicForm.SuccessMessageInfoBox';

// Alt bileşenleri ana bileşene bağla
DynamicForm.Button = Button;
DynamicForm.ErrorMessageInfoBox = ErrorMessageInfoBox;
DynamicForm.SuccessMessageInfoBox = SuccessMessageInfoBox;

export { DynamicForm, useFormContext };
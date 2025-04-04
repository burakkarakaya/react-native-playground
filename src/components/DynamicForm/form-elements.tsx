import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useFormContext, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

// === TYPE DEFINITIONS ===

// Form field props interface
interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  required?: boolean;
}

// Checkbox props interface
interface FormCheckboxProps {
  name: string;
  label: string;
  required?: boolean;
}

// Checkbox group props interface
interface FormCheckboxGroupProps {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}

// Radio group props interface
interface FormRadioGroupProps {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}

// Select option interface
interface SelectOption {
  label: string;
  value: string | number;
}

// Select props interface
interface FormSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

// File type for file upload
type FileType = 'all' | 'images' | 'documents';

// File upload props interface
interface FormFileUploadProps {
  name: string;
  label: string;
  multiple?: boolean;
  fileType?: FileType;
  required?: boolean;
}

// Date picker props interface
interface FormDatePickerProps {
  name: string;
  label: string;
  mode?: 'date' | 'time' | 'datetime';
  required?: boolean;
}

// Slider props interface
interface FormSliderProps {
  name: string;
  label: string;
  minimum?: number;
  maximum?: number;
  step?: number;
  required?: boolean;
}

// File structure for uploaded files
interface FileInfo {
  uri: string;
  name?: string;
  type?: string;
  size?: number;
}

// === COMPONENT IMPLEMENTATIONS ===

// Text Input Component
export const FormField: React.FC<FormFieldProps> = ({ 
  name,
  label,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input, 
              errors[name] && styles.inputError,
              multiline && styles.textArea
            ]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>
          {errors[name]?.message?.toString() || "Bu alan gereklidir"}
        </Text>
      )}
    </View>
  );
};

// Checkbox Component
export const FormCheckbox: React.FC<FormCheckboxProps> = ({ 
  name, 
  label,
  required = false
}) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <View style={styles.checkboxContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.requiredMark}>*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxRow}>
            <Switch
              value={value || false}
              onValueChange={onChange}
              trackColor={{ false: "#d3d3d3", true: "#4285F4" }}
              thumbColor={Platform.OS === 'android' ? "#f9f9f9" : ""}
            />
          </View>
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

// Checkbox Group Component
export const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({ 
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

// Radio Group Component
export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({ 
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
        render={({ field: { onChange, value } }) => (
          <>
            {options.map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.radioRow}
                onPress={() => onChange(option)}
              >
                <View style={styles.radioOuterCircle}>
                  {value === option && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.radioText}>{option}</Text>
              </TouchableOpacity>
            ))}
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

// Select / Dropdown Component
export const FormSelect: React.FC<FormSelectProps> = ({ 
  name, 
  label, 
  options,
  placeholder = "Seçiniz...",
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
        render={({ field: { onChange, value } }) => (
          <View style={[styles.pickerContainer, errors[name] && styles.inputError]}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label={placeholder} value="" />
              {options.map((option, index) => (
                <Picker.Item key={index} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
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

// File Upload Component
export const FormFileUpload: React.FC<FormFileUploadProps> = ({ 
  name, 
  label, 
  multiple = false,
  fileType = "all",
  required = false
}) => {
  const { control, formState: { errors } } = useFormContext();
  const [loading, setLoading] = useState(false);

  const pickFile = async (onChange: (files: FileInfo[]) => void, currentFiles: FileInfo[]) => {
    setLoading(true);
    try {
      let result;
      
      if (fileType === "images") {
        // Image picker for photos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("Fotoğraf erişim izni gereklidir!");
          setLoading(false);
          return;
        }
        
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: multiple,
          quality: 0.8,
        });
      } else {
        // Document picker for other file types
        result = await DocumentPicker.getDocumentAsync({
          type: "*/*",
          multiple,
        });
      }
      
      if (!result.canceled) {
        const selectedFiles = multiple 
          ? result.assets.map(asset => ({
              uri: asset.uri,
              name: asset.fileName || asset.uri.split('/').pop() || 'file',
              type: asset.mimeType || 'application/octet-stream',
              size: asset.fileSize
            }))
          : [{
              uri: result.assets[0].uri,
              name: result.assets[0].fileName || result.assets[0].uri.split('/').pop() || 'file',
              type: result.assets[0].mimeType || 'application/octet-stream',
              size: result.assets[0].fileSize
            }];
        
        onChange(multiple ? [...currentFiles, ...selectedFiles] : selectedFiles);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.requiredMark}>*</Text>}
      </Text>
      
      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ field: { onChange, value = [] } }) => (
          <>
            <TouchableOpacity 
              style={[styles.fileUploadButton, errors[name] && styles.inputError]} 
              onPress={() => pickFile(onChange, value)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Text style={styles.fileUploadButtonText}>
                  {multiple ? "Dosyaları Seç" : "Dosya Seç"}
                </Text>
              )}
            </TouchableOpacity>
            
            {value.length > 0 && (
              <View style={styles.filePreviewContainer}>
                {value.map((file: FileInfo, index: number) => (
                  <View key={index} style={styles.filePreview}>
                    {file.type && file.type.startsWith('image/') ? (
                      <Image source={{ uri: file.uri }} style={styles.imagePreview} />
                    ) : (
                      <View style={styles.documentPreview}>
                        <Text style={styles.documentName} numberOfLines={1}>
                          {file.name || file.uri.split('/').pop()}
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity 
                      style={styles.removeFileButton} 
                      onPress={() => {
                        const newFiles = [...value];
                        newFiles.splice(index, 1);
                        onChange(newFiles);
                      }}
                    >
                      <Text style={styles.removeFileButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
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

// Date Picker Component
export const FormDatePicker: React.FC<FormDatePickerProps> = ({ 
  name, 
  label,
  mode = "date",
  required = false
}) => {
  const { control, formState: { errors } } = useFormContext();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.requiredMark}>*</Text>}
      </Text>
      
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const date = value ? new Date(value) : new Date();
          
          const formatDate = (date: Date) => {
            if (mode === 'date') {
              return date.toLocaleDateString();
            } else if (mode === 'time') {
              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
              return date.toLocaleString();
            }
          };
          
          return (
            <>
              <TouchableOpacity 
                style={[styles.datePickerButton, errors[name] && styles.inputError]}
                onPress={() => setShowPicker(true)}
              >
                <Text style={styles.datePickerText}>
                  {value ? formatDate(date) : "Tarih Seçiniz"}
                </Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowPicker(Platform.OS === 'ios');
                    if (event.type === 'set' && selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
            </>
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

// Slider Component
export const FormSlider: React.FC<FormSliderProps> = ({ 
  name, 
  label,
  minimum = 0,
  maximum = 100,
  step = 1,
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
        render={({ field: { onChange, value = minimum } }) => (
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={minimum}
              maximumValue={maximum}
              step={step}
              value={value}
              onValueChange={onChange}
              minimumTrackTintColor="#4285F4"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#4285F4"
            />
            <Text style={styles.sliderValue}>{value}</Text>
          </View>
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

// Complete Form example
export const DynamicForm: React.FC<{
  onSubmit: (data: any) => void;
  defaultValues?: any;
  schema?: any;
  children: React.ReactNode;
}> = ({ onSubmit, defaultValues = {}, schema, children }) => {
  const methods = useForm({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined
  });

  return (
    <FormProvider {...methods}>
      <ScrollView style={styles.container}>
        {children}
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={methods.handleSubmit(onSubmit)}
        >
          <Text style={styles.submitButtonText}>Gönder</Text>
        </TouchableOpacity>
      </ScrollView>
    </FormProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  requiredMark: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  radioOuterCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#4285F4',
  },
  radioText: {
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  fileUploadButton: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  fileUploadButtonText: {
    color: '#4285F4',
    fontWeight: '500',
  },
  filePreviewContainer: {
    marginTop: 8,
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#f8f9fa',
  },
  imagePreview: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 4,
  },
  documentPreview: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
  },
  removeFileButton: {
    padding: 4,
  },
  removeFileButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
  },
  datePickerText: {
    fontSize: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    minWidth: 40,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#4285F4',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

// Example validation schema using Zod
export const createSampleValidationSchema = () => {
  return z.object({
    name: z.string().min(1, "İsim gereklidir"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    confirmPassword: z.string(),
    gender: z.string().min(1, "Cinsiyet seçiniz"),
    interests: z.array(z.string()).min(1, "En az bir ilgi alanı seçiniz"),
    agreeTerms: z.boolean().refine(val => val === true, {
      message: "Koşulları kabul etmelisiniz",
    }),
    birthDate: z.date().optional(),
    avatarImage: z.array(z.object({
      uri: z.string(),
      name: z.string().optional(),
      type: z.string().optional(),
      size: z.number().optional(),
    })).optional(),
    experienceLevel: z.number().min(0).max(100),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });
};

// Example usage of the form components
export const ExampleForm: React.FC = () => {
  const schema = createSampleValidationSchema();

  const handleSubmit = (data: any) => {
    console.log("Form data:", data);
    // Process form data here
  };

  const genderOptions = [
    { label: "Erkek", value: "male" },
    { label: "Kadın", value: "female" },
    { label: "Diğer", value: "other" },
  ];

  const interestOptions = [
    "Teknoloji",
    "Spor",
    "Müzik",
    "Sanat",
    "Seyahat"
  ];

  return (
    <DynamicForm 
      onSubmit={handleSubmit}
      schema={schema}
      defaultValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        interests: [],
        agreeTerms: false,
        birthDate: new Date(),
        avatarImage: [],
        experienceLevel: 50,
      }}
    >
      <FormField
        name="name"
        label="İsim"
        placeholder="İsminizi giriniz"
        required
      />
      
      <FormField
        name="email"
        label="E-posta"
        placeholder="E-posta adresinizi giriniz"
        required
      />
      
      <FormField
        name="password"
        label="Şifre"
        placeholder="Şifrenizi giriniz"
        secureTextEntry
        required
      />
      
      <FormField
        name="confirmPassword"
        label="Şifre Tekrar"
        placeholder="Şifrenizi tekrar giriniz"
        secureTextEntry
        required
      />
      
      <FormField
        name="bio"
        label="Hakkında"
        placeholder="Kendiniz hakkında kısa bilgi"
        multiline
        numberOfLines={4}
      />
      
      <FormSelect
        name="gender"
        label="Cinsiyet"
        options={genderOptions}
        required
      />
      
      <FormCheckboxGroup
        name="interests"
        label="İlgi Alanları"
        options={interestOptions}
        required
      />
      
      <FormRadioGroup
        name="notification"
        label="Bildirim Tercihleri"
        options={["E-posta", "SMS", "Uygulama Bildirimleri"]}
      />
      
      <FormDatePicker
        name="birthDate"
        label="Doğum Tarihi"
      />
      
      <FormSlider
        name="experienceLevel"
        label="Deneyim Seviyesi"
        minimum={0}
        maximum={100}
        step={1}
      />
      
      <FormFileUpload
        name="avatarImage"
        label="Profil Resmi"
        fileType="images"
      />
      
      <FormFileUpload
        name="documents"
        label="Belgeler"
        multiple
        fileType="documents"
      />
      
      <FormCheckbox
        name="agreeTerms"
        label="Kullanım koşullarını kabul ediyorum"
        required
      />
    </DynamicForm>
  );
};
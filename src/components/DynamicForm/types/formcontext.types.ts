interface IFormContextProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    success: string;
    setSuccess: React.Dispatch<React.SetStateAction<string>>;
    submitForm: () => Promise<void>; // Form gönderimi için metod eklendi
}

export { IFormContextProps }
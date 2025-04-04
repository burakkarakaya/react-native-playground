import { StyleSheet } from "react-native";

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

export default styles;
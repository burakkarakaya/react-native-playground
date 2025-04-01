interface IInfoBoxProps {
    text: string,
    status: 'error' | 'success',
    onClose: () => void,
    style?: any,
    textStyle?: any
}

export { IInfoBoxProps };
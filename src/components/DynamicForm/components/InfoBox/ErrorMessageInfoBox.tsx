
// context
import { useCustomFormContext } from "../../context";

// components
import { InfoBox } from "./InfoBox";

// types
import { IInfoBoxProps } from "../../types";

// ErrorInfoBox bileşeni - Hata mesajlarını gösterir
const ErrorMessageInfoBox: React.FC<Pick<IInfoBoxProps, 'style' | 'textStyle'>> = ({ style, textStyle }) => {
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

export { ErrorMessageInfoBox };
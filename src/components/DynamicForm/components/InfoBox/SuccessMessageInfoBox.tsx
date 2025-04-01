
// context
import { useCustomFormContext } from "../../context";

// components
import { InfoBox } from "./InfoBox";

// types
import { IInfoBoxProps } from "../../types";

// SuccessMessageInfoBox bileşeni - Başarı mesajlarını gösterir
const SuccessMessageInfoBox: React.FC<Pick<IInfoBoxProps, 'style' | 'textStyle'>> = ({ style, textStyle }) => {
    const { success, setSuccess } = useCustomFormContext();

    return success ? (
        <InfoBox
            style={style}
            textStyle={textStyle}
            text={success}
            status="success"
            onClose={() => setSuccess("")}
        />
    ) : null;
};

export { SuccessMessageInfoBox };
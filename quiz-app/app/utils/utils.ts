
import { Alert } from 'react-native';
export function unescapeHtml(safe: string) {
    return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

export const showConfirmationAlert = ({
    alertTitle,
    alertText,
    confirmText,
    cancelText,
    onPressProceed,
}: {
    alertTitle: string,
    alertText: string,
    confirmText: string,
    cancelText: string,
    onPressProceed: () => void,
}) => {
    const options = [
        { text: confirmText, onPress: onPressProceed },
        { text: cancelText },
    ];
    return Alert.alert(
        alertTitle,
        alertText,
        options,
    );
};
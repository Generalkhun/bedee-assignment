
import { LeaderBoardEntry } from '@/definition/leaderBoard';
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

/**@todo Remove this list and fetch real leader board data */
export const generateMockLeaderBoardData = (numberOfmockingParticipants: number): LeaderBoardEntry[] => {
    return Array.from({ length: numberOfmockingParticipants }, (_, index) => ({
        id: (index + 1).toString(),
        name: `Player ${index + 1}`,
        score: Math.floor(Math.random() * 21), // Random score between 0 and 20
    }))
        .sort((a, b) => b.score - a.score)
};

import { LeaderBoardEntry } from '@/definition/leaderBoard';
import { Alert } from 'react-native';
export function unescapeHtml(safe: string) {
    return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&iexcl;/g, '¡')
        .replace(/&cent;/g, '¢')
        .replace(/&pound;/g, '£')
        .replace(/&curren;/g, '¤')
        .replace(/&yen;/g, '¥')
        .replace(/&brvbar;/g, '¦')
        .replace(/&sect;/g, '§')
        .replace(/&uml;/g, '¨')
        .replace(/&copy;/g, '©')
        .replace(/&ordf;/g, 'ª')
        .replace(/&laquo;/g, '«')
        .replace(/&not;/g, '¬')
        .replace(/&shy;/g, '­')
        .replace(/&reg;/g, '®')
        .replace(/&macr;/g, '¯')
        .replace(/&deg;/g, '°')
        .replace(/&plusmn;/g, '±')
        .replace(/&sup2;/g, '²')
        .replace(/&sup3;/g, '³')
        .replace(/&acute;/g, '´')
        .replace(/&micro;/g, 'µ')
        .replace(/&para;/g, '¶')
        .replace(/&middot;/g, '·')
        .replace(/&cedil;/g, '¸')
        .replace(/&sup1;/g, '¹')
        .replace(/&ordm;/g, 'º')
        .replace(/&raquo;/g, '»')
        .replace(/&frac14;/g, '¼')
        .replace(/&frac12;/g, '½')
        .replace(/&frac34;/g, '¾')
        .replace(/&iquest;/g, '¿')
        .replace(/&times;/g, '×')
        .replace(/&divide;/g, '÷')
        .replace(/&ndash;/g, '–')
        .replace(/&mdash;/g, '—')
        .replace(/&lsquo;/g, '‘')
        .replace(/&rsquo;/g, '’')
        .replace(/&sbquo;/g, '‚')
        .replace(/&ldquo;/g, '“')
        .replace(/&rdquo;/g, '”')
        .replace(/&bdquo;/g, '„')
        .replace(/&dagger;/g, '†')
        .replace(/&Dagger;/g, '‡')
        .replace(/&bull;/g, '•')
        .replace(/&hellip;/g, '…')
        .replace(/&permil;/g, '‰')
        .replace(/&lsaquo;/g, '‹')
        .replace(/&rsaquo;/g, '›')
        .replace(/&oline;/g, '‾')
        .replace(/&euro;/g, '€')
        .replace(/&trade;/g, '™')
        .replace(/&larr;/g, '←')
        .replace(/&uarr;/g, '↑')
        .replace(/&rarr;/g, '→')
        .replace(/&darr;/g, '↓')
        .replace(/&harr;/g, '↔')
        .replace(/&crarr;/g, '↵')
        .replace(/&lceil;/g, '⌈')
        .replace(/&rceil;/g, '⌉')
        .replace(/&lfloor;/g, '⌊')
        .replace(/&rfloor;/g, '⌋')
        .replace(/&loz;/g, '◊')
        .replace(/&spades;/g, '♠')
        .replace(/&clubs;/g, '♣')
        .replace(/&hearts;/g, '♥')
        .replace(/&diams;/g, '♦')
        .replace(/&eacute;/g, 'é');
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
const findLongestCommonPrefixString = (strs: string[]): string => {
    let initialAnswer = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(initialAnswer)) {
            initialAnswer = initialAnswer.slice(0, initialAnswer.length - 1)
            if (!initialAnswer) {
                return ""
            }
        }
    }
    return initialAnswer
};
import { QuizContext } from '@/app/context/QuizContext';
import { Answer, QuizQuestion } from '@/definition/quiz';
import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import cx from 'classnames';
import { unescapeHtml } from '@/app/utils/utils';
interface QuestionProp {
    question: QuizQuestion
    questionNumber: number
    questionCorrectAnswer: number
    isCorrectlyAnswered: boolean
    answeredChoice: number
    questionAnswers: Answer[]
}

const Question = ({
    question,
    questionNumber,
    questionCorrectAnswer,
    isCorrectlyAnswered,
    answeredChoice,
    questionAnswers,
}: QuestionProp) => {
    const {
        onAnswer,
        showAnswers,
    } = useContext(QuizContext)
    const onPressHandler = (choiceNumber: number, questionNumber: number) => {
        onAnswer({
            questionNumber,
            answerSelected: choiceNumber
        })
    }
    return (
        <View>
            {questionAnswers.map((choice, index) => (
                <TouchableOpacity disabled={showAnswers} testID={`choice-${index}`} key={index} className={cx(
                    'p-3 rounded-lg mb-2 w-full',
                    showAnswers ? ((index === answeredChoice) ?
                        (isCorrectlyAnswered ? 'bg-teal-500' : 'bg-red-400')
                        :
                        (index === questionCorrectAnswer ? 'bg-teal-700' : 'bg-blue-500'))
                        : (index === answeredChoice ? 'bg-blue-300' : 'bg-blue-500'),
                )} onPress={() => onPressHandler(index, questionNumber)}>
                    <Text className='text-center'>{unescapeHtml(choice.answerText)}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default Question

import { QuizContext } from '@/app/context/QuizContext';
import { QuizQuestion } from '@/definition/quiz';
import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import cx from 'classnames';
import { unescapeHtml } from '@/app/utils/utils';
interface QuestionProp {
    question: QuizQuestion
    questionNumber: number
}

const Question = ({ question, questionNumber }: QuestionProp) => {
    const {
        answers,
        onAnswer,
    } = useContext(QuizContext)
    const questionAnswers = question.answers
    const answeredChoice = answers[questionNumber]
    const onPressHandler = (choiceNumber: number, questionNumber: number) => {
        onAnswer({
            questionNumber,
            answerSelected: choiceNumber
        })
    }
    return (
        <View className=''>
            {questionAnswers.map((choice, index) => (
                <TouchableOpacity key={index} className={cx(
                     'p-3 rounded-lg mb-2 w-full',
                    index === answeredChoice ? 'bg-blue-300': 'bg-blue-500',
                )} onPress={() => onPressHandler(index, questionNumber)}>
                    <Text className='text-center'>{unescapeHtml(choice.answerText)}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default Question

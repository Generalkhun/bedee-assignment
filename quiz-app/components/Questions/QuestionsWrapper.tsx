import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AnswerPassingObject, QuizQuestion } from '@/definition/quiz'
import Question from './Question'
import { unescapeHtml } from '@/app/utils/utils'
import { QuizContext } from '@/app/context/QuizContext'
import cx from 'classnames'
interface Props {
    questions: QuizQuestion[] | []
}
const QuestionsWrapper = ({ questions }: Props) => {
    const { answers } = useContext(QuizContext)
    return (
        <View>
            {
                questions.map((question, index) => {
                    const questionAnswers = question.answers
                    const questionCorrectAnswer = questionAnswers.map(question => question.isCorrect).indexOf(true);
                    const answeredChoice = answers[index]
                    const isCorrectlyAnswered = questionCorrectAnswer === answeredChoice
                    return <View key={index}>
                        <Text className={cx(
                            'text-lg font-bold mb-5',
                            isCorrectlyAnswered? 'text-green-500' : 'text-red-600'
                        )}>{`${index + 1}.${unescapeHtml(question.question)}`}</Text>
                        <Question questionAnswers={question.answers} question={question} questionNumber={index} questionCorrectAnswer={questionCorrectAnswer} isCorrectlyAnswered={isCorrectlyAnswered} answeredChoice={answeredChoice} />
                    </View>
                })
            }
        </View>
    )
}

export default QuestionsWrapper
import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AnswerPassingObject, QuizQuestion } from '@/definition/quiz'
import Question from './Question'
import { unescapeHtml } from '@/app/utils/utils'
import { QuizContext } from '@/app/context/QuizContext'
interface Props {
    questions: QuizQuestion[] | []
}
const QuestionsWrapper = ({ questions }: Props) => {
    return (
        <View>
            {
                questions.map((question, index) => (
                    <View key={index}>
                        <Text className='text-lg font-bold mb-5'>{`${index + 1}.${unescapeHtml(question.question)}`}</Text>
                        <Question question={question} questionNumber={index} />
                    </View>
                ))
            }
        </View>
    )
}

export default QuestionsWrapper
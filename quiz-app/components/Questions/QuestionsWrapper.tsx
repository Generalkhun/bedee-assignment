import { View, Text } from 'react-native'
import React from 'react'
import { QuizQuestion } from '@/definition/quiz'
import Question from './Question'
interface Props {
    questions: QuizQuestion[]
}
const QuestionsWrapper = ({ questions }: Props) => {
    return (
        <View>
            {
                questions.map((question, index) => (
                    <View key={index}>
                        <Text className='text-lg font-bold mb-5'>{question.question.replace(/&quot;/g, '"')}</Text>
                        <Question question={question} />
                    </View>

                ))
            }
        </View>
    )
}

export default QuestionsWrapper
import { QuizContext } from '@/app/context/QuizContext';
import { QuizQuestion, Answer, AnswerPassingObject } from '@/definition/quiz';
import { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
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
    const [renderedAnswers, setRenderedAnswers] = useState<Answer[]>(questionAnswers)
    const shuffleAnswers = (answers: Answer[]) => {
        return answers.sort(() => Math.random() - 0.5);
    };
    useEffect(() => {
        setRenderedAnswers(shuffleAnswers(questionAnswers))
    }, [])

    const answeredChoice = answers[questionNumber]
    const onPressHandler = (choiceNumber: number, questionNumber: number) => {
        onAnswer({
            questionNumber,
            answerSelected: choiceNumber
        })
    }
    return (
        <View className=''>
            {renderedAnswers.map((choice, index) => {
                return <TouchableOpacity key={index} className={`bg-${answeredChoice === index ? "red" : "blue"}-500 p-3 rounded-lg mb-2 w-full`} onPress={() => onPressHandler(index, questionNumber)}>
                    <Text className='text-red text-center'>{choice.answerText}</Text>
                </TouchableOpacity>
            })}
        </View>
    )
}

export default Question

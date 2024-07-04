import { QuizQuestion, Answer } from '@/definition/quiz';
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
interface QuestionProp {
    question: QuizQuestion
}
const Question = ({ question }: QuestionProp) => {
    const shuffleAnswers = (answers: Answer[]) => {
        return answers.sort(() => Math.random() - 0.5);
    };
    return (
        <View>
            <Text className='text-lg font-bold mb-5'>{question.question}</Text>
            <View>
                {shuffleAnswers(question.answers).map((answer, index) => (
                    <TouchableOpacity key={index} className='bg-blue-500 p-3 rounded-lg mb-2 w-full' onPress={() => alert(answer)}>
                        <Text className='text-white text-center'>{answer.answerText}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default Question

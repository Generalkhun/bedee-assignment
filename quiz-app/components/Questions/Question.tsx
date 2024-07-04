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
        <View className=''>
            {shuffleAnswers(question.answers).map((answer, index) => (
                <TouchableOpacity key={index} className='bg-blue-500 p-3 rounded-lg mb-2 w-full' onPress={() => alert(answer)}>
                    <Text className='text-red text-center'>{answer.answerText}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default Question

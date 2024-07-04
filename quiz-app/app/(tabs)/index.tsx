import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Answer, FetchedQuestion, QuizQuestion } from '@/definition/quiz';
import Question from '@/components/Question';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=20&type=multiple');
      const data = response.data.results;
      const questions = data.map((question: FetchedQuestion) => {
        // get answers
        const incorrectAnswers = question.incorrect_answers.map((ans: string) => ({ answerText: ans, isCorrect: false }))
        const combinedAnswers = [...incorrectAnswers, { answerText: question.correct_answer, isCorrect: true }]
        return {
          question: question.question,
          answers: combinedAnswers,
        }
      })
      setQuestions(questions);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchQuestion();
  }, []);

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className='flex p-5 justify-center items-center'>
    {questions && (
      <>
        {
          questions.map((question) => (
            <Question question={question} />
          ))
        }

      </>
    )}
    <Button title="Refresh Question" onPress={fetchQuestion} />
  </ScrollView>
  );
};

export default Quiz;

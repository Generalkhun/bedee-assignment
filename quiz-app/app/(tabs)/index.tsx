import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Answer, FetchedQuestion, QuizQuestion } from '@/definition/quiz';
import QuestionsWrapper from '@/components/Questions/QuestionsWrapper';

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
    <ScrollView>
      <View className='flex p-5 justify-center items-center text-red-50'>
        {questions && <QuestionsWrapper questions={questions} />}
        <Button title="Refresh Question" onPress={fetchQuestion} />
      </View>
    </ScrollView>
  );
};

export default Quiz;

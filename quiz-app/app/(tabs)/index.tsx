import React, { useContext, useCallback } from 'react';
import { View, Button, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import { Answer, AnswerPassingObject, AnswersSelected, FetchedQuestion, QuizQuestion } from '@/definition/quiz';
import QuestionsWrapper from '@/components/Questions/QuestionsWrapper';
import { QuizContext } from '../context/QuizContext';

const Quiz: React.FC = () => {
  // const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  // const [answers, setAnswers] = useState<AnswersSelected>({});
  // const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {
    questions,
    loading,
    fetchQuestion,
    onAnswer,
  } = useContext(QuizContext)

  // const fetchQuestion = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get('https://opentdb.com/api.php?amount=20&type=multiple');
  //     const data = response.data.results;
  //     const questions = data.map((question: FetchedQuestion) => {
  //       // get answers
  //       const incorrectAnswers = question.incorrect_answers.map((ans: string) => ({ answerText: ans, isCorrect: false }))
  //       const combinedAnswers = [...incorrectAnswers, { answerText: question.correct_answer, isCorrect: true }]
  //       return {
  //         question: question.question,
  //         answers: combinedAnswers,
  //       }
  //     })
  //     setQuestions(questions);
  //   } catch (error) {
  //     console.error('Error fetching question:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };




  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchQuestion();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);



  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className='pt-10 pb-10'>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className='flex p-5 justify-center items-center text-red-50'>
          {questions && <QuestionsWrapper questions={questions} />}
        </View>
      </ScrollView>
      <Button title="Refresh Question" onPress={fetchQuestion} />
    </View>

  );
};

export default Quiz;

import React, { useContext, useCallback } from 'react';
import { View, Button, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import { Answer, AnswerPassingObject, AnswersSelected, FetchedQuestion, QuizQuestion } from '@/definition/quiz';
import QuestionsWrapper from '@/components/Questions/QuestionsWrapper';
import { QuizContext } from '../context/QuizContext';
import cx from 'classnames';

const Quiz = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const {
    questions,
    loading,
    canSubmit,
    fetchQuestion,
    onSubmitAnswer,
  } = useContext(QuizContext)

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
    <View className={cx(
      'pt-10',
      canSubmit? 'pb-10' : 'pb-3',
    )}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className='flex p-5 justify-center items-center text-red-50'>
          {questions && <QuestionsWrapper questions={questions} />}
        </View>
      </ScrollView>
      {canSubmit && <Button color={'teal'} title="Submit Answers" onPress={onSubmitAnswer} />}
    </View>

  );
};

export default Quiz;

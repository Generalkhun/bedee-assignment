import React, { useContext, useCallback } from 'react';
import { View, Button, ActivityIndicator, ScrollView, RefreshControl, Text } from 'react-native';
import QuestionsWrapper from '@/components/Questions/QuestionsWrapper';
import { QuizContext } from '../context/QuizContext';
import cx from 'classnames';
import { NUMBER_OF_QUESTIONS, REFRESHING_SET_TIME, SCORE_CHECK_LEADER_BOARD } from '@/constants/AppConstants';

const Quiz = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const {
    questions,
    loading,
    canSubmit,
    totalScore,
    showAnswers,
    fetchQuestion,
    onSubmitAnswer,
  } = useContext(QuizContext)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchQuestion();
    setTimeout(() => {
      setRefreshing(false);
    }, REFRESHING_SET_TIME);
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
      canSubmit ? 'pb-10' : (showAnswers ? 'pb-14' : 'pb-3'),
    )}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className='flex p-5 justify-center items-center text-red-50'>
          {questions ? <QuestionsWrapper questions={questions} /> : null}
        </View>
      </ScrollView>
      {canSubmit ? <Button color={'teal'} title="Submit Answers" onPress={onSubmitAnswer} /> : null}
      {showAnswers ? <View className='flex items-center p-2'>
        <Text>
          {`TotalScore:${totalScore}/${NUMBER_OF_QUESTIONS}`}
        </Text>
        <Text>
          {SCORE_CHECK_LEADER_BOARD}
        </Text>
      </View> : null}
    </View>

  );
};

export default Quiz;

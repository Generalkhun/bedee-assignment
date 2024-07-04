import { QuizQuestion, AnswersSelected, FetchedQuestion, AnswerPassingObject, Answer } from '@/definition/quiz';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Create the context
interface QuizContextStore {
  questions: QuizQuestion[] | null,
  answers: AnswersSelected,
  loading: boolean,
  fetchQuestion: () => void,
  onAnswer: (ans: AnswerPassingObject) => void,
}
export const QuizContext = createContext<QuizContextStore>({
  questions: [],
  answers: {},
  fetchQuestion: () => { },
  onAnswer: () => { },
  loading: false,
});

// Create a provider component
export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [answers, setAnswers] = useState<AnswersSelected>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const shuffleAnswers = (answers: Answer[]) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  const fetchQuestion = async () => {
    setAnswers({})
    setLoading(true);
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=20&type=multiple');
      const data = response.data.results;
      const questions = data.map((question: FetchedQuestion) => {
        // get answers
        const incorrectAnswers = question.incorrect_answers.map((ans: string) => ({ answerText: ans, isCorrect: false }))
        const combinedAnswers = shuffleAnswers([...incorrectAnswers, { answerText: question.correct_answer, isCorrect: true }])
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

  const onAnswer = ({ questionNumber, answerSelected }: AnswerPassingObject) => {
    setAnswers(previousAnswer => ({ ...previousAnswer, [questionNumber]: answerSelected }))
  }

  const quizStore = {
    questions,
    answers,
    fetchQuestion,
    onAnswer,
    loading
  }
  return (
    <QuizContext.Provider value={quizStore}>
      {children}
    </QuizContext.Provider>
  );
};
import { NUMBER_OF_QUESTIONS, QUESTIONS_URL } from '@/constants/AppConstants';
import { QuizQuestion, AnswersSelected, FetchedQuestion, AnswerPassingObject, Answer } from '@/definition/quiz';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { showConfirmationAlert } from '../utils/utils';

// Create the context
interface QuizContextStore {
  questions: QuizQuestion[] | null,
  answers: AnswersSelected,
  loading: boolean,
  canSubmit: boolean,
  showAnswers: boolean,
  totalScore: number | null,
  isLoggedOnLeaderBoard: boolean,
  fetchQuestion: () => void,
  onSubmitAnswer: () => void,
  onAnswer: (ans: AnswerPassingObject) => void,
  updateLoggedScore: () => void,
}
export const QuizContext = createContext<QuizContextStore>({
  questions: [],
  answers: {},
  canSubmit: false,
  showAnswers: false,
  loading: false,
  totalScore: null,
  isLoggedOnLeaderBoard: false,
  fetchQuestion: () => { },
  onAnswer: () => { },
  onSubmitAnswer: () => { },
  updateLoggedScore: () => { },
});

// Create a provider component
export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [answers, setAnswers] = useState<AnswersSelected>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isLoggedOnLeaderBoard, setIsLoggedOnLeaderBoard] = useState<boolean>(false)

  // load quiz when open app
  useEffect(() => {
    fetchQuestion();
  }, []);


  // update disability of summiting the quiz
  useEffect(() => {
    const canSubmit = validateAnswerAllQuestions();
    if (canSubmit) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }, [answers])

  const shuffleAnswers = (answers: Answer[]) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  const fetchQuestion = async () => {
    setShowAnswers(false)
    setAnswers({})
    setLoading(true);
    setIsLoggedOnLeaderBoard(false)
    try {
      const response = await axios.get(QUESTIONS_URL);
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

  const validateAnswerAllQuestions = () => {
    let canSubmit = false;
    if (Object.keys(answers).length === NUMBER_OF_QUESTIONS) {
      canSubmit = true
    }
    return canSubmit
  }

  const onPressProceedCalculateScore = () => {
    setShowAnswers(true)
    setCanSubmit(false)
    // calculate score
    let totalScore = 0
    questions?.forEach((question, idx) => {
      const userAnswer = answers[idx]
      if (question.answers[userAnswer].isCorrect) {
        totalScore++;
      }
    })
    setTotalScore(totalScore)
  }

  const onSubmitAnswer = () => {
    showConfirmationAlert({
      alertTitle: 'Submit',
      alertText: 'Confirm submit quiz',
      confirmText: 'submit',
      cancelText: 'cancel',
      onPressProceed: onPressProceedCalculateScore
    });
  }

  const updateLoggedScore = () => {
    setIsLoggedOnLeaderBoard(true)
  }

  const quizStore = {
    questions,
    answers,
    canSubmit,
    showAnswers,
    loading,
    totalScore,
    isLoggedOnLeaderBoard,
    fetchQuestion,
    onAnswer,
    onSubmitAnswer,
    updateLoggedScore,
}
return (
  <QuizContext.Provider value={quizStore}>
    {children}
  </QuizContext.Provider>
);
};
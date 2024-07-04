
export interface FetchedQuestion { question: string, correct_answer: string, incorrect_answers: string[] }
export interface QuizQuestion {
  question: string;
  answers: Answer[]
}

export interface Answer {
  answerText: string
  isCorrect: boolean
  isSelected?: boolean
}

export interface AnswersSelected {
  [key: number]: number
}

export interface AnswerPassingObject { questionNumber: number, answerSelected: number }

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
import React from 'react';
import { render } from '@testing-library/react-native';
import { QuizContext } from '@/app/context/QuizContext';
import { QuizQuestion, AnswersSelected } from '@/definition/quiz';
import QuestionsWrapper from '@/components/Questions/QuestionsWrapper';

jest.mock('@/components/Questions/Question', () => 'Question');

const mockQuestions: QuizQuestion[] = [
    {
        question: 'What is the capital of France?',
        answers: [
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Berlin', isCorrect: false },
            { answerText: 'Madrid', isCorrect: false },
        ],
    },
    {
        question: 'What is 2 + 2?',
        answers: [
            { answerText: '3', isCorrect: false },
            { answerText: '4', isCorrect: true },
            { answerText: '5', isCorrect: false },
            { answerText: '6', isCorrect: false },
        ],
    },
];

const mockAnswers: AnswersSelected = {
    0: 0, // Correct answer for first question
    1: 1, // Correct answer for second question
};

describe('QuestionsWrapper', () => {
    it('renders questions correctly', () => {
        const contextValue = {
            answers: mockAnswers,
            showAnswers: false,
        } as any;

        const { getByText } = render(
            <QuizContext.Provider value={contextValue}>
                <QuestionsWrapper questions={mockQuestions} />
            </QuizContext.Provider>
        );

        expect(getByText('1.What is the capital of France?')).toBeTruthy();
        expect(getByText('2.What is 2 + 2?')).toBeTruthy();
    });

    it('applies correct styles when answers are shown', () => {
        const contextValue = {
            answers: mockAnswers,
            showAnswers: true,
        } as any;

        const { getByText } = render(
            <QuizContext.Provider value={contextValue}>
                <QuestionsWrapper questions={mockQuestions} />
            </QuizContext.Provider>
        );

        const firstQuestionText = getByText('1.What is the capital of France?');
        const secondQuestionText = getByText('2.What is 2 + 2?');

        expect(firstQuestionText.props.style).toContainEqual({ color: '#22c55e' });
        expect(secondQuestionText.props.style).toContainEqual({ color: '#22c55e' });
    });

    it('applies incorrect styles for wrong answers', () => {
        const contextValue = {
            answers: { 0: 1, 1: 2 }, // Wrong answers
            showAnswers: true,
        } as any;

        const { getByText } = render(
            <QuizContext.Provider value={contextValue}>
                <QuestionsWrapper questions={mockQuestions} />
            </QuizContext.Provider>
        );

        const firstQuestionText = getByText('1.What is the capital of France?');
        const secondQuestionText = getByText('2.What is 2 + 2?');

        expect(firstQuestionText.props.style).toContainEqual({ color: '#dc2626' });
        expect(secondQuestionText.props.style).toContainEqual({ color: '#dc2626' });
    });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuizContext } from '@/app/context/QuizContext';
import Question from '@/components/Questions/Question';
import { Answer, QuizQuestion } from '@/definition/quiz';

const mockQuestion: QuizQuestion = {
    question: 'What is the capital of France?',
    answers: [
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Berlin', isCorrect: false },
        { answerText: 'Madrid', isCorrect: false },
    ],
};

const mockAnswers: Answer[] = mockQuestion.answers;

const mockContextValue = {
    onAnswer: jest.fn(),
    showAnswers: true,
} as any;

describe('Question component', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <QuizContext.Provider value={mockContextValue}>
                <Question
                    question={mockQuestion}
                    questionNumber={0}
                    questionCorrectAnswer={0}
                    isCorrectlyAnswered={true}
                    answeredChoice={0}
                    questionAnswers={mockAnswers}
                />
            </QuizContext.Provider>
        );

        expect(getByText('Paris')).toBeTruthy();
        expect(getByText('London')).toBeTruthy();
        expect(getByText('Berlin')).toBeTruthy();
        expect(getByText('Madrid')).toBeTruthy();
    });

    describe('applies correct styles based on props and context', () => {
        it('Should show correct correct color on the choices when answers are shown', () => {
            const { getByTestId } = render(
                <QuizContext.Provider value={mockContextValue}>
                    <Question
                        question={mockQuestion}
                        questionNumber={0}
                        questionCorrectAnswer={0}
                        isCorrectlyAnswered={false}
                        answeredChoice={1}
                        questionAnswers={mockAnswers}
                    />
                </QuizContext.Provider>
            );

            const parisChoice = getByTestId('choice-0');
            const londonChoice = getByTestId('choice-1');
            const berlinChoice = getByTestId('choice-2');
            const madridChoice = getByTestId('choice-3');

            expect(parisChoice.props.style.backgroundColor).toBe("#0f766e");
            expect(londonChoice.props.style.backgroundColor).toBe('#f87171');
            expect(berlinChoice.props.style.backgroundColor).toBe("#3b82f6");
            expect(madridChoice.props.style.backgroundColor).toBe('#3b82f6');
        })

        it('Should show correct correct color on the choices when answers are not shown', () => {
            mockContextValue.showAnswers = false
            const { getByTestId } = render(
                <QuizContext.Provider value={mockContextValue}>
                    <Question
                        question={mockQuestion}
                        questionNumber={0}
                        questionCorrectAnswer={0}
                        isCorrectlyAnswered={false}
                        answeredChoice={1}
                        questionAnswers={mockAnswers}
                    />
                </QuizContext.Provider>
            );

            const parisChoice = getByTestId('choice-0');
            const londonChoice = getByTestId('choice-1');
            const berlinChoice = getByTestId('choice-2');
            const madridChoice = getByTestId('choice-3');

            expect(parisChoice.props.style.backgroundColor).toBe("#3b82f6");
            expect(londonChoice.props.style.backgroundColor).toBe('#93c5fd');
            expect(berlinChoice.props.style.backgroundColor).toBe("#3b82f6");
            expect(madridChoice.props.style.backgroundColor).toBe('#3b82f6');

            mockContextValue.showAnswers = true
        })

    });

    it('calls onAnswer when an answer is selected', () => {
        const { getByText } = render(
            <QuizContext.Provider value={mockContextValue}>
                <Question
                    question={mockQuestion}
                    questionNumber={0}
                    questionCorrectAnswer={0}
                    isCorrectlyAnswered={false}
                    answeredChoice={1}
                    questionAnswers={mockAnswers}
                />
            </QuizContext.Provider>
        );

        fireEvent.press(getByText('Paris'));
        expect(mockContextValue.onAnswer).toHaveBeenCalledWith({ questionNumber: 0, answerSelected: 0 });

        fireEvent.press(getByText('London'));
        expect(mockContextValue.onAnswer).toHaveBeenCalledWith({ questionNumber: 0, answerSelected: 1 });
    });
    it('disables choices when showAnswers is true', () => {
        const { getByTestId } = render(
            <QuizContext.Provider value={mockContextValue}>
                <Question
                    question={mockQuestion}
                    questionNumber={0}
                    questionCorrectAnswer={0}
                    isCorrectlyAnswered={false}
                    answeredChoice={1}
                    questionAnswers={mockAnswers}
                />
            </QuizContext.Provider>
        );

        const parisChoice = getByTestId('choice-0');
        const londonChoice = getByTestId('choice-1');
        const berlinChoice = getByTestId('choice-2');
        const madridChoice = getByTestId('choice-3');
        expect(parisChoice.props.accessibilityState.disabled).toBe(true);
        expect(londonChoice.props.accessibilityState.disabled).toBe(true);
        expect(berlinChoice.props.accessibilityState.disabled).toBe(true);
        expect(madridChoice.props.accessibilityState.disabled).toBe(true);
    });
});

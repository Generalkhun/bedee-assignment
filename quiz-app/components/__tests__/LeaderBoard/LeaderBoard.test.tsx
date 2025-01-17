import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import Leaderboard from '../../LeaderBoard/LeaderBoard'; // Adjust the path as per your project structure
import { QuizContext } from '@/app/context/QuizContext';

jest.mock('@/app/utils/utils', () => ({
    generateMockLeaderBoardData: jest.fn(() => [
        { id: '1', name: 'John Doe', score: 200 },
        { id: '2', name: 'Jane Smith', score: 150 },
    ]),
}));

// Mock QuizContext values
const mockQuizContext = {
    isLoggedOnLeaderBoard: false,
    updateLoggedScore: jest.fn(),
    totalScore: 300, // this user score 300 points!
} as any;

const renderWithContext = (component: any) => {
    return render(
        <QuizContext.Provider value={mockQuizContext}>
            {component}
        </QuizContext.Provider>
    );
};

describe('<Leaderboard />', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
        cleanup(); // Cleanup after each test
    });
    it('renders leaderboard correctly', () => {
        const { getByText, getByPlaceholderText } = renderWithContext(<Leaderboard />);

        // Check if initial text is rendered
        expect(getByText('Leaderboard')).toBeTruthy();

        // Check if input and button are rendered when totalScore is set
        const inputElement = getByPlaceholderText('Enter your name');
        expect(inputElement).toBeTruthy();

        const confirmButton = getByText('Confirm');
        expect(confirmButton).toBeTruthy();
    });

    it('updates leaderboard on confirmation', async () => {
        const { getByText, getByPlaceholderText } = renderWithContext(<Leaderboard />);

        // Simulate entering a name and confirming
        const inputElement = getByPlaceholderText('Enter your name');
        fireEvent.changeText(inputElement, 'Test User');

        const confirmButton = getByText('Confirm');
        fireEvent.press(confirmButton);

        // Wait for state updates
        await waitFor(() => {
            // Check if the user's score is displayed
            expect(getByText('Your score:300')).toBeTruthy();

            // Check if the leaderboard updates with the new entry
            expect(getByText('1.Test User')).toBeTruthy();
            expect(getByText('2.John Doe')).toBeTruthy(); // Assuming John Doe was already on top
        });
    });

    /**@todo make it works */
    xit('scrolls to user position on leaderboard update', async () => {
        jest.mock('react', () => {
            const originReact = jest.requireActual('react');
            const flatListRef = {
                current: {
                    scrollToIndex: jest.fn(),
                },
            };

            return {
                ...originReact,
                useRef: jest.fn().mockReturnValue(flatListRef)
            };
        });
        const { getByText, getByPlaceholderText, getByTestId } = renderWithContext(<Leaderboard />);

        // Simulate entering a name and confirming
        const inputElement = getByPlaceholderText('Enter your name');
        fireEvent.changeText(inputElement, 'Test User');

        const confirmButton = getByText('Confirm');
        fireEvent.press(confirmButton);

        // Wait for state updates and scrolling animation
        await waitFor(() => {
            // Check if scrollToIndex is called correctly
            const userEntry = getByText('1.Test User');
            expect(userEntry).toBeTruthy();

            // Check if the animated property is set to true for scrolling
            // Ensure you have a testID for FlatList in the Leaderboard component
            const flatList = getByTestId('leaderboard-list');
            expect(flatList).toBeDefined();
            expect(flatList.props.ref.scrollToIndex).toHaveBeenCalledWith({ animated: true, index: 0 });
        });
    });
});

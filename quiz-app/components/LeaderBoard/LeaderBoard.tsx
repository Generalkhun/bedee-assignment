import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import { LeaderBoardEntry } from '@/definition/leaderBoard';
import { generateMockLeaderBoardData } from '@/app/utils/utils';
import { QuizContext } from '@/app/context/QuizContext';
import cx from 'classnames'
import { AUTO_SCROLL_DELAY_TIME } from '@/constants/AppConstants';
// mock leaderboard data, @todo use real data
const data: LeaderBoardEntry[] = generateMockLeaderBoardData(30)

const Leaderboard = () => {
    const {
        isLoggedOnLeaderBoard,
        updateLoggedScore,
        totalScore,
    } = useContext(QuizContext)
    const [leaderboardData, setLeaderboardData] = useState<LeaderBoardEntry[]>(data);
    const [userName, setUserName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (!userId) {
            return;
        }
        // Find the index of the item with the user's score
        const index = leaderboardData.findIndex(entry => entry.id === userId);
        // Scroll to the position of the user's score
        if (index !== -1 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({ animated: true, index });
            }, AUTO_SCROLL_DELAY_TIME); // Adjust the timeout duration as needed
        }
    }, [userId, leaderboardData]);

    const handleConfirm = () => {
        if (totalScore === null) {
            return;
        }
        setUserId("")
        const newUserId = Math.random().toString()
        // Update the leaderboard data with the user's name
        const updatedLeaderBoardData = [...leaderboardData, {
            id: newUserId,
            name: userName,
            score: totalScore,
        }]
            .sort((a, b) => b.score - a.score)
        setUserId(newUserId)
        setUserName('');
        setLeaderboardData(updatedLeaderBoardData);
        updateLoggedScore();
    };

    const renderItem = ({ item, index }: { item: LeaderBoardEntry, index: number }) => (
        <View className="flex-row justify-between p-4 border-b border-gray-200">
            <Text className={cx(
                "text-lg font-bold",
                item.id === userId ? "text-orange-400" : ""
            )}>{`${index + 1}.${item.name}`}</Text>
            <Text className="text-lg">{item.score}</Text>
        </View>
    );

    // Define getItemLayout to help FlatList calculate item positions
    const getItemLayout = (
        _: ArrayLike<LeaderBoardEntry> | null | undefined,
        index: number
    ) => ({ length: 52, offset: 52 * index, index });

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold mb-4">Leaderboard</Text>
            {(totalScore !== null && !isLoggedOnLeaderBoard) ? <>
                <View className="flex-row mr-10">
                    <TextInput
                        className="border rounded p-2 w-1/2 mr-2"
                        placeholder="Enter your name"
                        value={userName}
                        onChangeText={setUserName}
                    />
                    <Button title="Confirm" onPress={handleConfirm} />
                    <Text className='text-l ml-2 pt-2 font-bold'>{`Your score:${totalScore}`} </Text>
                </View>
            </>:null}
            <FlatList
                ref={flatListRef}
                data={leaderboardData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                getItemLayout={getItemLayout}
            />
        </View>
    );
};

export default Leaderboard;

// components/Leaderboard.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import { LeaderBoardEntry } from '@/definition/leaderBoard';
import { generateMockLeaderBoardData } from '@/app/utils/utils';

// mock leaderboard data, @todo user real data
const data: LeaderBoardEntry[] = generateMockLeaderBoardData(30)

const Leaderboard = () => {
    const myScore = 14
  const [leaderboardData, setLeaderboardData] = useState<LeaderBoardEntry[]>(data);
  const [userName, setUserName] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Find the index of the item with the user's score
    const index = leaderboardData.findIndex(entry => entry.score === myScore);
    // Scroll to the position of the user's score
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  }, [myScore, leaderboardData]);

  const handleConfirm = () => {
    // Update the leaderboard data with the user's name
    const updatedData = leaderboardData.map(entry => 
      entry.score === myScore ? { ...entry, name: userName } : entry
    );
    setLeaderboardData(updatedData);
    setUserName('');
  };

  const renderItem = ({ item }: { item: LeaderBoardEntry }) => (
    <View className="flex-row justify-between p-4 border-b border-gray-200">
      {item.score === myScore ? (
        <>
          <TextInput
            className="border rounded p-2 w-1/2"
            placeholder="Enter your name"
            value={userName}
            onChangeText={setUserName}
          />
          <Button title="Confirm" onPress={handleConfirm} />
          <Text className="text-lg">{item.score}</Text>
        </>
      ) : (
        <>
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="text-lg">{item.score}</Text>
        </>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Leaderboard</Text>
      <FlatList
        ref={flatListRef}
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Leaderboard;


import { SafeAreaView } from 'react-native';
import Leaderboard from '@/components/LeaderBoard/LeaderBoard';

export default function LeaderBoard() {
  return (
    <SafeAreaView className="flex-1 pt-10">
      <Leaderboard />
    </SafeAreaView>
  )
}
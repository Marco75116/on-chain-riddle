"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useRiddles } from "@/lib/hooks/useRiddles.hook";
import { useLastAnswerAttempts } from "@/lib/hooks/uselastAnswerattemps.hook";
import RiddleStatsCard from "./riddle-stats-card";
import RiddleQuestionCard from "./riddle-question-card";
import AnswerHistoryCard from "./riddle-answers-card";

export default function Riddle() {
  const { riddles, loading, error } = useRiddles();
  const {
    answerAttempts,
    loading: answersLoading,
    error: answersError,
  } = useLastAnswerAttempts(riddles?.[0]?.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl">
          <CardContent className="flex items-center justify-center py-8">
            <div>Loading riddle...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-red-500">
              Error loading riddle: {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentRiddle = riddles?.[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start space-y-6 p-4">
      {currentRiddle && <RiddleStatsCard riddle={currentRiddle} />}

      <RiddleQuestionCard riddle={currentRiddle} />

      <AnswerHistoryCard
        answerAttempts={answerAttempts}
        loading={answersLoading}
        error={answersError}
      />
    </div>
  );
}

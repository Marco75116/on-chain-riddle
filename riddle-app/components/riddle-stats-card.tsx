import { Card, CardContent } from "@/components/ui/card";

interface RiddleData {
  numberRiddle: number;
  totalAttempts: number;
  createdAt: string;
}

interface RiddleStatsCardProps {
  riddle: RiddleData;
}

export default function RiddleStatsCard({ riddle }: RiddleStatsCardProps) {
  const formatDate = (timestamp: string) => {
    if (!timestamp) return "Unknown";
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
      <CardContent className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
            <span className="font-medium text-gray-600 text-sm block">
              Riddle
            </span>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              #{riddle.numberRiddle}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
            <span className="font-medium text-gray-600 text-sm block">
              Total Attempts
            </span>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {riddle.totalAttempts}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
            <span className="font-medium text-gray-600 text-sm block">
              Created
            </span>
            <div className="text-sm text-gray-500 mt-1 font-medium">
              {formatDate(riddle.createdAt)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface RiddleData {
  riddle: string;
}

interface RiddleQuestionCardProps {
  riddle?: RiddleData;
  onSubmitAnswer: (answer: string) => void;
}

export default function RiddleQuestionCard({
  riddle,
  onSubmitAnswer,
}: RiddleQuestionCardProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    onSubmitAnswer(answer);
    setAnswer("");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {riddle?.riddle || "What is the capital of Paris?"}
        </CardTitle>
        {riddle && (
          <CardDescription className="text-center">
            Can you solve this riddle?
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4 w-full">
          <Input
            type="text"
            placeholder="Enter your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSubmit} className="cursor-pointer">
            Send Answer
          </Button>
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <a
          href="https://eth-sepolia.blockscout.com/address/0x2E70b3109Ccd31256e9Cf4596eEB1bc23C9B2f3c"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ExternalLink size={16} />
          <span>Check smart-contract</span>
        </a>
      </CardFooter>
    </Card>
  );
}

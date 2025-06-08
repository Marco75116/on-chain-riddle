"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { useRiddles } from "@/lib/hooks/useRiddles.hook";
import { useLastAnswerAttempts } from "@/lib/hooks/uselastAnswerattemps.hook";
import { AnswerAttempt } from "@/lib/types/global.type";
import { copyToClipboard } from "@/lib/helpers/global.helper";
import { toast } from "sonner";

export default function Riddle() {
  const { riddles, loading, error } = useRiddles();
  const {
    answerAttempts,
    loading: answersLoading,
    error: answersError,
  } = useLastAnswerAttempts(riddles?.[0]?.id);

  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    console.log("Answer submitted:", answer);
    setAnswer("");
  };

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

  const formatWalletAddress = (address: string) => {
    if (!address) return "Unknown";
    if (address.length < 10) return address;
    return `${address.slice(0, 4)}...${address.slice(-6)}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start space-y-6 p-4">
      {currentRiddle && (
        <Card className="w-full max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                <span className="font-medium text-gray-600 text-sm block">
                  Riddle
                </span>
                <div className="text-2xl font-bold text-blue-600 mt-1">
                  #{currentRiddle.numberRiddle}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                <span className="font-medium text-gray-600 text-sm block">
                  Total Attempts
                </span>
                <div className="text-2xl font-bold text-blue-600 mt-1">
                  {currentRiddle.totalAttempts}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                <span className="font-medium text-gray-600 text-sm block">
                  Created
                </span>
                <div className="text-sm text-gray-500 mt-1 font-medium">
                  {formatDate(currentRiddle.createdAt)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {currentRiddle?.riddle || "What is the capital of Paris?"}
          </CardTitle>
          {currentRiddle && (
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

      <Card className="w-full max-w-2xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="previous-answers" className="border-none">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold">
                  Previously Submitted Answers
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {answerAttempts?.length || 0} answer attempts
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {answersLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="text-gray-500">
                    Loading previous answers...
                  </div>
                </div>
              ) : answersError ? (
                <div className="flex items-center justify-center py-4">
                  <div className="text-red-500">
                    Error loading answers: {answersError.message}
                  </div>
                </div>
              ) : !answerAttempts || answerAttempts.length === 0 ? (
                <div className="flex items-center justify-center py-4">
                  <div className="text-gray-500">No previous answers found</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {answerAttempts.map(
                    (answer: AnswerAttempt, index: number) => (
                      <div
                        key={answer.id || index}
                        className="bg-gray-50 rounded-lg p-4 border"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-gray-900">
                            Answer: {answer.answer || "N/A"}
                          </div>
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              answer.isCorrect
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {answer.isCorrect ? "Correct" : "Incorrect"}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Submitted:{" "}
                          {formatDate(
                            answer.createdAt || answer.timestamp || ""
                          )}{" "}
                          <br />
                          by:{" "}
                          <span
                            className="font-bold cursor-pointer hover:underline"
                            onClick={() => {
                              copyToClipboard(answer.userId || "");
                              toast.success("Address copied to clipboard");
                            }}
                          >
                            {formatWalletAddress(answer.userId || "")}
                          </span>
                        </div>
                        {answer.riddleNumber && (
                          <div className="text-sm text-gray-500 mt-1">
                            Riddle #{answer.riddleNumber}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}

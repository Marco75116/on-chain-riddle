"use client";

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

export default function Riddle() {
  const { riddles, loading, error } = useRiddles();

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

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
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
    </div>
  );
}

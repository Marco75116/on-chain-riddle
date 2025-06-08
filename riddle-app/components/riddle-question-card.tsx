import { useState, useEffect } from "react";
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
import { ExternalLink, Loader2 } from "lucide-react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";
import {
  RIDDLE_CONTRACT_ADDRESS,
  RIDDLE_CONTRACT_ABI,
} from "@/lib/constants/riddle.constant";

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

  const {
    writeContract,
    isPending: isWritePending,
    data: hash,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (hash) {
      const shortHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`;
      toast.success("Transaction submitted!", {
        description: (
          <div className="flex items-center gap-2">
            <span>Hash: {shortHash}</span>
            <a
              href={`https://eth-sepolia.blockscout.com/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on Blockscout
            </a>
          </div>
        ),
        duration: 5000,
      });
    }
  }, [hash]);

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Waiting for confirmation...", {
        id: "confirmation-toast",
      });
    } else if (isConfirmed) {
      toast.success("Transaction confirmed!", {
        id: "confirmation-toast",
      });
    }
  }, [isConfirming, isConfirmed]);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    try {
      await writeContract({
        address: RIDDLE_CONTRACT_ADDRESS,
        abi: RIDDLE_CONTRACT_ABI,
        functionName: "submitAnswer",
        args: [answer.trim()],
      });

      onSubmitAnswer(answer);

      toast.success("Answer submitted successfully!");
      setAnswer("");
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Failed to submit answer. Please try again.");
    }
  };

  if (writeError) {
    toast.error(`Transaction failed: ${writeError.message}`);
  }

  if (receiptError) {
    toast.error(`Transaction error: ${receiptError.message}`);
  }

  const isLoading = isWritePending || isConfirming;

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
            disabled={isLoading}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSubmit();
              }
            }}
          />
          <Button
            onClick={handleSubmit}
            className="cursor-pointer"
            disabled={isLoading || !answer.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isWritePending ? "Submitting..." : "Confirming..."}
              </>
            ) : (
              "Send Answer"
            )}
          </Button>
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <a
          href="https://eth-sepolia.blockscout.com/address/0x2E70b3109Ccd31256e9Cf4596eEB1bc23C9B2f3c"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => {
            toast("Viewing smart contract", {
              description: "Opening contract details on Blockscout",
              duration: 2000,
            });
          }}
        >
          <ExternalLink size={16} />
          <span>Check smart-contract</span>
        </a>
      </CardFooter>
    </Card>
  );
}

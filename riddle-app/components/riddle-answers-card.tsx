import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { AnswerAttempt } from "@/lib/types/global.type";
import { copyToClipboard } from "@/lib/helpers/global.helper";
import { toast } from "sonner";

interface AnswerHistoryCardProps {
  answerAttempts?: AnswerAttempt[];
  loading: boolean;
  error?: { message: string } | null;
}

export default function AnswerHistoryCard({
  answerAttempts,
  loading,
  error,
}: AnswerHistoryCardProps) {
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
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="text-gray-500">Loading previous answers...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-4">
                <div className="text-red-500">
                  Error loading answers: {error.message}
                </div>
              </div>
            ) : !answerAttempts || answerAttempts.length === 0 ? (
              <div className="flex items-center justify-center py-4">
                <div className="text-gray-500">No previous answers found</div>
              </div>
            ) : (
              <div className="space-y-4">
                {answerAttempts.map((answer: AnswerAttempt, index: number) => (
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
                      {formatDate(answer.createdAt || answer.timestamp || "")}{" "}
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
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRiddles } from "@/lib/hooks/useRiddles.hook"

export default function Riddle() {
    const { riddles, loading, error } = useRiddles();
    
    console.log("Riddle component - riddles:", riddles, "loading:", loading, "error:", error);
    
    useEffect(() => {
      console.log("Riddle component mounted/updated - riddles:", riddles?.length, "loading:", loading);
    }, [riddles, loading]);

  const [answer, setAnswer] = useState("")

  const handleSubmit = () => {
    console.log("Answer submitted:", answer)
    setAnswer("")
  }

  if (loading) {
    return <div>Loading riddle...</div>;
  }

  if (error) {
    return <div>Error loading riddle: {error.message}</div>;
  }

  const currentRiddle = riddles?.[0];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <h1 className="text-2xl font-bold text-center">
        {currentRiddle?.riddle || "What is the capital of Paris?"}
      </h1>
      
      <div className="flex items-center space-x-4 w-full max-w-md">
        <Input
          type="text"
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSubmit} className="cursor-pointer">
          Send
        </Button>
      </div>
    </div>
  )
} 
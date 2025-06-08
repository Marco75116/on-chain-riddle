"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Riddle() {
  const [answer, setAnswer] = useState("")

  const handleSubmit = () => {
    console.log("Answer submitted:", answer)
    setAnswer("")
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <h1 className="text-2xl font-bold text-center">
        What is the capital of Paris?
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
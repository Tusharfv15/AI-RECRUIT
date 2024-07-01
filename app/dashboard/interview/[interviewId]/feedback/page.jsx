'use client'
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";
import { useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

  

function Feedback({ params }) {
  const [feedback, setFeedback] = useState([]);
  const [score,setScore] = useState(0);
  const router = useRouter();
    useEffect(() => {
      getFeedback();
      
    }, []);
  useEffect(() => (
    calculateScore()
  ),[feedback])
  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
          .orderBy(UserAnswer.id);
      
      //console.log(result);
      setFeedback(result);
  };
  const calculateScore = () => {
    let total = 0;
    feedback.forEach((item) => {
      total += parseInt(item.rating);
    });
    setScore(total);
  }
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">
        Here is your AI generated Interview Feedback
      </h2>
      {feedback.length === 0 ? <h2 className="font-bold text-xl text-ray-500">No Interview Record Found</h2>
        
        : 
        <>
           <h2 className="text-primary text-lg my-3">
            Your Overall interview score: <strong> {score}/50 </strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Below are the interview questions with the correct answer, your answer
        and feedback for improvement
          </h2>
          {feedback && feedback.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                  <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 flex items-center w-full text-left"><ChevronsUpDown className="h-5 w-5"/>{item.question} </CollapsibleTrigger>
              <CollapsibleContent>
                      <div className="flex flex-col gap-2">
                          <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating: </strong>{item.rating}</h2>
                          <h2 className="p-2 border rounded-lg bg-red-50 text-red-900"><strong>Your Answer: </strong>{item.userAnswer }</h2>
                          <h2 className="p-2 border rounded-lg bg-green-50 text-green-900"><strong>Correct Answer: </strong>{item.correctAnswer }</h2>
                          <h2 className="p-2 border rounded-lg bg-yellow-50 text-yellow-900"><strong>Feedback:  </strong>{item.feedback }</h2>
            </div>
              </CollapsibleContent>
            </Collapsible>
            
          ))}
        </>
      
      }
     
      <Button className='mt-3' onClick={ ()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;

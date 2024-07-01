"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";

function RecordAnsSection({
  mockInterviewQuestion,
  activeQuestion,
  interviewData,
}) {
  const { user } = useUser();
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result.transcript)
    );
  }, [results]);
    
    
    useEffect(() => {
        if(!isRecording && userAnswer?.length > 10){
            updateUserAnswer();
        }
        
    },[userAnswer])
  const StartStopRecording = async () => {
    if (isRecording) {
   
      stopSpeechToText();
      
    } else {
      startSpeechToText();
    }
  };

    const updateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question: " +
      mockInterviewQuestion[activeQuestion]?.question +
      ", User Answer: " +
      userAnswer +
      ", Depending on question and user answer for the given interview question please give us rating for answer and feedback as area of improvement if any" +
      " in just 3 to 5 lines to improve it in JSON format with rating field(must be a number from 1-10) and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(mockJsonResponse);
    const JsonFeedbackRes = JSON.parse(mockJsonResponse);
    const res = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestion]?.question,
      correctAnswer: mockInterviewQuestion[activeQuestion]?.answer,
      userAnswer: userAnswer,
      feedback: JsonFeedbackRes?.feedback,
      rating: JsonFeedbackRes?.rating,
      userEmailAddress: user.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });
    if (res) {
      toast.success("Answer Recorded Successfully");
      setUserAnswer("");
      //console.log(results)
      setResults([]);
      }
      setResults([]);
      setUserAnswer("");
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-20 bg-black">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      
    </div>
  );
}

export default RecordAnsSection;

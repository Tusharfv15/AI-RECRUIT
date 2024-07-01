"use client";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState("");
  const [webCamEnable, setWebCamEnable] = useState(false);
  useEffect(() => {
    getInterviewDetails();
  }, []);
  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);
  };
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData.jobDescription}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience </strong>
              {interviewData.jobExperience}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-purple-500 bg-purple-300">
            <h2 className="flex gap-2 items-center">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2>
              Enable Video Web Cam and Microphone to start your AI Generated
              Mock Interview. It has 5 questions which you can answer and at
              last you will get the report on the basis of your answer.{" "}
              <strong>NOTE:</strong> We never record your video, Web Cam access
              cab be disabled at any time you wish for.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              style={{ height: 400, width: 700 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-20 bg-secondary rounded-lg border my-7" />
              <Button
                onClick={() => setWebCamEnable(true)}
                className="w-full"
                variant="ghost"
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
          {/*  <Webcam /> */}
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;

"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonresponse, setJsonres] = useState([]);
  const { user } = useUser();
  const router = useRouter()

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, yearsOfExperience);
    const InputPrompt =
      "+JobPosition+: " +
      jobPosition +
      ", jobDescription: " +
      jobDescription +
      ",yearsofExperience: " +
      yearsOfExperience +
      ".Give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      "interview question along with answer in JSON format. Give us question and answer in JSON format.Please make sure that the questions must only be accepted if the question is based on computer scienece field and not other field. If user ask non tech field questions give them warning that it could cause them not to be selected. Do not return any warnings in JSON Object as it disrupts the JSON format. Just return the questions and answers in pure JSON format. I repeat JSON format only enclosed within tag.";
    const result = await chatSession.sendMessage(InputPrompt);
    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace(/```/g, "")

    const jsonres = JSON.stringify(mockJsonResponse);

    console.log(JSON.parse(jsonres));
    setJsonres(jsonres);
    if (mockJsonResponse) {
      const response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResponse: mockJsonResponse,
          jobPosition: jobPosition,
          jobDescription: jobDescription,
          jobExperience: yearsOfExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log("Inserted Id", response);
      if (response) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + response[0]?.mockId)
      }
    }
    else {
      console.log("Error");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-large text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-[400px] md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Job Profile
            </DialogTitle>
            <DialogDescription>
              Add Details about your Job Position/Role, Job Description, and
              years of Experience
            </DialogDescription>
          </DialogHeader>{" "}
          {/* Closing tag added here */}
          <form onSubmit={onSubmit}>
            <div className="mt-7 my-3">
              <label>Job Role/Job Position</label>
              <Input
                required
                placeholder="Ex. Full Stack Developer"
                className="focus-visible:ring-transparent"
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label>Job Description/Tech Stack (In Short)</label>
              <Textarea
                required
                placeholder="Ex. React, Angular"
                className="focus-visible:ring-transparent"
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label>Years of experience</label>
              <Input
                required
                placeholder="Ex. 5"
                className="focus-visible:ring-transparent"
                type="number"
                max="50"
                onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </div>

            <div className="flex gap-5 justify-end">
              <Button
                onClick={() => setOpenDialog(false)}
                variant="ghost"
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    {" "}
                    <LoaderCircle className="animate-spin" />
                    Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

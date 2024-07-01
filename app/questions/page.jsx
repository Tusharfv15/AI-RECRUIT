import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

function QuestionsPage() {
  return (
    <div className="mt-7">
      <Collapsible className="p-3">
        <CollapsibleTrigger className="p-2 bg-yellow-200 rounded-lg my-2 flex items-center w-full text-left">
          <ChevronsUpDown className="h-5 w-5" />
          How does the app utilize the Gemini API for creating and assessing
          interview questions?
        </CollapsibleTrigger>
        <CollapsibleContent>
          <h2 className=" p-2 border rounded-lg bg-blue-200">
            The AI mock interview app uses the Google's Gemini API to generate
            dynamic and relevant interview questions based on your job role,
            experience level, and industry. After you answer, the API analyzes
            your responses and provides feedback on content, clarity, and areas
            for improvement.
          </h2>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="p-3">
        <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 flex items-center w-full text-left  bg-yellow-200">
          <ChevronsUpDown className="h-5 w-5" />
          What kinds of questions will the app create for my mock interview?
        </CollapsibleTrigger>
        <CollapsibleContent>
          <h2 className=" p-2 border rounded-lg bg-blue-200">
            The Gemini API can generate a wide range of questions, including
            technical, behavioral, and situational questions. It can also tailor
            questions to specific roles, industries, and skill levels, ensuring
            that the mock interview is as relevant as possible to your needs.
          </h2>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="p-3">
        <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 flex items-center w-full text-left  bg-yellow-200">
          <ChevronsUpDown className="h-5 w-5" />
          How reliable is the feedback I receive on my interview answers?
        </CollapsibleTrigger>
        <CollapsibleContent>
          <h2 className=" p-2 border rounded-lg bg-blue-200">
            The feedback provided by the Gemini API is based on extensive data
            and industry best practices. It evaluates your responses for
            completeness, relevance, and effectiveness, offering constructive
            suggestions to enhance your interview performance. While it provides
            valuable insights, it's also good to complement it with human
            feedback for a well-rounded preparation.
          </h2>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="p-3">
        <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 flex items-center w-full text-left  bg-yellow-200">
          <ChevronsUpDown className="h-5 w-5" />
          Can I customize the interview questions?
        </CollapsibleTrigger>
        <CollapsibleContent>
          <h2 className=" p-2 border rounded-lg bg-blue-200">
            Yes, you can customize your interview by specifying the focus areas,
            such as technical skills, soft skills, or particular topics related
            to your field. The Gemini API will generate questions that align
            with these preferences, helping you practice in targeted areas.
          </h2>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="p-3">
        <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 flex items-center w-full text-left  bg-yellow-200">
          <ChevronsUpDown className="h-5 w-5" />
          Can I review past interview sessions?
        </CollapsibleTrigger>
        <CollapsibleContent>
          <h2 className=" p-2 border rounded-lg bg-blue-200">
            Yes, the app allows you to review your past interview sessions and
            the feedback provided. This feature helps you track your progress
            over time and understand areas where you have improved or still need
            to focus on.
          </h2>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default QuestionsPage;

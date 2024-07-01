import React from "react";
import Header from "../dashboard/_components/Header";

function layout() {
  return (
    <div>
      <Header />
      <div className="p-10">
        <h2 className="text-2xl font-bold text-green-500">
          Understanding the Technology Behind Your AI-Powered Interview
        </h2>
        <h2 className="font-bold text-lg">
          The Gemini API plays a crucial role in generating dynamic interview
          questions and providing real-time feedback in our AI mock interview
          app. Here is how it works:
        </h2>
      </div>
      <div className="flex flex-col p-4 gap-3">
        <div className="border rounded-lg p-5 flex flex-col bg-yellow-200">
          <strong>Data Input </strong>
          <h2>
            User Profile: When you set up your profile, the information you
            provide about your career goals, job roles, and experience helps
            tailor the questions to your needs.
          </h2>
          <h2>
            Session Configuration: Your choices for the job role, industry, and
            focus areas are sent to the Gemini API, guiding it to generate
            relevant questions.
          </h2>
        </div>
        <div className="border rounded-lg p-5 bg-yellow-200">
          <strong>Question Generation </strong>
          <h2>
            Dynamic Question Creation: The Gemini API uses advanced natural
            language processing to generate interview questions on the fly. It
            leverages a vast database of interview topics and trends, creating
            questions that are both current and relevant to your specified focus
            areas.
          </h2>
          <h2>
            Adaptability: The API can adjust the complexity and type of
            questions based on your experience level and preferences, ensuring a
            customized interview experience.
          </h2>
        </div>

        <div className="border rounded-lg p-5 bg-yellow-200">
          <strong> Response Processing </strong>
          <h2>
            Real-Time Analysis: As you respond to questions, the Gemini API
            processes your answers in real-time. It understands and evaluates
            the content of your responses using natural language understanding
            techniques.
          </h2>
          <h2>
            Contextual Understanding: The API interprets the context and details
            of your answers, comparing them against expected responses for the
            role and industry you've chosen.
          </h2>
        </div>
        <div className="border rounded-lg p-5 bg-yellow-200">
          <strong> Feedback Generation </strong>
          <h2>
            Constructive Insights: Based on its analysis, the Gemini API
            provides feedback on your responses. This includes suggestions for
            improving clarity, structure, and content, helping you refine your
            answers.
          </h2>
          <h2>
            Detailed Evaluation: Feedback is tailored to your specific answers,
            offering insights into areas like technical knowledge,
            problem-solving skills, and communication effectiveness.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default layout;

import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockInterviewQuestion, activeQuestion }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else {
      alert('sorry your browser does not support text to speech')
    }
  }
  return mockInterviewQuestion && (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <h2
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer${
                activeQuestion == index && ' bg-primary text-white'
              }`} key={index}
            >
              Question # {index + 1}
            </h2>
          ))}
       
      </div>
      <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestion]?.question}</h2>
      <Volume2 onClick={ ()=>textToSpeech(mockInterviewQuestion[activeQuestion]?.question)} className="cursor-pointer"/>
      <div className="border rounded-lg p-5 bg-purple-400 mt-20">
        <h2 className="flex gap-2 items-center">
          <Lightbulb />
          <strong>NOTE: </strong>
        </h2>
        <h2 className="text-sm">Click on Record answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer forn each question and your answer to compare it.</h2>
      </div>
    </div>


  );
}

export default QuestionSection;

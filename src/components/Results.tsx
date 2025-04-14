import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types';

interface ResultsProps {
  questions: Question[];
  answers: (string | null)[];
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ questions, answers, onRestart }) => {
  const score = questions.reduce((acc, question, index) => {
    const isCorrect = question.correctAnswer.every(
      (answer, i) => answer === answers[index * question.correctAnswer.length + i]
    );
    return acc + (isCorrect ? 1 : 0);
  }, 0);

  // const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Score Circle */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-green-600">{score}</span>
          </div>
          {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 text-lg">
            Score
          </div> */}
        </div>
        <p className="text-gray-600 text-center max-w-md">
          You got {score} out of {questions.length} questions correct. Review your answers below to see where you can improve.
        </p>
        <button
          onClick={onRestart}
          className="px-8 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6">
        {questions.map((question, questionIndex) => {
          const userAnswers = answers.slice(
            questionIndex * question.correctAnswer.length,
            (questionIndex + 1) * question.correctAnswer.length
          );
          const isCorrect = question.correctAnswer.every(
            (answer, i) => answer === userAnswers[i]
          );

          const parts = question.question.split('_____________');
          
          return (
            <div key={question.questionId} className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>

                {/* Correct Answer */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Correct Answer:</h4>
                  <p className="text-gray-900">
                    {parts.map((part, index) => (
                      <React.Fragment key={index}>
                        {part}
                        {index < parts.length - 1 && (
                          <span className="mx-1 font-medium underline decoration-2 decoration-green-500">
                            {question.correctAnswer[index]}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                {/* User's Answer */}
                <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Your Answer:</h4>
                  <p className={isCorrect ? 'text-green-900' : 'text-red-900'}>
                    {parts.map((part, index) => (
                      <React.Fragment key={index}>
                        {part}
                        {index < parts.length - 1 && (
                          <span 
                            className={`mx-1 font-medium ${
                              userAnswers[index] === question.correctAnswer[index]
                                ? 'text-green-700 underline decoration-2 decoration-green-500'
                                : 'text-red-700 line-through decoration-2'
                            }`}
                          >
                            {userAnswers[index] || '_____'}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                {!isCorrect && (
                  <div className="mt-2 text-sm text-red-600">
                    <p>Incorrect words: {userAnswers.map((answer, idx) => 
                      answer !== question.correctAnswer[idx] ? (
                        <span key={idx} className="font-medium">
                          {answer} → {question.correctAnswer[idx]}{idx < userAnswers.length - 1 ? ', ' : ''}
                        </span>
                      ) : null
                    )}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
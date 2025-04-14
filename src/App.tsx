import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { Question } from './components/Question';
import { Results } from './components/Results';
import { Question as QuestionType } from './types';
import { ArrowRight } from 'lucide-react';
import { loadQuestions } from './utils/questions';

function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions()
      .then((loadedQuestions) => {
        setQuestions(loadedQuestions);
        const totalBlanks = loadedQuestions.reduce((acc, q) => acc + q.correctAnswer.length, 0);
        setAnswers(new Array(totalBlanks).fill(null));
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to load questions. Please try again.');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isComplete && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, isComplete]);

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeRemaining(30);
    } else {
      setIsComplete(true);
    }
  };

  const handleAnswerSelect = (blankIndex: number, word: string | null) => {
    const answerIndex = currentQuestionIndex * questions[currentQuestionIndex].correctAnswer.length + blankIndex;
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[answerIndex] = word;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeRemaining(30);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    const totalBlanks = questions.reduce((acc, q) => acc + q.correctAnswer.length, 0);
    setAnswers(new Array(totalBlanks).fill(null));
    setTimeRemaining(30);
    setIsComplete(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  if (isComplete) {
    return <Results questions={questions} answers={answers} onRestart={handleRestart} />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = answers.slice(
    currentQuestionIndex * currentQuestion.correctAnswer.length,
    (currentQuestionIndex + 1) * currentQuestion.correctAnswer.length
  );
  const availableWords = currentQuestion.options.filter(
    (word) => !currentAnswers.includes(word)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Timer timeRemaining={timeRemaining} onTimeUp={handleTimeUp} />
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>

            <Question
              question={currentQuestion}
              selectedAnswers={currentAnswers}
              onSelectAnswer={handleAnswerSelect}
              availableWords={availableWords}
            />

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={currentAnswers.includes(null)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
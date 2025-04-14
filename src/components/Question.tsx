import React from 'react';
import { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  selectedAnswers: (string | null)[];
  onSelectAnswer: (index: number, word: string | null) => void;
  availableWords: string[];
}

export const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswers,
  onSelectAnswer,
  availableWords,
}) => {
  const sentenceParts = question.question.split('_____________');

  return (
    <div className="space-y-6">
      <div className="text-xl leading-relaxed">
        {sentenceParts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < sentenceParts.length - 1 && (
              <button
                onClick={() => onSelectAnswer(index, null)}
                className={`mx-2 px-4 py-1 rounded-md ${
                  selectedAnswers[index]
                    ? 'bg-blue-500 text-white'
                    : 'border-2 border-dashed border-gray-300 text-gray-400'
                }`}
              >
                {selectedAnswers[index] || '_____'}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {question.options.map((word) => (
          <button
            key={word}
            onClick={() => {
              const firstEmptyIndex = selectedAnswers.findIndex((answer) => answer === null);
              if (firstEmptyIndex !== -1) {
                onSelectAnswer(firstEmptyIndex, word);
              }
            }}
            disabled={!availableWords.includes(word)}
            className={`px-4 py-2 rounded-lg ${
              availableWords.includes(word)
                ? 'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};
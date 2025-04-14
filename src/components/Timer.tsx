import React, { useEffect } from 'react';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeUp }) => {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const progress = (timeRemaining / 30) * 100; // 30s is the total time
  const isLowTime = timeRemaining <= 5;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-1000 ${
          isLowTime ? 'bg-red-500' : 'bg-blue-500'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
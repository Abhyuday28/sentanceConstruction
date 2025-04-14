# sentanceConstruction
# Interactive Sentence Construction Game

An engaging web application that helps users improve their English language skills through interactive sentence construction exercises. Users must complete sentences by selecting appropriate words from given options, testing their understanding of context, grammar, and vocabulary.

![Game Screenshot](https://github.com/user-attachments/assets/67b5c1ee-8e7b-4784-8651-858f2f03f575)

## Features

- **Interactive Word Selection**: Fill in blanks with contextually appropriate words
- **Timed Challenges**: 30-second timer for each question
- **Progress Tracking**: Visual progress bar showing remaining time
- **Immediate Feedback**: Instant feedback on word selection
- **Detailed Results**: Comprehensive review of answers with:
  - Score visualization
  - Correct vs. incorrect answers
  - Complete sentence review
  - Word-by-word comparison
  - Visual indicators for correct/incorrect choices

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interactive-sentence-game.git
```

2. Navigate to the project directory:
```bash
cd interactive-sentence-game
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Game Rules

1. Each question presents a sentence with multiple blanks
2. Choose appropriate words from the given options to complete the sentence
3. You have 30 seconds to answer each question
4. All blanks must be filled before proceeding to the next question
5. Score is calculated based on correct sentence completions

## Project Structure

```
src/
├── components/         # React components
│   ├── Question.tsx   # Question display and interaction
│   ├── Results.tsx    # Results page with detailed feedback
│   └── Timer.tsx      # Progress bar timer
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx            # Main application component
```

## Component Details

### Question Component
- Displays the current question with blanks
- Handles word selection and placement
- Shows available word options
- Updates as users make selections

### Timer Component
- Visual progress bar
- 30-second countdown
- Color changes to red for last 5 seconds
- Auto-advances when time expires

### Results Component
- Shows overall score
- Displays detailed feedback for each question
- Highlights correct and incorrect answers
- Provides option to retry the quiz

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Question data structure inspired by language learning platforms
- UI design influenced by modern educational apps
- Special thanks to the React and TypeScript communities

## Contact

Abhyuday

Project Link: [https://github.com/Abhyuday2807

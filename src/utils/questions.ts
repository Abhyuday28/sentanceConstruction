import { QuestionResponse, Question } from '../types';

export async function loadQuestions(): Promise<Question[]> {
  try {
    const response = await fetch('/questions.json');
    if (!response.ok) {
      throw new Error('Failed to load questions');
    }
    const data: QuestionResponse = await response.json();
    return data.data.questions;
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}
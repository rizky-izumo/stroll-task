export interface QuestionsInterface {
  id: number;
  question: string;
  choices: Record<string, unknown>;
  correctAnswer: number;
  regionId: number;
  createdAt: string;
  updatedAt: string;
}

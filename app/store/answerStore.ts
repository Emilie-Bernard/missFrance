import { create } from 'zustand';
import { Answer } from '@/interfaces/testInterface';

interface AnswerStore {
  answers: Answer[];
  addAnswer: (newAnswer: Answer) => void;
  updateAnswer: (updatedAnswer: Answer) => void;
  setUpAnswers: (answers: Answer[]) => void;
  clearAnswer: () => void;
}

export const useAnswerStore = create<AnswerStore>((set) => ({
  answers: [],
  addAnswer: (newAnswer) => set((state) => ({
    answers: [...state.answers.filter(a => a.questionId !== newAnswer.questionId), newAnswer]
  })),
  updateAnswer: (updatedAnswer) => set((state) => ({
    answers: state.answers.map((answer) =>
      answer.questionId === updatedAnswer.questionId ? updatedAnswer : answer
    )
  })),
  setUpAnswers: (answers: Answer[]) => set(() => ({
    answers
  })),
  clearAnswer: () => set(() => ({
    answers: []
  })),
}));
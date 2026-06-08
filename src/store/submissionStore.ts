import { create } from 'zustand';

import { type Submission } from '~/types';

import { COUNTRIES } from '../constants/countries';

type SubmissionStore = {
  submissions: Submission[];
  countries: string[];
  addSubmission: (submission: Submission) => void;
};

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  submissions: [],
  countries: [...COUNTRIES],

  addSubmission: (submission) =>
    set((state) => ({
      submissions: [submission, ...state.submissions],
    })),
}));

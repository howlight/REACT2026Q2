export type FormData = {
  name: string;
  age: number | null;
  email: string;
  gender: Gender | '';
  termsAccepted: boolean;
  image: string;
  password: string;
  confirmPassword: string;
  country: string;
};

export type Submission = FormData & {
  id: string;
  submittedAt: Date;
};

export type ValidationErrors = Partial<Record<keyof FormData, string>>;

export type Gender = 'male' | 'female';

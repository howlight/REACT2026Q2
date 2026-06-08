export type PasswordRequirements = {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecial: boolean;
};

export const checkPasswordRequirements = (password: string): PasswordRequirements => ({
  hasNumber: /[0-9]/.test(password),
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  hasSpecial: /[^A-Za-z0-9]/.test(password),
});

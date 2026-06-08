import './PasswordIndicator.css';

import { checkPasswordRequirements } from '~/utils/passwordRequirements';

type Props = {
  password: string;
};

export const PasswordIndicator = ({ password }: Props) => {
  if (!password) return null;

  const requirements = checkPasswordRequirements(password);

  return (
    <div className="password-indicator">
      <div className="password-indicator-title">Password requirements:</div>
      <ul className="password-indicator-list">
        <li className={requirements.hasNumber ? 'valid' : 'invalid'}>1 number</li>
        <li className={requirements.hasUppercase ? 'valid' : 'invalid'}>1 uppercase letter</li>
        <li className={requirements.hasLowercase ? 'valid' : 'invalid'}>1 lowercase letter</li>
        <li className={requirements.hasSpecial ? 'valid' : 'invalid'}>1 special character</li>
      </ul>
    </div>
  );
};

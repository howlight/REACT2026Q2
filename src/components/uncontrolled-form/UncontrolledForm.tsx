import '~/app/styles/components/Form.css';

import { type FormEvent, useState } from 'react';

import { useImageUpload } from '~/hooks/useImageUpload';
import { useSubmissionStore } from '~/store/submissionStore';
import type { FormData } from '~/types';
import { formSchema } from '~/utils/validation';

import { PasswordIndicator } from '../password-indicator';

type Props = {
  onClose: () => void;
};

export const UncontrolledForm = ({ onClose }: Props) => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { imageBase64, imageError, handleImageUpload } = useImageUpload();
  const countries = useSubmissionStore((state) => state.countries);
  const addSubmission = useSubmissionStore((state) => state.addSubmission);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field: string): string | undefined =>
    touched[field] ? errors[field] : undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formValues: FormData = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')) || null,
      email: formData.get('email') as string,
      gender: (formData.get('gender') as 'male' | 'female' | '') || '',
      termsAccepted: formData.get('termsAccepted') === 'on',
      image: imageBase64,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      country: formData.get('country') as string,
    };

    const result = formSchema.safeParse(formValues);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldPath = issue.path[0];

        if (typeof fieldPath === 'string') {
          if (!formattedErrors[fieldPath]) {
            formattedErrors[fieldPath] = issue.message;
          }
        }
      });

      setErrors(formattedErrors);
      setTouched({
        name: true,
        age: true,
        email: true,
        gender: true,
        termsAccepted: true,
        image: true,
        password: true,
        confirmPassword: true,
        country: true,
      });
      return;
    }

    const submission = {
      ...formValues,
      id: crypto.randomUUID(),
      submittedAt: new Date(),
    };

    addSubmission(submission);
    console.log('Uncontrolled Form Data:', submission);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          className="form-input"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          onBlur={() => handleBlur('name')}
        />
        {getFieldError('name') && <span className="error">{getFieldError('name')}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="age" className="label">
          Age
        </label>
        <input
          className="form-input"
          id="age"
          name="age"
          type="number"
          onBlur={() => handleBlur('age')}
        />
        {getFieldError('age') && <span className="error">{getFieldError('age')}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          className="form-input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          onBlur={() => handleBlur('email')}
        />
        {getFieldError('email') && <span className="error">{getFieldError('email')}</span>}
      </div>

      <div className="form-field">
        <span className="label">Gender</span>
        <div className="radio-group" onBlur={() => handleBlur('gender')}>
          <label className="label" htmlFor="gender-male">
            <input id="gender-male" type="radio" name="gender" value="male" />
            Male
          </label>
          <label className="label" htmlFor="gender-female">
            <input id="gender-female" type="radio" name="gender" value="female" />
            Female
          </label>
        </div>
        {getFieldError('gender') && <span className="error">{getFieldError('gender')}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="image" className="label">
          Profile Image (PNG/JPEG, max 2MB)
        </label>
        <input
          className="form-input"
          id="image"
          name="image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => void handleImageUpload(e)}
          onBlur={() => handleBlur('image')}
        />
        {imageError && <span className="error">{imageError}</span>}
        {getFieldError('image') && !imageBase64 && (
          <span className="error">{getFieldError('image')}</span>
        )}
        {imageBase64 && <img src={imageBase64} alt="Preview" className="image-preview" />}
      </div>

      <div className="form-field">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          className="form-input"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
        />
        <PasswordIndicator password={password} />
        {getFieldError('password') && <span className="error">{getFieldError('password')}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword" className="label">
          Confirm Password
        </label>
        <input
          className="form-input"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          onBlur={() => handleBlur('confirmPassword')}
        />
        {getFieldError('confirmPassword') && (
          <span className="error">{getFieldError('confirmPassword')}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="country" className="label">
          Country
        </label>
        <input
          className="form-input"
          id="country"
          name="country"
          list="countries-list"
          autoComplete="off"
          onBlur={() => handleBlur('country')}
        />
        <datalist id="countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {getFieldError('country') && <span className="error">{getFieldError('country')}</span>}
      </div>

      <div className="form-field checkbox">
        <label className="label" htmlFor="terms">
          <input
            id="terms"
            type="checkbox"
            name="termsAccepted"
            onBlur={() => handleBlur('termsAccepted')}
          />
          I accept the Terms and Conditions
        </label>
        {getFieldError('termsAccepted') && (
          <span className="error">{getFieldError('termsAccepted')}</span>
        )}
      </div>

      <div className="button-group">
        <button type="submit" className="form-btn submit-btn">
          Submit
        </button>
        <button type="button" className="form-btn cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

import '~/app/styles/components/Form.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useImageUpload } from '~/hooks/useImageUpload';
import { useSubmissionStore } from '~/store/submissionStore';
import type { FormData } from '~/types';
import { formSchema } from '~/utils/validation';

import { PasswordIndicator } from '../password-indicator';

type Props = {
  onClose: () => void;
};

export const ReactHookForm = ({ onClose }: Props) => {
  const addSubmission = useSubmissionStore((state) => state.addSubmission);
  const countries = useSubmissionStore((state) => state.countries);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      gender: '',
      age: null,
    },
  });

  const { imageBase64, imageError, handleImageUpload } = useImageUpload();
  const password = watch('password');

  const onSubmit = (data: FormData) => {
    const submission = {
      ...data,
      image: imageBase64,
      id: crypto.randomUUID(),
      submittedAt: new Date(),
    };

    console.log('React Hook Form Data:', submission);
    addSubmission(submission);
    onClose();
  };

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="form-container">
      <div className="form-field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          className="form-input"
          id="name"
          type="text"
          autoComplete="name"
          {...register('name')}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="age" className="label">
          Age
        </label>
        <input
          className="form-input"
          id="age"
          type="number"
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          className="form-input"
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-field">
        <span className="label">Gender</span>
        <div className="radio-group">
          <label className="label" htmlFor="gender-male">
            <input id="gender-male" type="radio" value="male" {...register('gender')} />
            Male
          </label>
          <label className="label" htmlFor="gender-female">
            <input id="gender-female" type="radio" value="female" {...register('gender')} />
            Female
          </label>
        </div>
        {errors.gender && <span className="error">{errors.gender.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="image" className="label">
          Profile Image (PNG/JPEG, max 2MB)
        </label>
        <input
          className="form-input"
          id="image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => void handleImageUpload(e)}
        />
        {imageError && <span className="error">{imageError}</span>}
        {errors.image && !imageBase64 && <span className="error">{errors.image.message}</span>}
        {imageBase64 && <img src={imageBase64} alt="Preview" className="image-preview" />}
      </div>

      <div className="form-field">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          className="form-input"
          id="password"
          type="password"
          autoComplete="new-password"
          {...register('password')}
        />
        <PasswordIndicator password={password} />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword" className="label">
          Confirm Password
        </label>
        <input
          className="form-input"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="country" className="label">
          Country
        </label>
        <input
          className="form-input"
          id="country"
          list="countries-list"
          autoComplete="off"
          {...register('country')}
        />
        <datalist id="countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <span className="error">{errors.country.message}</span>}
      </div>

      <div className="form-field checkbox">
        <label className="label" htmlFor="terms">
          <input id="terms" type="checkbox" {...register('termsAccepted')} />I accept the Terms and
          Conditions
        </label>
        {errors.termsAccepted && <span className="error">{errors.termsAccepted.message}</span>}
      </div>

      <div className="button-group">
        <button type="submit" className="form-btn submit-btn" disabled={!isValid || !isDirty}>
          Submit
        </button>
        <button type="button" className="form-btn cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

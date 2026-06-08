import '~/app/styles/components/Form.css';

import { useForm } from 'react-hook-form';

import { useImageUpload } from '~/hooks/useImageUpload';
import { useSubmissionStore } from '~/store/submissionStore';
import { type FormData } from '~/types';

import { PasswordIndicator } from '../password-indicator';

type Props = {
  onClose: VoidFunction;
};

export const ReactHookForm = ({ onClose }: Props) => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const { imageBase64, imageError, handleImageUpload } = useImageUpload();

  const countries = useSubmissionStore((state) => state.countries);
  const password = watch('password');

  const onSubmit = (data: FormData) => {
    const formData = {
      ...data,
      image: imageBase64,
    };
    console.log('React Hook Form Data:', formData);
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
      </div>

      <div className="form-field">
        <label htmlFor="rhf-image" className="label">
          Profile Image (PNG/JPEG, max 2MB)
        </label>
        <input
          className="form-input"
          id="rhf-image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => void handleImageUpload(e)}
        />
        {imageError && <span className="error">{imageError}</span>}
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
      </div>

      <div className="form-field checkbox">
        <label className="label" htmlFor="terms">
          <input id="terms" type="checkbox" {...register('termsAccepted')} />I accept the Terms and
          Conditions
        </label>
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

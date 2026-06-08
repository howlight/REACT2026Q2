import '~/app/styles/components/Form.css';

import { type FormEvent, useState } from 'react';

import { useImageUpload } from '~/hooks/useImageUpload';
import { useSubmissionStore } from '~/store/submissionStore';

import { PasswordIndicator } from '../password-indicator';

type Props = {
  onClose: VoidFunction;
};

export const UncontrolledForm = ({ onClose }: Props) => {
  const [password, setPassword] = useState('');
  const { imageBase64, imageError, handleImageUpload } = useImageUpload();

  const countries = useSubmissionStore((state) => state.countries);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      email: formData.get('email'),
      gender: formData.get('gender'),
      termsAccepted: formData.get('termsAccepted'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      country: formData.get('country'),
      image: imageBase64,
    };

    console.log('Uncontrolled Form Data:', formValues);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input className="form-input" id="name" name="name" type="text" autoComplete="name" />
      </div>

      <div className="form-field">
        <label htmlFor="age" className="label">
          Age
        </label>
        <input className="form-input" id="age" name="age" type="number" />
      </div>

      <div className="form-field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input className="form-input" id="email" name="email" type="email" autoComplete="email" />
      </div>

      <div className="form-field">
        <span className="label">Gender</span>
        <div className="radio-group">
          <label className="label" htmlFor="gender-male">
            <input id="gender-male" type="radio" name="gender" value="male" />
            Male
          </label>
          <label className="label" htmlFor="gender-female">
            <input id="gender-female" type="radio" name="gender" value="female" />
            Female
          </label>
        </div>
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
        />
        {imageError && <span className="error">{imageError}</span>}
        {imageBase64 && <img src={imageBase64} alt="Preview Image" className="image-preview" />}
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
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
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
        />
        <datalist id="countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      <div className="form-field checkbox">
        <label className="label" htmlFor="terms">
          <input id="terms" type="checkbox" name="termsAccepted" />I accept the Terms and Conditions
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

import '~/app/styles/components/Form.css';

import { type FormEvent } from 'react';

type Props = {
  onClose: () => void;
};

export const UncontrolledForm = ({ onClose }: Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      email: formData.get('email'),
      gender: formData.get('gender'),
      termsAccepted: formData.get('termsAccepted'),
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

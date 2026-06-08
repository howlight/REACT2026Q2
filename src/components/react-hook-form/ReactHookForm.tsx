import '~/app/styles/components/Form.css';

import { useForm } from 'react-hook-form';

import { type FormData } from '~/types';

type Props = {
  onClose: () => void;
};

export const ReactHookForm = ({ onClose }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('React Hook Form Data:', data);
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

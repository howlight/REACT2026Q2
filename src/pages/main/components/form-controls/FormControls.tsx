import './FormControls.css';

type Props = {
  onOpenForm: (type: 'uncontrolled' | 'rhf') => void;
};

export const FormControls = ({ onOpenForm }: Props) => (
  <div className="form-controls">
    <button className="btn btn-primary" onClick={() => onOpenForm('uncontrolled')}>
      Open Uncontrolled Form
    </button>
    <button className="btn btn-secondary" onClick={() => onOpenForm('rhf')}>
      Open React Hook Form
    </button>
  </div>
);

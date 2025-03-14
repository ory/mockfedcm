import cn from 'clsx';

export interface SelectProps {
  className: string;
  label: string;
  name: string;
  id: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
}

const Select = ({
  className,
  label,
  name,
  id,
  value,
  required,
  onChange,
  options,
}: SelectProps) => {
  return (
    <div className={`form-control ${cn(className)}`}>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <select
        name={name}
        id={id}
        className='select select-bordered w-full'
        required={required}
        value={value}
        onChange={onChange}
      >
        <option value='' disabled>
          Select a {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

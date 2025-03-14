import cn from 'clsx';

export interface CheckboxProps {
  className: string;
  label: string;
  name: string;
  id: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({
  className,
  label,
  name,
  id,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className={cn('form-control', className)}>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <input
        type='checkbox'
        name={name}
        id={id}
        className='input input-bordered w-full'
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default CheckBox;

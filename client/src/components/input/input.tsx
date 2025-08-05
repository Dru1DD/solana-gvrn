import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ type = 'text', label, placeholder, value, onChange, className, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor="input">{label}</label>
      <input
        id="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;

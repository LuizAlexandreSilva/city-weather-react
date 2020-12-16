import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib/esm/iconBase';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  className,
  ...rest
}) => {
  return (
    <div className={'flex bg-gray-50 rounded ' + className}>
      <input className="h-full w-full px-4 bg-transparent" {...rest} />
      {Icon && (
        <Icon
          size={20}
          className="flex items-center text-blue-450 h-full bg-gray-50 mr-4"
        />
      )}
    </div>
  );
};

export default Input;

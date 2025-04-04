// 'use client' 
import { ReactElement, ReactNode } from 'react';
// import { useRouter } from 'next/navigation'

type ButtonProps = {
  type: 'button' | 'submit';
  title?: string | ReactElement
  icon?: ReactElement;
  variant?: 'filled' | 'bordered' | 'default' | 'text';
  height?: number;
  width?: number;
  color?: 'dominant' | 'accent' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large' | 'long' | 'fullWidth' | 'normal';
  onClick?: () => void;
  className?: string
  disabled?: boolean
  children?: ReactNode;
  role?: any
  value?: string
  href?:string;
};

const Button = ({
  type,
  title,
  icon,
  variant = 'bordered',
  color = 'dominant',
  size = 'medium',
  height,
  width,
  onClick,
  className='',
  disabled = false,
  children,
  role,
  value,
  href,
}: ButtonProps) => {
  // const router = useRouter()
  
  const colorStyles: Record<string, string> = {
    dominant: 'blueMain',
    accent: 'black-main',
    danger: 'red',
    success: 'green',
  };

  const baseStyles = 'flexCenter gap-2 rounded-md cursor-pointer';

  const variantStyles = {
    filled: {
      dominant: 'bg-blueMain-500 text-white hover:bg-blue-800',
      accent: 'bg-gray-500 text-white hover:bg-gray-600',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
    },
    bordered: {
      dominant: 'border-2 border-blueMain-500 text-blueMain-500 hover:bg-gray-100',
      accent: 'border-2 border-gray-500 text-gray-500 hover:bg-gray-100',
      danger: 'border-2 border-red-500 text-red-500 hover:bg-red-100',
      success: 'border-2 border-green-500 text-green-500 hover:bg-green-100',
    },
    default: {
      dominant: 'text-blueMain-500 bg-gray-100 hover:bg-gray-200',
      accent: 'text-gray-500 bg-gray-100 hover:bg-gray-200',
      danger: 'text-red-500 bg-gray-100 hover:bg-gray-200',
      success: 'text-green-500 bg-gray-100 hover:bg-gray-200',
    },
    text: {
      dominant: 'text-blueMain-300 font-semibold hover:text-blue-900 hover:transforn hover:scale-110',
      accent: 'text-gray-500 hover:text-gray-200',
      danger: 'text-red-500 hover:text-gray-200',
      success: 'text-green-500 hover:text-gray-200',
    },
  };

  const appliedVariantStyles = variantStyles[variant]?.[color];

  const sizeStyles: Record<string, string> = {
    small: 'text-sm  px-4 py-2',
    medium: 'text-md  px-4 py-2 cursor-pointer text-blueMain-500',
    large: 'text-lg  px-4 py-2',
    long: 'text-md  px-4 py-2',
    fullWidth: 'w-full text-md px-4 py-2',
    normal: 'text-md px-4 py-2',
  };

  return (
      <button
      type={type}
      className={`${className} ${baseStyles} ${appliedVariantStyles} ${sizeStyles[size]}`}
      disabled={disabled}
      // onClick={() => router.push('/')}
      onClick={onClick}
      role={role}
      value={value}
    >
      {icon && <span>{icon}</span>}
      <label className="whitespace-nowrap cursor-pointer">{title}</label>
      {children}
    </button>
  );
};

export default Button;
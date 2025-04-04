import React from 'react'

interface SpinnerProps {
    size?: number;
    color?: "dominant" | "accent" | "danger" | "success";
    className?: string;
    enableText?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
    size = 30,
    color,
    className,
    enableText = false
}) => {

    const getColorClasses = () => {
        switch (color) {
          case "dominant":
            return "text-blueMain-500";
          case "accent":
            return "bg-gray-500";
          case "danger":
            return "bg-red-500";
          case "success":
            return "bg-green-500";
          default:
            return "";
        }
      };
    return (
        <div className="text-gray-800">
          <div 
        className={`animate-spin rounded-full border-4
        border-t-4 ${getColorClasses()} ${className}`}
        style={{
            width: size,
            height: size,
            borderColor: 'transparent',
            borderTopColor: 'currentcolor'
        }}
        >
        </div>
        {enableText ? <p className="animate-pulse mt-2">Loading...</p> : null}
        </div>
    )
}

export default Spinner
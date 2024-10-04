import React from "react";
import { Link } from "lucide-react";

const ShareButton = ({ onClick, disabled = false, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-8 h-8 
        bg-white 
        rounded
        border border-gray-200
        shadow-[0_1px_2px_rgba(0,0,0,0.06)]
        flex items-center justify-center 
        transition-all duration-200 
        hover:bg-gray-50
        active:bg-gray-100
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label="View"
    >
      <Link className="w-4 h-4 text-gray-600" strokeWidth={2} />
    </button>
  );
};

export default ShareButton;

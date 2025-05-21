// src/components/ui/ValueTooltip.tsx
import React from "react";

interface ValueTooltipProps {
  title: string;
  content: string | React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const ValueTooltip: React.FC<ValueTooltipProps> = ({
  title,
  content,
  position = "top",
}) => {
  // Position classes based on the position prop
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  // Arrow classes based on the position prop
  const arrowClasses = {
    top: "absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 bg-gray-900 w-2 h-2",
    bottom:
      "absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 bg-gray-900 w-2 h-2",
    left: "absolute -right-1 top-1/2 transform -translate-y-1/2 rotate-45 bg-gray-900 w-2 h-2",
    right:
      "absolute -left-1 top-1/2 transform -translate-y-1/2 rotate-45 bg-gray-900 w-2 h-2",
  };

  return (
    <div
      className={`absolute z-50 ${positionClasses[position]} bg-gray-900 text-white p-2 rounded shadow-lg w-48 invisible group-hover:visible`}
    >
      <div className={arrowClasses[position]}></div>
      <div className="font-medium text-sm mb-1">{title}</div>
      <div className="text-xs opacity-90">{content}</div>
    </div>
  );
};

export default ValueTooltip;

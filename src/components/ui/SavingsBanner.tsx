import React from "react";
import { formatCurrency } from "../../utils/formatters";

interface SavingsBannerProps {
  savingsAmount: number;
}

const SavingsBanner: React.FC<SavingsBannerProps> = ({ savingsAmount }) => {
  if (savingsAmount <= 0) return null;

  return (
    <div className="bg-blue-600 p-3 rounded-lg flex items-center mt-4">
      <span className="mr-2">🎉</span>
      <span>You are going to save upto ₹ {formatCurrency(savingsAmount)}</span>
    </div>
  );
};

export default SavingsBanner;

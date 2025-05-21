import React from "react";
import { useHarvesting } from "../../hooks/useHarvesting";
import { formatCurrency } from "../../utils/formatters";
import { calculateNetGains } from "../../utils/calculator";
import LoadingSpinner from "../ui/LoadingSpinner";
import SavingsBanner from "../ui/SavingsBanner";

const AfterHarvestingCard: React.FC = () => {
  const { capitalGains, effectiveCapitalGains, savingsAmount, isLoading } =
    useHarvesting();

  if (isLoading) {
    return (
      <div className="bg-blue-500 rounded-lg shadow p-6 h-64 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!capitalGains || !effectiveCapitalGains) {
    return (
      <div className="bg-blue-500 rounded-lg shadow p-6 text-white">
        <p>Failed to load capital gains data.</p>
      </div>
    );
  }

  const afterGains = calculateNetGains(effectiveCapitalGains);

  return (
    <div className="bg-blue-500 rounded-lg shadow p-6 text-white">
      <h2 className="text-xl font-bold mb-4">After Harvesting</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div></div>
        <div className="text-center font-medium">Short-term</div>
        <div className="text-center font-medium">Long-term</div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="font-medium">Profits</div>
        <div className="text-right">
          ₹ {formatCurrency(effectiveCapitalGains.stcg.profits)}
        </div>
        <div className="text-right">
          ₹ {formatCurrency(effectiveCapitalGains.ltcg.profits)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="font-medium">Losses</div>
        <div className="text-right">
          - ₹ {formatCurrency(effectiveCapitalGains.stcg.losses)}
        </div>
        <div className="text-right">
          - ₹ {formatCurrency(effectiveCapitalGains.ltcg.losses)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="font-medium">Net Capital Gains</div>
        <div className="text-right">
          {afterGains.stcgNet < 0 ? "- " : ""}₹{" "}
          {formatCurrency(Math.abs(afterGains.stcgNet))}
        </div>
        <div className="text-right">
          {afterGains.ltcgNet < 0 ? "- " : ""}₹{" "}
          {formatCurrency(Math.abs(afterGains.ltcgNet))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-blue-400">
        <div className="font-semibold text-lg">Effective Capital Gains:</div>
        <div className="font-bold text-xl">
          {afterGains.realisedGains < 0 ? "- " : ""}₹{" "}
          {formatCurrency(Math.abs(afterGains.realisedGains))}
        </div>
      </div>

      <SavingsBanner savingsAmount={savingsAmount} />
    </div>
  );
};

export default AfterHarvestingCard;

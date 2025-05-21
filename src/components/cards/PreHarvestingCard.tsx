import React from "react";
import { useHarvesting } from "../../hooks/useHarvesting";
import { formatCurrency } from "../../utils/formatters";
import { calculateNetGains } from "../../utils/calculator";
import LoadingSpinner from "../ui/LoadingSpinner";

const PreHarvestingCard: React.FC = () => {
  const { capitalGains, isLoading } = useHarvesting();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-64 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!capitalGains) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-red-500">Failed to load capital gains data.</p>
      </div>
    );
  }

  const { stcgNet, ltcgNet, realisedGains } = calculateNetGains(capitalGains);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Pre Harvesting</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div></div>
        <div className="text-center font-medium text-gray-600">Short-term</div>
        <div className="text-center font-medium text-gray-600">Long-term</div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="font-medium">Profits</div>
        <div className="text-right">
          ₹ {formatCurrency(capitalGains.stcg.profits)}
        </div>
        <div className="text-right">
          ₹ {formatCurrency(capitalGains.ltcg.profits)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="font-medium">Losses</div>
        <div className="text-right text-red-500">
          - ₹ {formatCurrency(capitalGains.stcg.losses)}
        </div>
        <div className="text-right text-red-500">
          - ₹ {formatCurrency(capitalGains.ltcg.losses)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="font-medium">Net Capital Gains</div>
        <div className={`text-right ${stcgNet < 0 ? "text-red-500" : ""}`}>
          {stcgNet < 0 ? "- " : ""}₹ {formatCurrency(Math.abs(stcgNet))}
        </div>
        <div className={`text-right ${ltcgNet < 0 ? "text-red-500" : ""}`}>
          {ltcgNet < 0 ? "- " : ""}₹ {formatCurrency(Math.abs(ltcgNet))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <div className="font-semibold text-lg">Realised Capital Gains:</div>
        <div
          className={`font-bold text-xl ${
            realisedGains < 0 ? "text-red-500" : ""
          }`}
        >
          {realisedGains < 0 ? "- " : ""}₹{" "}
          {formatCurrency(Math.abs(realisedGains))}
        </div>
      </div>
    </div>
  );
};

export default PreHarvestingCard;

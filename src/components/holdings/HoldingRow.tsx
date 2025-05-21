// src/components/holdings/HoldingRow.tsx
import React from "react";
import type { Holding } from "../../services/types/Holdings";
import { formatCurrency, formatNumber } from "../../utils/formatters";
import Checkbox from "../ui/Checkbox";
import ValueTooltip from "../ui/ValueTooltip";

interface HoldingRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggleSelect: (coin: string) => void;
}

const HoldingRow: React.FC<HoldingRowProps> = ({
  holding,
  isSelected,
  onToggleSelect,
}) => {
  const totalValue = holding.currentPrice * holding.totalHolding;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-4">
        <Checkbox
          checked={isSelected}
          onChange={() => onToggleSelect(holding.coin)}
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center">
          <img
            src={holding.logo}
            alt={holding.coinName}
            className="w-8 h-8 mr-3 rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
            }}
          />
          <div>
            <div className="font-medium">{holding.coinName}</div>
            <div className="text-xs text-gray-500">{holding.coin}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="group relative">
          {formatNumber(holding.totalHolding)} {holding.coin}
          <ValueTooltip
            title="Holdings Information"
            content={
              <div>
                <div>
                  Total: {formatNumber(holding.totalHolding)} {holding.coin}
                </div>
                <div>
                  Avg Buy Price: ₹ {formatNumber(holding.averageBuyPrice, 2)}
                </div>
                <div>
                  Current Price: ₹ {formatNumber(holding.currentPrice, 2)}
                </div>
              </div>
            }
          />
        </div>
        <div className="text-xs text-gray-500">
          ₹ {formatNumber(holding.averageBuyPrice, 2)}/{holding.coin}
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="group relative">
          ₹ {formatCurrency(totalValue)}
          <ValueTooltip
            title="Current Value"
            content={`${holding.totalHolding} ${holding.coin} × ₹${formatNumber(
              holding.currentPrice,
              2
            )} = ₹${formatCurrency(totalValue)}`}
          />
        </div>
      </td>
      <td
        className={`py-3 px-4 text-right ${
          holding.stcg.gain < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        <div className="group relative">
          {holding.stcg.gain < 0 ? "-" : ""}₹{" "}
          {formatCurrency(Math.abs(holding.stcg.gain))}
          <ValueTooltip
            title="Short-term Capital Gain"
            content={
              <div>
                <div>
                  Balance: {formatNumber(holding.stcg.balance)} {holding.coin}
                </div>
                <div>
                  Gain/Loss: {holding.stcg.gain < 0 ? "-" : ""}₹{" "}
                  {formatCurrency(Math.abs(holding.stcg.gain))}
                </div>
                <div className="mt-1 text-xs">
                  Short-term gains are from assets held for less than 12 months.
                </div>
              </div>
            }
          />
        </div>
        <div className="text-xs text-gray-500">
          {formatNumber(holding.stcg.balance)} {holding.coin}
        </div>
      </td>
      <td
        className={`py-3 px-4 text-right ${
          holding.ltcg.gain < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        <div className="group relative">
          {holding.ltcg.gain < 0 ? "-" : ""}₹{" "}
          {formatCurrency(Math.abs(holding.ltcg.gain))}
          <ValueTooltip
            title="Long-term Capital Gain"
            content={
              <div>
                <div>
                  Balance: {formatNumber(holding.ltcg.balance)} {holding.coin}
                </div>
                <div>
                  Gain/Loss: {holding.ltcg.gain < 0 ? "-" : ""}₹{" "}
                  {formatCurrency(Math.abs(holding.ltcg.gain))}
                </div>
                <div className="mt-1 text-xs">
                  Long-term gains are from assets held for more than 12 months.
                </div>
              </div>
            }
          />
        </div>
        <div className="text-xs text-gray-500">
          {formatNumber(holding.ltcg.balance)} {holding.coin}
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        {isSelected ? formatNumber(holding.totalHolding) : "-"}
      </td>
    </tr>
  );
};

export default HoldingRow;

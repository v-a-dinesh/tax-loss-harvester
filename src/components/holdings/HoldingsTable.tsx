// src/components/holdings/HoldingsTable.tsx
import React, { useState } from "react";
import { useHarvesting } from "../../hooks/useHarvesting";
import HoldingRow from "./HoldingRow";
import Checkbox from "../ui/Checkbox";
import LoadingSpinner from "../ui/LoadingSpinner";


// Define sort types
type SortField = "stcg" | "ltcg" | null;
type SortDirection = "asc" | "desc";

const HoldingsTable: React.FC = () => {
  const {
    holdings,
    selectedHoldingIds,
    toggleHoldingSelection,
    toggleSelectAll,
    isLoading,
  } = useHarvesting();
  const [showAll, setShowAll] = useState(false);

  // Add sorting state
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mt-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!holdings || holdings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <p className="text-center text-gray-500">No holdings available.</p>
      </div>
    );
  }

  // Handle column header click for sorting
  const handleSortClick = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Sort the holdings
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (sortField === "stcg") {
      return sortDirection === "asc"
        ? a.stcg.gain - b.stcg.gain
        : b.stcg.gain - a.stcg.gain;
    } else if (sortField === "ltcg") {
      return sortDirection === "asc"
        ? a.ltcg.gain - b.ltcg.gain
        : b.ltcg.gain - a.ltcg.gain;
    }
    return 0;
  });

  // Display only first 5 holdings if not showing all
  const displayedHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow mt-8 overflow-hidden">
      <h2 className="text-xl font-bold p-6 pb-4">Holdings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left">
                <Checkbox
                  checked={
                    selectedHoldingIds.length === holdings.length &&
                    holdings.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-500">
                Asset
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-500">
                <div>Holdings</div>
                <div className="text-xs font-normal">Current Market Rate</div>
              </th>
              <th className="py-3 px-4 text-right font-medium text-gray-500">
                Total Current Value
              </th>

              {/* Sortable Short-term column */}
              <th
                className="py-3 px-4 text-right font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSortClick("stcg")}
              >
                <div className="flex items-center justify-end">
                  Short-term
                  {sortField === "stcg" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>

              {/* Sortable Long-term column */}
              <th
                className="py-3 px-4 text-right font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSortClick("ltcg")}
              >
                <div className="flex items-center justify-end">
                  Long-Term
                  {sortField === "ltcg" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>

              <th className="py-3 px-4 text-center font-medium text-gray-500">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedHoldings.map((holding) => (
              <HoldingRow
                key={holding.coin}
                holding={holding}
                isSelected={selectedHoldingIds.includes(holding.coin)}
                onToggleSelect={toggleHoldingSelection}
              />
            ))}
          </tbody>
        </table>
      </div>

      {holdings.length > 5 && (
        <div className="px-6 py-3 border-t border-gray-200">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;

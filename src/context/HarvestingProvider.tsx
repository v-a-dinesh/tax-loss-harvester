import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { HarvestingContext } from "./HarvestingContext";
import { fetchHoldings, fetchCapitalGains } from "../services/api";
import type { Holding } from "../services/types/Holdings";
import type { CapitalGains } from "../services/types/CapitalGains";
import { calculateEffectiveGains } from "../utils/calculator";

interface HarvestingProviderProps {
  children: ReactNode;
}

export const HarvestingProvider: React.FC<HarvestingProviderProps> = ({
  children,
}) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [selectedHoldingIds, setSelectedHoldingIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [effectiveCapitalGains, setEffectiveCapitalGains] =
    useState<CapitalGains | null>(null);
  const [savingsAmount, setSavingsAmount] = useState<number>(0);

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);

        setHoldings(holdingsData);
        setCapitalGains(gainsData.capitalGains);
        setEffectiveCapitalGains(gainsData.capitalGains);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Get selected holdings based on IDs
  const selectedHoldings = holdings.filter((holding) =>
    selectedHoldingIds.includes(holding.coin)
  );

  // Calculate effective capital gains and savings when selections change
  useEffect(() => {
    if (!capitalGains) return;

    if (selectedHoldings.length === 0) {
      // If no holdings selected, reset to original values
      setEffectiveCapitalGains(capitalGains);
      setSavingsAmount(0);
      return;
    }

    // Calculate new gains based on selected holdings
    const newEffectiveGains = calculateEffectiveGains(
      capitalGains,
      selectedHoldings
    );
    setEffectiveCapitalGains(newEffectiveGains);

    // Calculate savings (original realized gains - new realized gains)
    const originalNet =
      capitalGains.stcg.profits -
      capitalGains.stcg.losses +
      (capitalGains.ltcg.profits - capitalGains.ltcg.losses);

    const newNet =
      newEffectiveGains.stcg.profits -
      newEffectiveGains.stcg.losses +
      (newEffectiveGains.ltcg.profits - newEffectiveGains.ltcg.losses);

    const savings = originalNet - newNet;
    setSavingsAmount(savings > 0 ? savings : 0);
  }, [selectedHoldings, capitalGains]);

  // Toggle selection of a holding
  const toggleHoldingSelection = (holdingId: string) => {
    setSelectedHoldingIds((prev) =>
      prev.includes(holdingId)
        ? prev.filter((id) => id !== holdingId)
        : [...prev, holdingId]
    );
  };

  // Toggle selection of all holdings
  const toggleSelectAll = () => {
    setSelectedHoldingIds(
      selectedHoldingIds.length === holdings.length
        ? [] // Deselect all if all are selected
        : holdings.map((h) => h.coin) // Select all if not all are selected
    );
  };

  const contextValue = {
    holdings,
    capitalGains,
    selectedHoldingIds,
    isLoading,
    error,
    effectiveCapitalGains,
    toggleHoldingSelection,
    toggleSelectAll,
    selectedHoldings,
    savingsAmount,
  };

  return (
    <HarvestingContext.Provider value={contextValue}>
      {children}
    </HarvestingContext.Provider>
  );
};

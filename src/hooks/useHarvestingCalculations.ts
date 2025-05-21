import { useMemo } from "react";
import type { Holding } from "../services/types/Holdings";
import type { CapitalGains } from "../services/types/CapitalGains";
import { calculateNetGains } from "../utils/calculator";

/**
 * Custom hook for handling tax harvesting calculations
 */
const useHarvestingCalculations = (
  capitalGains: CapitalGains | null,
  effectiveGains: CapitalGains | null,
  selectedHoldings: Holding[]
) => {
  // Calculate original gains
  const originalGainsData = useMemo(() => {
    if (!capitalGains) return null;
    return calculateNetGains(capitalGains);
  }, [capitalGains]);

  // Calculate effective gains after harvesting
  const effectiveGainsData = useMemo(() => {
    if (!effectiveGains) return null;
    return calculateNetGains(effectiveGains);
  }, [effectiveGains]);

  // Calculate savings amount
  const savingsAmount = useMemo(() => {
    if (!originalGainsData || !effectiveGainsData) return 0;

    const savings =
      originalGainsData.realisedGains - effectiveGainsData.realisedGains;
    return savings > 0 ? savings : 0;
  }, [originalGainsData, effectiveGainsData]);

  // Check if showing savings message is appropriate
  const showSavings = savingsAmount > 0;

  // Calculate total harvest value
  const totalHarvestValue = useMemo(() => {
    return selectedHoldings.reduce((total, holding) => {
      return total + holding.currentPrice * holding.totalHolding;
    }, 0);
  }, [selectedHoldings]);

  return {
    originalGainsData,
    effectiveGainsData,
    savingsAmount,
    showSavings,
    totalHarvestValue,
  };
};

export default useHarvestingCalculations;

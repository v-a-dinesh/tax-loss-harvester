import { createContext } from "react";
import type { Holding } from "../services/types/Holdings";
import type { CapitalGains } from "../services/types/CapitalGains";

interface HarvestingContextType {
  holdings: Holding[];
  capitalGains: CapitalGains | null;
  selectedHoldingIds: string[];
  isLoading: boolean;
  error: string | null;
  effectiveCapitalGains: CapitalGains | null;
  toggleHoldingSelection: (holdingId: string) => void;
  toggleSelectAll: () => void;
  selectedHoldings: Holding[];
  savingsAmount: number;
}

// Create context with undefined as default value
export const HarvestingContext = createContext<
  HarvestingContextType | undefined
>(undefined);

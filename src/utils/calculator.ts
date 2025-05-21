// src/utils/calculator.ts
import type { CapitalGains } from "../services/types/CapitalGains";
import type { Holding } from "../services/types/Holdings";

/**
 * Calculate net gains from capital gains data
 */
export const calculateNetGains = (gains: CapitalGains) => {
  const stcgNet = gains.stcg.profits - gains.stcg.losses;
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;
  const realisedGains = stcgNet + ltcgNet;

  return { stcgNet, ltcgNet, realisedGains };
};

/**
 * Calculate effective capital gains after harvesting
 */
export const calculateEffectiveGains = (
  originalGains: CapitalGains,
  selectedHoldings: Holding[]
): CapitalGains => {
  // Create a deep copy of the original gains
  const effectiveGains: CapitalGains = {
    stcg: {
      profits: originalGains.stcg.profits,
      losses: originalGains.stcg.losses,
    },
    ltcg: {
      profits: originalGains.ltcg.profits,
      losses: originalGains.ltcg.losses,
    },
  };

  // Apply the effects of selected holdings
  selectedHoldings.forEach((holding) => {
    // Short-term capital gains/losses
    if (holding.stcg.gain > 0) {
      effectiveGains.stcg.profits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      effectiveGains.stcg.losses += Math.abs(holding.stcg.gain);
    }

    // Long-term capital gains/losses
    if (holding.ltcg.gain > 0) {
      effectiveGains.ltcg.profits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      effectiveGains.ltcg.losses += Math.abs(holding.ltcg.gain);
    }
  });

  return effectiveGains;
};

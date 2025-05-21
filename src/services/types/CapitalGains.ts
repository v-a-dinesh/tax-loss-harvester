export interface CapitalGains {
  stcg: {
    profits: number;
    losses: number;
  };
  ltcg: {
    profits: number;
    losses: number;
  };
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}

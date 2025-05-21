import { holdingsData } from "./mockData/holdingsData";
import { capitalGainsData } from "./mockData/capitalGainsData";
import type { Holding } from "./types/Holdings";
import type { CapitalGainsResponse } from "./types/CapitalGains";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchHoldings = async (): Promise<Holding[]> => {
  await delay(800); // Simulate network delay
  return [...holdingsData];
};

export const fetchCapitalGains = async (): Promise<CapitalGainsResponse> => {
  await delay(600); // Simulate network delay
  return { ...capitalGainsData };
};

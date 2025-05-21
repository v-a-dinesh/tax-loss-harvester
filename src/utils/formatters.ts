/**
 * Format a number as currency
 */
export const formatCurrency = (
  value: number,
  maximumFractionDigits = 0
): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits,
  }).format(Math.abs(value));
};

/**
 * Format a number with the specified decimal places
 */
export const formatNumber = (value: number, decimals = 4): string => {
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toExponential(2);
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
};

/**
 * Format percentage values
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

/**
 * Truncate text with ellipsis if it exceeds a certain length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Utility functions for formatting financial data safely.
 */

export function formatCurrency(value) {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value));
}

export function formatPercent(value) {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "N/A";
  }

  return `${Number(value).toFixed(2)}%`;
}

export function formatScore(value) {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "N/A";
  }

  return `${Math.round(Number(value))}/100`;
}

export function formatNumber(value, decimals = 2) {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "N/A";
  }

  return Number(value).toFixed(decimals);
}

/**
 * Capitalizes a string helper.
 * @param {string} str 
 * @returns {string}
 */
export function capitalize(str) {
  if (!str || typeof str !== 'string') return 'N/A';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function hasActiveWithdrawalProduct(
  products: ReadonlyArray<{ isActive: boolean; daysRemaining: number }>,
): boolean {
  return products.some((product) => product.isActive && product.daysRemaining > 0);
}

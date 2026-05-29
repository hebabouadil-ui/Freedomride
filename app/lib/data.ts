// Module-level in-memory store — persists between requests on the same server instance.
// Initialized from the hardcoded defaults in lib/store.ts.

import { defaultBikes, defaultPricing, type Bike, type PricingPlan } from "@/lib/store";

// Shallow-copy so mutations don't affect the originals
let bikes: Bike[] = [...defaultBikes];
let pricingPlans: PricingPlan[] = [...defaultPricing];

export function getBikes(): Bike[] {
  return bikes;
}

export function setBikes(next: Bike[]): void {
  bikes = next;
}

export function getPricingPlans(): PricingPlan[] {
  return pricingPlans;
}

export function setPricingPlans(next: PricingPlan[]): void {
  pricingPlans = next;
}

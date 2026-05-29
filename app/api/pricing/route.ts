import { NextResponse } from "next/server";
import { getPricingPlans, setPricingPlans } from "@/app/lib/data";
import type { PricingPlan } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getPricingPlans());
}

export async function POST(request: Request) {
  const body: PricingPlan[] = await request.json();
  setPricingPlans(body);
  return NextResponse.json({ ok: true });
}

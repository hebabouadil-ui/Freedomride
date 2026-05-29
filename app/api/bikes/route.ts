import { NextResponse } from "next/server";
import { getBikes, setBikes } from "@/app/lib/data";
import type { Bike } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getBikes());
}

export async function POST(request: Request) {
  const body: Bike[] = await request.json();
  setBikes(body);
  return NextResponse.json({ ok: true });
}

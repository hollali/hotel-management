import { NextResponse } from "next/server";
import { getPromotionByCode } from "@/app/libs/sanityFetch";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ valid: false, error: "Code is required" }, { status: 400 });
    }

    const promo = await getPromotionByCode(code);
    if (!promo) {
      return NextResponse.json({ valid: false, error: "Invalid promo code" }, { status: 404 });
    }

    const now = new Date();
    if (promo.validFrom && new Date(promo.validFrom) > now) {
      return NextResponse.json({ valid: false, error: "Promo code is not yet valid" }, { status: 400 });
    }
    if (promo.validUntil && new Date(promo.validUntil) < now) {
      return NextResponse.json({ valid: false, error: "Promo code has expired" }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      discountPercentage: promo.discountPercentage,
      title: promo.title,
      description: promo.description,
    });
  } catch {
    return NextResponse.json({ valid: false, error: "Failed to validate promo code" }, { status: 500 });
  }
}

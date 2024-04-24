import { CategoryService } from "@/services/CategoryService/category.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const filters = {
      search: searchParams.get('search') || undefined,
      count: Number(searchParams.get('count')) || undefined,
    };

    const categories = await CategoryService.getCategories(filters);

    return NextResponse.json({
      ok: true,
      data: categories,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        message: e?.message,
      },
      { status: e?.status || 500 }
    );
  }
}

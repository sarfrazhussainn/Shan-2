import { NextResponse } from "next/server";
import { careerSchema } from "@/lib/validators";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false }, { status: 400 });
  const data = Object.fromEntries(
    [...form.entries()].filter(([, v]) => typeof v === "string"),
  );
  const parsed = careerSchema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const cv = form.get("cv");
  if (cv instanceof File && cv.size > 0) {
    if (cv.type !== "application/pdf") return NextResponse.json({ ok: false, error: "CV must be a PDF" }, { status: 400 });
    if (cv.size > 5 * 1024 * 1024) return NextResponse.json({ ok: false, error: "CV must be under 5 MB" }, { status: 400 });
  }
  await sendMail("New Job Application", { ...parsed.data, cv: cv instanceof File ? cv.name : null });
  return NextResponse.json({ ok: true });
}

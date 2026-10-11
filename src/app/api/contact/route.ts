import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  await sendMail("New Contact Message", parsed.data);
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validators";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true }); // honeypot
  await sendMail("New Quote Request", parsed.data);
  return NextResponse.json({ ok: true });
}

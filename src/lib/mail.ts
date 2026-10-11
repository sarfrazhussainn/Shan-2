/**
 * Mock mail sender. Replace the body with a real provider (Resend / Nodemailer)
 * to deliver to QUOTE_RECIPIENT. Kept in one place so all forms share it.
 */
export const MAIL_RECIPIENT = "sarfrashussain12@gmail.com";

export async function sendMail(subject: string, payload: Record<string, unknown>) {
  console.log(`[mock-mail] to=${MAIL_RECIPIENT} subject="${subject}"`, payload);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}

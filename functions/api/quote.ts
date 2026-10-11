export async function onRequestPost(context: { request: Request }) {
  try {
    const body = await context.request.json().catch(() => null);
    if (!body || !body.name || !body.email || !body.phone || !body.service) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (body.website) {
      // Honeypot caught spam
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[Cloudflare Pages Quote] Sending email to sarfrashussain12@gmail.com", body);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Error";
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

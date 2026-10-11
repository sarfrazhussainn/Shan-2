export async function onRequestPost(context: { request: Request }) {
  try {
    const formData = await context.request.formData().catch(() => null);
    if (!formData) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid form data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const position = formData.get("position");
    const cv = formData.get("cv");

    if (!name || !email || !phone || !position) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[Cloudflare Pages Career] Received application from", { name, email, phone, position, cvName: cv instanceof File ? cv.name : null });

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

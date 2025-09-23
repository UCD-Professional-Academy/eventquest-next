export const runtime = "edge";

export async function GET() {
  return new Response(
    JSON.stringify(
      { ok: true, at: Date.now() },
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    )
  );
}

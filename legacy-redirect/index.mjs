// Preserves previously shared demo links after the H+ rename.
export default {
  fetch(request) {
    const current = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response(
        "This address has moved to https://h-plus.stephenovo.workers.dev",
        {
          status: 410,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }
    const destination = new URL(
      current.pathname + current.search,
      "https://h-plus.stephenovo.workers.dev",
    );
    return Response.redirect(destination.href, 308);
  },
};

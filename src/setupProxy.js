// Development only, loaded by `pnpm start`: there is no Netlify runtime locally, so this
// serves the contact function from the dev server, with the keys from .env.
module.exports = function setupProxy(app) {
  app.post("/api/contact", async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);

    const { default: handler } = await import("../netlify/functions/contact.mjs");
    const response = await handler(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: Buffer.concat(chunks),
      })
    );

    res.status(response.status).type("application/json").send(await response.text());
  });
};

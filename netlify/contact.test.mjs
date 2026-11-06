/* eslint-disable no-console -- silences the logs of the failure paths under test */
// Run with `pnpm test:functions`. These use Node's own test runner because that is the runtime
// the function really has: Jest 27 in react-scripts has no fetch, Request or Response.
// Kept outside netlify/functions, where Netlify would deploy this file as a function.
import assert from "node:assert/strict";
import { beforeEach, mock, test } from "node:test";
import handler, { readMessage } from "./functions/contact.mjs";

const valid = { name: "Awa", email: "awa@test.ml", subject: "web", message: "Bonjour <b>&</b>" };

const post = (body) =>
  handler(new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) }));

let fetchMock;
const sentEmail = () => JSON.parse(fetchMock.mock.calls[0].arguments[1].body);

beforeEach(() => {
  process.env.RESEND_API_KEY = "re_test";
  delete process.env.MAIL_FROM;
  delete process.env.MAIL_TO;
  fetchMock = mock.fn(async () => new Response('{"id":"1"}', { status: 200 }));
  globalThis.fetch = fetchMock;
  console.error = () => {};
});

test("sends to the fixed recipient, with the visitor as reply-to", async () => {
  const response = await post({ ...valid, to: "victim@example.com" });
  const [url, options] = fetchMock.mock.calls[0].arguments;

  assert.equal(response.status, 200);
  assert.equal(url, "https://api.resend.com/emails");
  assert.equal(options.headers.Authorization, "Bearer re_test");
  assert.deepEqual(sentEmail().to, ["konelamine1122@gmail.com"]);
  assert.equal(sentEmail().reply_to, "awa@test.ml");
  assert.equal(sentEmail().subject, "[Portfolio] Application web : Awa");
});

test("reads the sender and recipient from the environment", async () => {
  process.env.MAIL_FROM = "Portfolio <contact@exemple.com>";
  process.env.MAIL_TO = "boite@exemple.com";
  await post(valid);

  assert.equal(sentEmail().from, "Portfolio <contact@exemple.com>");
  assert.deepEqual(sentEmail().to, ["boite@exemple.com"]);
});

test("escapes what the visitor wrote in the HTML version", async () => {
  await post(valid);

  assert.match(sentEmail().html, /Bonjour &lt;b&gt;&amp;&lt;\/b&gt;/);
  assert.doesNotMatch(sentEmail().html, /<b>&<\/b>/);
});

test('uses the free text subject only for "other"', () => {
  assert.equal(readMessage({ ...valid, subject: "other", subjectOther: "Audit\r\nBcc: x" }).subject, "Audit Bcc: x");
  assert.equal(readMessage({ ...valid, subject: "other", subjectOther: "  " }), null);
  assert.equal(readMessage({ ...valid, subject: "unknown" }), null);
  assert.equal(readMessage({ ...valid, subject: "constructor" }), null);
});

for (const [label, body] of [
  ["a missing name", { ...valid, name: " " }],
  ["a malformed email", { ...valid, email: "nope" }],
  ["an empty message", { ...valid, message: "" }],
]) {
  test(`rejects ${label} without calling Resend`, async () => {
    assert.equal((await post(body)).status, 400);
    assert.equal(fetchMock.mock.callCount(), 0);
  });
}

test("rejects a body that is not JSON", async () => {
  const response = await handler(new Request("http://localhost/api/contact", { method: "POST", body: "nope" }));

  assert.equal(response.status, 400);
});

test("answers bots success from the honeypot and sends nothing", async () => {
  assert.equal((await post({ ...valid, company: "spam inc" })).status, 200);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("reports a failure when Resend refuses or cannot be reached", async () => {
  globalThis.fetch = async () => new Response('{"message":"domain"}', { status: 403 });
  assert.equal((await post(valid)).status, 502);

  globalThis.fetch = async () => {
    throw new Error("network");
  };
  assert.equal((await post(valid)).status, 502);
});

test("refuses to run without an API key, and only accepts POST", async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await post(valid)).status, 500);

  process.env.RESEND_API_KEY = "re_test";
  assert.equal((await handler(new Request("http://localhost/api/contact"))).status, 405);
});

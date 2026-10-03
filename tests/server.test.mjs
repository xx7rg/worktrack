import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import net from "node:net";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

test("production server serves the app, client routes and built assets", { timeout: 30_000 }, async (context) => {
  const socket = net.createServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const port = socket.address().port;
  socket.close();
  await once(socket, "close");

  const child = spawn(process.execPath, ["dist/index.js"], {
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    env: { ...process.env, PORT: String(port), NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  context.after(async () => {
    if (child.exitCode === null) {
      child.kill();
      await once(child, "exit");
    }
  });

  const base = `http://127.0.0.1:${port}`;
  let response;
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(output);
    try {
      response = await fetch(base);
      break;
    } catch {
      await delay(100);
    }
  }
  assert.ok(response, `Server did not start: ${output}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>WorkTrack/);
  const route = await fetch(`${base}/historico`);
  assert.equal(route.status, 200);
  assert.equal(await route.text(), html);

  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)].map((match) => match[1]);
  assert.ok(assets.some((asset) => asset.endsWith(".js")));
  assert.ok(assets.some((asset) => asset.endsWith(".css")));
  for (const asset of assets) {
    const file = await fetch(`${base}${asset}`);
    assert.equal(file.status, 200, asset);
    assert.match(file.headers.get("content-type"), asset.endsWith(".css") ? /text\/css/ : /javascript/);
    assert.ok((await file.text()).length > 0);
  }
});

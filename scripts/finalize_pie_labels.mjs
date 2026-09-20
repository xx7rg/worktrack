import fs from "node:fs";
const path = "/home/ubuntu/worktrack/client/src/pages/Home.tsx";
let s = fs.readFileSync(path, "utf8");
const startToken = 'label={labelMode === "internal" ? (({';
const endToken = '}) : undefined}';
let cursor = 0;
for (let i = 0; i < 3; i++) {
  const start = s.indexOf(startToken, cursor);
  if (start < 0) throw new Error(`label start ${i} not found`);
  const end = s.indexOf(endToken, start);
  if (end < 0) throw new Error(`label end ${i} not found`);
  const before = s.slice(0, start);
  const mode = before.lastIndexOf('dataKey="horas"') > before.lastIndexOf('dataKey="ganho"') ? 'hours' : 'money';
  const replacement = `label={labelMode === "internal" ? (props => renderPieLabel(props, "${mode}")) : undefined}`;
  s = s.slice(0, start) + replacement + s.slice(end + endToken.length);
  cursor = start + replacement.length;
}
fs.writeFileSync(path, s);

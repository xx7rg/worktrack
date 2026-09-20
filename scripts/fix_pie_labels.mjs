import fs from "node:fs";
const path = "/home/ubuntu/worktrack/client/src/pages/Home.tsx";
let s = fs.readFileSync(path, "utf8");
const find = 'labelLine={false} label={({ name, value, percent }) => percent > 0 ? `${name} ${eur(Number(value))} · ${(percent * 100).toFixed(0)}%` : ""}';
const replacements = [
  'labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, value, percent }) => { const radius = innerRadius + (outerRadius - innerRadius) * 0.52; const x = cx + radius * Math.cos(-midAngle * Math.PI / 180); const y = cy + radius * Math.sin(-midAngle * Math.PI / 180); return percent >= 0.08 ? <text x={x} y={y} fill="#fffdf8" textAnchor="middle" dominantBaseline="central" fontSize={8} fontWeight={800}>{`${eur(Number(value))} · ${(percent * 100).toFixed(0)}%`}</text> : null; }}',
  'labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, value, percent }) => { const radius = innerRadius + (outerRadius - innerRadius) * 0.52; const x = cx + radius * Math.cos(-midAngle * Math.PI / 180); const y = cy + radius * Math.sin(-midAngle * Math.PI / 180); return percent >= 0.08 ? <text x={x} y={y} fill="#fffdf8" textAnchor="middle" dominantBaseline="central" fontSize={8} fontWeight={800}>{`${Number(value).toFixed(1).replace(".", ",")}h · ${(percent * 100).toFixed(0)}%`}</text> : null; }}',
  'labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, value, percent }) => { const radius = innerRadius + (outerRadius - innerRadius) * 0.52; const x = cx + radius * Math.cos(-midAngle * Math.PI / 180); const y = cy + radius * Math.sin(-midAngle * Math.PI / 180); return percent >= 0.08 ? <text x={x} y={y} fill="#fffdf8" textAnchor="middle" dominantBaseline="central" fontSize={8} fontWeight={800}>{`${eur(Number(value))} · ${(percent * 100).toFixed(0)}%`}</text> : null; }}'
];
for (const replacement of replacements) {
  const index = s.indexOf(find);
  if (index < 0) throw new Error("Pie label pattern not found");
  s = s.slice(0, index) + replacement + s.slice(index + find.length);
}
fs.writeFileSync(path, s);

import fs from "node:fs";
const path = "/home/ubuntu/worktrack/client/src/pages/Home.tsx";
let s = fs.readFileSync(path, "utf8");
const marker = '  const clients = useMemo(() => Array.from(new Set(jobs.map(j => j.client))), [jobs]);';
const helper = `  const renderPieLabel = (props: any, mode: "money" | "hours") => {\n    if (props.percent < 0.08) return null;\n    const radius = props.innerRadius + (props.outerRadius - props.innerRadius) * 0.52;\n    const x = props.cx + radius * Math.cos(-props.midAngle * Math.PI / 180);\n    const y = props.cy + radius * Math.sin(-props.midAngle * Math.PI / 180);\n    const value = mode === "hours" ? \"\" + Number(props.value).toFixed(1).replace(".", ",") + "h" : eur(Number(props.value));\n    return <text x={x} y={y} fill="#fffdf8" textAnchor="middle" dominantBaseline="central" fontSize={8} fontWeight={800}>{value} · {(props.percent * 100).toFixed(0)}%</text>;\n  };`;
if (!s.includes('const renderPieLabel')) s = s.replace(marker, `${marker}\n${helper}`);
s = s.replace(/label=\{labelMode === "internal" \? \(\(\([\s\S]*?\}\) : undefined\}/g, (_m, offset) => {
  const before = s.slice(0, offset);
  const isHours = before.lastIndexOf('dataKey="horas"') > before.lastIndexOf('dataKey="ganho"');
  return `label={labelMode === "internal" ? (props => renderPieLabel(props, "${isHours ? "hours" : "money"}")) : undefined}`;
});
fs.writeFileSync(path, s);

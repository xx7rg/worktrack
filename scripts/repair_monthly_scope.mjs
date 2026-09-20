import fs from "node:fs";
const path = "/home/ubuntu/worktrack/client/src/pages/Home.tsx";
let s = fs.readFileSync(path, "utf8");
const homeStart = s.indexOf('export default function Home');
const filterStart = s.indexOf('const filteredJobs = useMemo', homeStart);
const monthlyStart = s.indexOf('  const monthlyChartData =', filterStart);
const filterReturn = s.indexOf('return ', monthlyStart);
if (monthlyStart >= 0 && filterReturn >= 0 && monthlyStart < filterReturn) {
  s = s.slice(0, monthlyStart) + s.slice(filterReturn);
}
const staleStart = s.indexOf('  const monthlyChartData =', homeStart);
if (staleStart >= 0) {
  const staleEnd = s.indexOf('  return (', staleStart);
  if (staleEnd >= 0) s = s.slice(0, staleStart) + s.slice(staleEnd);
}
if (!s.includes('const selectedMonthSlice')) s = s.replace('  const [selectedSlice, setSelectedSlice] = useState("");', '  const [selectedSlice, setSelectedSlice] = useState("");\n  const [selectedMonthSlice, setSelectedMonthSlice] = useState("");\n  const [hoveredMonthSlice, setHoveredMonthSlice] = useState("");');
const monthBlock = `  const monthlyChartData = monthWeekRows.map(row => ({ label: row.label, ganho: row.gross, horas: row.hours, despesas: row.expense, liquido: row.net }));\n  const monthlyTooltip = ({ active, payload }: any) => { if (!active || !payload?.length) return null; const item = payload[0].payload; return <div className="chart-tooltip"><b>{item.label}</b><span>Bruto: {eur(item.ganho)}</span><span>Despesas: {eur(item.despesas)}</span><span>Líquido: {eur(item.liquido)}</span><span>Horas: {item.horas.toFixed(1).replace(".", ",")}h</span></div>; };\n`;
const homeReturn = s.indexOf('  return (', homeStart);
if (homeReturn < 0) throw new Error('Home return not found');
s = s.slice(0, homeReturn) + monthBlock + s.slice(homeReturn);
fs.writeFileSync(path, s);

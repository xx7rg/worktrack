import fs from "node:fs";
const path = "/home/ubuntu/worktrack/client/src/pages/Home.tsx";
let s = fs.readFileSync(path, "utf8");
s = s.replace('  const [selectedSlice, setSelectedSlice] = useState("");', '  const [selectedSlice, setSelectedSlice] = useState("");\n  const [hoveredSlice, setHoveredSlice] = useState("");');
s = s.replace('const focusSlice = hoveredSlice || selectedSlice;', 'const focusSlice = hoveredSlice || selectedSlice;');
if (!s.includes('const focusSlice = hoveredSlice')) {
  const marker = '  const renderPieLabel =';
  s = s.replace(marker, '  const focusSlice = hoveredSlice || selectedSlice;\n\n' + marker);
}
s = s.replaceAll('<Pie onClick={(_, index) => {', '<Pie onMouseEnter={(_, index) => setHoveredSlice(distributionData[index]?.label || "")} onMouseLeave={() => setHoveredSlice("")} onClick={(_, index) => {');
s = s.replaceAll('opacity={selectedSlice && selectedSlice !== entry.label ? 0.35 : 1} stroke={selectedSlice === entry.label ? "#b78643" : "none"} strokeWidth={selectedSlice === entry.label ? 3 : 0}', 'opacity={focusSlice && focusSlice !== entry.label ? 0.32 : 1} stroke={focusSlice === entry.label ? "#b78643" : "none"} strokeWidth={focusSlice === entry.label ? 3 : 0} className={focusSlice === entry.label ? "pie-sector-active" : ""}');
s = s.replaceAll('<span key={item.label}><i style={{ background:', '<span key={item.label}><i style={{ background:');
s = s.replaceAll(' }} />{item.label}</span>)}</div>', ' }} /><b>{item.label}</b>{labelMode === "legend" && <small>{eur(item.ganho)} · {((item.ganho / (metrics.gross || 1)) * 100).toFixed(0)}% bruto · {item.horas.toFixed(1).replace(".", ",")}h · {((item.horas / (metrics.totalHours || 1)) * 100).toFixed(0)}% horas</small>}</span>)}</div>');
fs.writeFileSync(path, s);

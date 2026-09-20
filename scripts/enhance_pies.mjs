import fs from "node:fs";
const path = "/home/ubuntu/worktrack/client/src/pages/Home.tsx";
let s = fs.readFileSync(path, "utf8");
s = s.replace(
  '  const chartData = useMemo(() => [...selectedJobs].reverse().map(j => ({ day: dayName(j.date), ganho: Number((hours(j) * j.rate).toFixed(0)), horas: Number(hours(j).toFixed(1)), valor: Number(j.rate.toFixed(2)) })), [selectedJobs]);',
  `  const chartData = useMemo(() => [...selectedJobs].reverse().map(j => ({ day: dayName(j.date), label: dayName(j.date), ganho: Number((hours(j) * j.rate).toFixed(2)), horas: Number(hours(j).toFixed(1)), valor: Number(j.rate.toFixed(2)) })), [selectedJobs]);
  const [distributionMode, setDistributionMode] = useState<"day" | "client">("day");
  const distributionData = useMemo(() => {
    if (distributionMode === "day") return chartData;
    return Array.from(new Set(selectedJobs.map(j => j.client))).map(client => {
      const clientJobs = selectedJobs.filter(j => j.client === client);
      const gross = clientJobs.reduce((sum, j) => sum + hours(j) * j.rate, 0);
      const totalHours = clientJobs.reduce((sum, j) => sum + hours(j), 0);
      return { label: client, day: client, ganho: Number(gross.toFixed(2)), horas: Number(totalHours.toFixed(1)), valor: Number((totalHours ? gross / totalHours : 0).toFixed(2)) };
    });
  }, [chartData, distributionMode, selectedJobs]);`
);
s = s.replace(/      <section className="chart-suite">([\s\S]*?)<\/section>\n      \{\(active === "Semana"/, (_m, body) => {
  let next = body.replaceAll("chartData", "distributionData").replaceAll("entry.day", "entry.label").replaceAll("item.day", "item.label").replaceAll('nameKey="day"', 'nameKey="label"');
  next = next.replaceAll('label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ""}', 'label={({ name, value, percent }) => percent > 0 ? `${name} ${eur(Number(value))} · ${(percent * 100).toFixed(0)}%` : ""}');
  next = next.replace('formatter={(value) => [`${value}h`, "Horas"]}', 'formatter={(value) => [`${Number(value).toFixed(1).replace(".", ",")}h`, "Horas"]}');
  next = next.replace('formatter={(value) => [eur(Number(value)), "Ganho"]}', 'formatter={(value) => [eur(Number(value)), "Ganho"]}');
  const control = '<div className="distribution-filter"><span>Distribuir por</span><select value={distributionMode} onChange={e => setDistributionMode(e.target.value as "day" | "client")}><option value="day">Dia</option><option value="client">Cliente</option></select></div>';
  next = next.replace('<section className="chart-suite">', `<section className="chart-suite">${control}`);
  next = next.replaceAll('Ganhos por dia', '{distributionMode === "day" ? "Ganhos por dia" : "Ganhos por cliente"}').replaceAll('Horas por dia', '{distributionMode === "day" ? "Horas por dia" : "Horas por cliente"}').replaceAll('DISTRIBUIÇÃO', 'DISTRIBUIÇÃO');
  return `      <section className="chart-suite">${control}${next}</section>\n      {(active === "Semana"`;
});
fs.writeFileSync(path, s);

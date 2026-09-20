import fs from "node:fs";
const path = "/home/ubuntu/worktrack/client/src/pages/Home.tsx";
let s = fs.readFileSync(path, "utf8");
s = s.replace('label: dayName(j.date), ganho:', 'label: dayName(j.date), date: j.date, ganho:');
s = s.replace(
  '  const [selectedClient, setSelectedClient] = useState("");',
  `  const [selectedClient, setSelectedClient] = useState("");
  const selectedClientMetrics = useMemo(() => {
    const list = jobs.filter(j => j.client === selectedClient);
    const gross = list.reduce((sum, j) => sum + hours(j) * j.rate, 0);
    const expense = list.reduce((sum, j) => sum + j.expenses, 0);
    const totalHours = list.reduce((sum, j) => sum + hours(j), 0);
    const received = list.filter(j => j.status === "Pago").reduce((sum, j) => sum + hours(j) * j.rate, 0);
    return { jobs: list.length, gross, expense, net: gross - expense, hours: totalHours, received, pending: gross - received };
  }, [jobs, selectedClient]);`
);
s = s.replaceAll(
  'onClick={(_, index) => { if (distributionMode === "client") { const client = distributionData[index]?.label; if (client) { setSelectedClient(client); setFilterClient(client); setActive("Trabalhos"); } } }}',
  'onClick={(_, index) => { const item = distributionData[index]; if (distributionMode === "client") { const client = item?.label; if (client) { setSelectedClient(client); setFilterClient(client); setFilterDate(""); setActive("Trabalhos"); } } else { const date = item?.date; if (date) { setSelectedClient(""); setFilterClient("Todos"); setFilterDate(date); setActive("Trabalhos"); } } }}'
);
s = s.replace(
  '<div className="jobs-list">{(active === "Trabalhos" ? filteredJobs : jobs.slice(0, 4)).map',
  '<div className="client-summary">{active === "Trabalhos" && selectedClient && <><div><span>Cliente selecionado</span><b>{selectedClient}</b></div><div><span>Bruto</span><b>{eur(selectedClientMetrics.gross)}</b></div><div><span>Despesas</span><b>{eur(selectedClientMetrics.expense)}</b></div><div><span>Líquido</span><b>{eur(selectedClientMetrics.net)}</b></div><div><span>Horas</span><b>{selectedClientMetrics.hours.toFixed(1).replace(".", ",")}h</b></div><div><span>Trabalhos</span><b>{selectedClientMetrics.jobs}</b></div></>}</div><div className="jobs-list">{(active === "Trabalhos" ? filteredJobs : jobs.slice(0, 4)).map'
);
fs.writeFileSync(path, s);

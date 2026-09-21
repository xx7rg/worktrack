<div align="center">

<img src="docs/images/x7rg.png" alt="x7rG ENTERPRISE" width="260" />

# WorkTrack

<img src="docs/images/project.svg" alt="WorkTrack — apresentação do projeto" width="640" />

**Painel para acompanhar trabalhos, horas, receitas, despesas e metas em um só lugar.**

![plataforma](https://img.shields.io/badge/plataforma-Web-2E8B57)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript&logoColor=white)
![versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0-8A2BE2)

Publicado por **x7rG ENTERPRISE™**

</div>

---

## Sobre o projeto

WorkTrack organiza registros de trabalho e apresenta uma visão dos ganhos e do tempo dedicado a cada serviço. Inclui acompanhamento por cliente, pagamentos pendentes, despesas, gráficos e metas semanais e mensais.

Os dados e preferências são armazenados localmente no navegador. A interface usa valores em euros e oferece dados de exemplo para explorar o painel.

## Tecnologias

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Recharts · Express.

## Executar localmente

Requer Node.js 20.19+ ou 22.12+ e pnpm 10.

```bash
pnpm install
pnpm dev
```

Em discos que não suportam links simbólicos, use `pnpm install --node-linker=hoisted`.

| Comando | Função |
| --- | --- |
| `pnpm dev` | Inicia o servidor de desenvolvimento. |
| `pnpm build` | Gera o frontend e o servidor em `dist/`. |
| `pnpm preview` | Abre uma prévia do frontend compilado. |
| `pnpm check` | Verifica os tipos TypeScript. |

## Estrutura

- `client/src/pages/Home.tsx`: painel e gestão dos registros.
- `client/src/components/`: componentes de interface.
- `server/`: servidor Express.
- `shared/`: definições compartilhadas.

---

<div align="center">

**© 2026 x7rG ENTERPRISE™** — Todos os direitos reservados.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rgds)
&nbsp;
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/_7ragnar/)

</div>

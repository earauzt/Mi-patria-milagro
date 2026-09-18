# Mi Patria Milagro

Prototipo clickeable (throwaway) de participación ciudadana para el PND 2026–2030 (Colombia).

Mobile-first · Español Colombia · Estilo institucional GOV.CO-inspired · Sin backend.

## Cómo correr

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

Build de producción:

```bash
npm run build
npm run preview
```

## Módulos

1. **Flujo ciudadano** — Entrar → 100 fichas → Priorizar → Mi municipio → La vara  
2. **Cierre** — Tu Colombia (comparación + insignia + compartir UI)  
3. **Tablero** — Colombia en vivo (totales, regiones, heatmap)

## Demo rápida

OTP mock: `123456`. Ver [DEMO.md](./DEMO.md) para la ruta de clic en &lt;3 min.

## Notas

- Datos de municipios e indicadores son **demostrativos** (inspirados en TerriData).
- No usa logos oficiales del DNP; wordmark tipográfico «Mi Patria Milagro».
- Estado en React + `localStorage` opcional.

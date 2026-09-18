# Mi Patria Milagro

Prototipo clickeable (throwaway) de participación ciudadana para el PND 2026–2030 (Colombia).

Mobile-first · Español Colombia · Estilo institucional GOV.CO-inspired · Sin backend.

## Cómo correr

```bash
npm install && npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`). Preferible vista móvil (~390px).

Build de producción:

```bash
npm run build
npm run preview
```

## OTP de demo

Código mock: **`123456`**. No hay SMS real.

## Módulos

1. **Flujo ciudadano** — Entrar → 100 fichas → Priorizar → Mi municipio → La vara
2. **Cierre** — Tu Colombia (comparación + insignia + compartir UI)
3. **Tablero** — Colombia en vivo (totales, regiones, heatmap)

## Demo rápida

La ruta de clic paso a paso (menos de 3 minutos) está en [DEMO.md](./DEMO.md).

## Notas

- Datos de municipios e indicadores son **demostrativos** (inspirados en TerriData).
- No usa logos oficiales del DNP; wordmark tipográfico «Mi Patria Milagro».
- Estado en React + `localStorage` opcional.

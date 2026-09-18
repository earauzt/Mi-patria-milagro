# Demo · Mi Patria Milagro

## Cómo abrir

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` (o el puerto que indique Vite). Preferible vista móvil (~390px) en DevTools.

## Ruta de clic (&lt; 3 minutos)

1. **Entrar** — Celular `3001234567` → Recibir código → OTP `123456` → Municipio **Quibdó** → Continuar  
2. **100 fichas** — Pulsa «Sugerencia demo» (o ajusta sliders hasta suma = 100) → Confirmar  
3. **Priorizar** — Elige exactamente 3 temáticas (p. ej. Salud, Educación, Servicios públicos). Lee la nota de aplazamiento → Confirmar  
4. **Mi municipio** — Revisa stats Quibdó (acueducto 41%, aulas 27, horas 3) → Elige prioridad local → Continuar  
5. **La vara** — Elige 1 indicador (p. ej. Hogares con acueducto y alcantarillado) → Cerrar episodio  
6. **Tu Colombia** — Revisa Tú / Municipio / Colombia + insignia «Constructor del Plan 1/5» → Compartir tarjeta (UI) → **Ver Colombia en vivo**  
7. **Colombia en vivo** — Totales, barras/heatmap por región, prioridad #1 → **Volver al inicio**

## Pantallas

| # | ID | Título |
|---|-----|--------|
| 1 | entrar | Entra a participar |
| 2 | fichas | 100 fichas |
| 3 | priorizar | Priorizar · Milagro Social |
| 4 | municipio | Mi municipio |
| 5 | vara | La vara |
| 6 | cierre | Tu Colombia |
| 7 | tablero | Colombia en vivo |

## Gaps conocidos (demo)

- Sin SMS real ni autenticación.
- Sin mapa geográfico real (heatmap por celdas de región).
- Compartir tarjeta es solo feedback UI.
- Municipios limitados a 5 en el picker.
- Un solo eje con temáticas (Milagro Social).

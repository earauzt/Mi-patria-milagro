# Demo · Firmes Season 1

## Cómo abrir

**Público:** [https://earauzt.github.io/Mi-patria-milagro/](https://earauzt.github.io/Mi-patria-milagro/)

**Local:**

```bash
npm install && npm run dev
```

Abre `http://localhost:5173/Mi-patria-milagro/` (vista móvil ~390px).

## OTP

Celular de prueba: `300 123 4567`  
Código: **`123456`**

## Ruta de clic Firmes (&lt; 4 minutos)

1. **Landing** — Entra a **Firmes Season 1** (tarjeta recomendada). El enlace de abajo abre el episodio PND.
2. **Onboarding** — Celular → OTP `123456` → municipio **Quibdó** → elige 1–2 ejes (p. ej. Seguridad + Salud) → *Empezar Temporada 1*.
3. **Inicio** — Mira racha, saldo (aprendidos / verificados), misión destacada y teaser del gremio.
4. **Misión quiz** — Abre *El choque de 90 días*. Lee la marca «Dato de campaña — no auditado». Responde (pista: 90 días; 330.000 ha = no auditado). *Revisar* → *Registrar Firmes aprendidos*.
5. **Recompensa** — Celebración, insignia y explicador. Vuelve al inicio.
6. **Lista Salud** — Ejes → *Lista familia · 90 días* → marca las 5 casillas.
7. **Reporte** — *Reporte ciudadano (demo)*: nota + foto opcional + *Usar ubicación demo*. Suma Firmes **verificados** (simulado).
8. **Gremio** — Tablero local demo con tu puesto.
9. **Perfil** — Saldo, insignias y certificado (se abre con 3 misiones, una de Seguridad y una de Salud).
10. **Transparencia** — Cabecera *Cómo se ganan Firmes*: aprendidos vs verificados, sin dinero.

Atajo de reglas: desde el landing, *Leer las reglas*.

## Episodio PND (opcional)

Landing → **Mi Patria Milagro / priorizar PND** → OTP `123456` → 100 fichas → 3 temáticas → municipio → la vara → Tu Colombia → tablero.

## Pantallas Firmes

| Ruta | Pantalla |
|------|----------|
| `/` | Portal (Season 1 vs PND) |
| `/firmes/onboarding` | Celular, OTP, municipio, ejes |
| `/firmes` | Home Temporada 1 |
| `/firmes/mision/:id` | Quiz / lista / reporte |
| `/firmes/recompensa` | Celebración |
| `/firmes/ejes` | Árbol de 6 ejes |
| `/firmes/gremio` | Gremio + posiciones |
| `/firmes/perfil` | Firmes, insignias, certificado |
| `/firmes/transparencia` | Reglas |

## Gaps conocidos (demo)

- Sin SMS real ni backend.
- Geo y verificación de reportes son simuladas.
- Cifras de campaña no se convierten en avance de gobierno.
- Municipios limitados en el selector.

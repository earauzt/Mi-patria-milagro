# Demo · Firmes Hoy (Zivic + Duolingo)

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

## Ruta de clic Firmes (&lt; 3 minutos)

1. **Landing** — Un botón: *Entrar a Firmes*. Pilo (guía) explica Hoy.
2. **Onboarding** — Celular → OTP `123456` → municipio **Quibdó** → 1–2 ejes (Seguridad + Salud) → *Empezar Temporada 1*.
3. **Hoy** — Arriba: racha 🔥 + saldo Firmes. Una **misión del día**. Debajo: pendientes de hoy (checklist).
4. **Quiz** — *Empezar misión*. Una pregunta a la vez → *Comprobar* → *Siguiente* / *Recibir Firmes*.
5. **Recompensa** — Celebración +N Firmes. Un botón: *Seguir en Hoy*.
6. **Pendientes** — En Hoy, marca los to-dos cívicos (+5 Firmes aprendidos cada uno).
7. **Ejes / Perfil** — Más misiones y certificado (3 misiones, Seguridad + Salud). El gremio está en Perfil (V1).
8. **Transparencia** — Cabecera *Cómo se ganan Firmes*: sin dinero ni gift cards.

## Home Hoy (qué ves)

- Racha con fuego y saldo Firmes
- Pilo, la guía plana (no RPG)
- Una sola misión del día con un CTA
- Lista de pendientes estilo checklist
- Temporada 1 = 90 días Seguridad + Salud
- Marca «Dato de programa — no auditado» en cifras de programa

## Episodio PND (opcional)

Landing → **Mi Patria Milagro / priorizar PND** → OTP `123456` → 100 fichas → 3 temáticas → municipio → la vara → Tu Colombia → tablero.

## Pantallas Firmes

| Ruta | Pantalla |
|------|----------|
| `/` | Portal |
| `/firmes/onboarding` | Celular, OTP, municipio, ejes |
| `/firmes` | Hoy |
| `/firmes/mision/:id` | Quiz / lista / reporte |
| `/firmes/recompensa` | Celebración |
| `/firmes/ejes` | Seis ejes |
| `/firmes/gremio` | Gremio V1 (desde Perfil) |
| `/firmes/perfil` | Firmes, insignias, certificado |
| `/firmes/transparencia` | Reglas |

## Gaps conocidos (demo)

- Sin SMS real ni backend.
- Geo y verificación de reportes son simuladas.
- Cifras de programa no se convierten en avance de gobierno.
- Municipios limitados en el selector.
- El gremio no entra al loop diario.

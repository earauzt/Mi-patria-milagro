# Demo · Firmes Hoy

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

## Ruta de clic Firmes (menos de 3 minutos)

1. **Landing** — Un botón: *Entrar a Firmes*.
2. **Onboarding** — Celular → OTP `123456` → municipio **Quibdó** → 1–2 ejes (Seguridad + Salud) → *Empezar*.
3. **Hoy** — Arriba: racha + saldo Firmes. Una **misión del día**. Debajo: pendientes de hoy.
4. **Quiz** — *Empezar misión*. Una pregunta a la vez → *Comprobar* → *Siguiente* / *Recibir Firmes*.
5. **Registro** — +N Firmes. Un botón: *Seguir en Hoy*.
6. **Pendientes** — En Hoy, marca las tareas cívicas (+5 Firmes aprendidos cada una).
7. **Ejes / Perfil** — Más misiones y certificado (3 misiones, Seguridad + Salud). El equipo del municipio está en Perfil.
8. **Transparencia** — *Cómo se ganan Firmes*: sin dinero ni gift cards.

## Home Hoy (qué ves)

- Racha y saldo Firmes
- Guía corta
- Una sola misión del día con un CTA
- Lista de pendientes
- Primeros 90 días = Seguridad y Salud
- Marca «Fuente: propuesta de programa (sin verificar)» en cifras del programa

## Priorización PND (opcional)

Landing → **Mi Patria Milagro / priorizar PND** → OTP `123456` → 100 fichas → 3 temáticas → municipio → la vara → Tu Colombia → tablero.

## Pantallas Firmes

| Ruta | Pantalla |
|------|----------|
| `/` | Portal |
| `/firmes/onboarding` | Celular, OTP, municipio, ejes |
| `/firmes` | Hoy |
| `/firmes/mision/:id` | Quiz / lista / reporte |
| `/firmes/recompensa` | Registro de Firmes |
| `/firmes/ejes` | Seis ejes |
| `/firmes/gremio` | Equipo del municipio (desde Perfil) |
| `/firmes/perfil` | Firmes, insignias, certificado |
| `/firmes/transparencia` | Reglas |

## Gaps conocidos (demostración)

- Sin SMS real ni backend.
- Ubicación y verificación de reportes son ilustrativas.
- Cifras de programa no se convierten en avance de gobierno.
- Municipios limitados en el selector.
- El equipo del municipio no entra al trabajo diario de Hoy.

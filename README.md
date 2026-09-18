# Firmes · Mi Patria Milagro

Prototipo clickeable (MVP) de adopción ciudadana **Firmes** para el relato de campaña *Patria Milagro* (De la Espriella / Restrepo 2026–2030), más el episodio previo de priorización del PND.

Mobile-first · Español Colombia · Estilo institucional GOV.CO-inspired · Sin backend.

**Los Firmes no se compran.** Son puntos educativos. No hay dinero ni «pagar para apoyar».

Demo pública: [https://earauzt.github.io/Mi-patria-milagro/](https://earauzt.github.io/Mi-patria-milagro/)

## Cómo correr

```bash
npm install && npm run dev
```

Vite sirve en `http://localhost:5173/Mi-patria-milagro/`. Preferible vista móvil (~390px).

Build de producción:

```bash
npm run build
npm run preview
```

## OTP de demo

Código mock: **`123456`**. No hay SMS real.

## Firmes · Temporada 1

Primeros 90 días, foco **Seguridad** y **Salud**. Home post-login = **Hoy** (racha 🔥, una misión del día, pendientes tipo checklist). Guía **Pilo**. Sin canje monetario ni gift cards.

Seis ejes del portal:

1. Seguridad
2. Salud
3. Economía
4. Campo
5. Educación
6. Estado transparente

Toda cifra de campaña en la UI lleva la marca **«Dato de campaña — no auditado»**. Este prototipo no publica métricas de progreso gubernamental.

Ruta de clic en [DEMO.md](./DEMO.md).

## Episodio PND

Sigue disponible desde el portal: *Mi Patria Milagro / priorizar PND* (`/pnd`).

## Notas

- Estado de Firmes y del episodio PND en `localStorage`.
- Reportes: foto local + geo simulada. Sin denuncia real.
- Sin logos oficiales del DNP.

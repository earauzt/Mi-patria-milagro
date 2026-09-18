# Firmes · Mi Patria Milagro

Prototipo clickeable de **Firmes** para el programa de gobierno *Patria Milagro* (De la Espriella / Restrepo 2026–2030), más la priorización previa del PND.

Mobile-first · Español Colombia · Estilo institucional GOV.CO · Sin backend.

Los Firmes son puntos de estudio. No se canjean por dinero ni por recompensas comerciales.

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

## OTP de demostración

Código: **`123456`**. No hay SMS real.

## Firmes · Primeros 90 días

Foco **Seguridad** y **Salud**. Después de entrar, **Hoy** muestra racha, saldo de Firmes, una misión del día y pendientes. Guía corta (sin personaje de juego).

Seis ejes del portal:

1. Seguridad
2. Salud
3. Economía
4. Campo
5. Educación
6. Estado transparente

Toda cifra de programa en la UI lleva la marca **«Fuente: propuesta de programa (sin verificar)»**. Este prototipo no publica métricas de progreso gubernamental.

Ruta de clic en [DEMO.md](./DEMO.md).

## Priorización PND

Sigue disponible desde el portal: *Mi Patria Milagro / priorizar PND* (`/pnd`).

## Notas

- Estado de Firmes y del PND en `localStorage`.
- Reportes: foto local + ubicación ilustrativa. Sin denuncia real.
- Sin logos oficiales del DNP.

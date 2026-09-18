import { ClaimMark } from '../../components/ClaimMark';
import { FirmesLayout } from '../../components/FirmesLayout';

export function Transparencia() {
  return (
    <FirmesLayout
      title="Cómo se ganan Firmes"
      subtitle="Los Firmes miden estudio y, en algunos casos, un reporte de prueba. No miden ejecución de gobierno."
      backTo="/firmes"
    >
      <section className="rounded-md border border-gov-border bg-white p-4 mb-3">
        <h3 className="font-bold text-gray-900">Qué es un Firme</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          Un Firme es un punto de estudio. No se canjea por dinero ni por
          recompensas comerciales.
        </p>
      </section>

      <section className="rounded-md border border-gov-border bg-white p-4 mb-3">
        <h3 className="font-bold text-gray-900">Aprendidos</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          Se ganan al terminar un quiz o una lista de 90 días. Muestran que
          leíste el programa de gobierno. No muestran que una política se haya
          ejecutado.
        </p>
      </section>

      <section className="rounded-md border border-gov-border bg-white p-4 mb-3">
        <h3 className="font-bold text-gray-900">Verificados</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          En esta demostración se otorgan al enviar un reporte ciudadano (nota,
          foto opcional y ubicación ilustrativa). En un producto real pasarían
          por revisión. Aquí no hay backend ni autoridad competente.
        </p>
      </section>

      <section className="rounded-md border border-amber-200 bg-amber-50 p-4 mb-3">
        <ClaimMark />
        <p className="text-sm text-amber-950 mt-2 leading-relaxed">
          Cifras como 330.000 ha de coca, COP $10 billones en salud, 4×1000,
          Top 25, 7% de crecimiento, ajuste de unos COP $70 billones, crédito
          8,7% o la Universidad Virtual en Casa son propuestas de programa, sin
          verificar. Firmes no publica métricas de progreso gubernamental.
        </p>
      </section>

      <section className="rounded-md border border-gov-border bg-white p-4 mb-3">
        <h3 className="font-bold text-gray-900">Qué sí hay</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          Insignias de estudio, textos de contexto, un certificado de los 90
          días y un puesto en el equipo del municipio (demostración).
        </p>
      </section>

      <section className="rounded-md border border-gov-border bg-white p-4">
        <h3 className="font-bold text-gray-900">Primeros 90 días</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          El foco está en Seguridad y Salud. Economía, Campo, Educación y Estado
          transparente aparecen en vista previa para que veas el portal
          completo.
        </p>
      </section>
    </FirmesLayout>
  );
}

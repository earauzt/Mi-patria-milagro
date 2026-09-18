import { ClaimMark } from '../../components/ClaimMark';
import { FirmesLayout } from '../../components/FirmesLayout';

export function Transparencia() {
  return (
    <FirmesLayout
      title="Cómo se ganan Firmes"
      subtitle="Pantalla de reglas. Este prototipo es anti-propaganda: distingue propuesta, aprendizaje y verificación."
      backTo="/firmes"
    >
      <section className="rounded-xl border border-gov-border bg-white p-4 mb-3">
        <h3 className="font-bold text-gray-900">Qué es un Firme</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          Un Firme es un punto educativo. No es dinero, no es un subsidio y no
          se puede comprar. Nadie «paga para apoyar» al programa Patria Milagro
          desde esta app.
        </p>
      </section>

      <section className="rounded-xl border border-gov-border bg-white p-4 mb-3">
        <h3 className="font-bold text-gray-900">Aprendidos</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          Se ganan al terminar un quiz de propuestas o una lista de 90 días.
          Demuestran que leíste el relato de campaña. No demuestran que una
          política se haya ejecutado.
        </p>
      </section>

      <section className="rounded-xl border border-gov-border bg-white p-4 mb-3">
        <h3 className="font-bold text-gray-900">Verificados</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          En el MVP se otorgan al enviar un reporte ciudadano (nota, foto
          opcional, geo simulada). En un producto real pasarían por revisión.
          Aquí la verificación es de demostración: no hay backend ni autoridad
          competente.
        </p>
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-3">
        <ClaimMark />
        <p className="text-sm text-amber-950 mt-2 leading-relaxed">
          Toda cifra de programa (330.000 ha de coca, COP $10 billones en salud,
          4×1000, Top 25, 7% de crecimiento, ajuste ~COP $70 billones, crédito
          8,7%, créditos al 2%, Universidad Virtual en Casa) es{' '}
          <strong>dato de campaña — no auditado</strong>. Firmes no publica
          métricas de progreso gubernamental.
        </p>
      </section>

      <section className="rounded-xl border border-gov-border bg-white p-4 mb-3">
        <h3 className="font-bold text-gray-900">Recompensas permitidas</h3>
        <ul className="text-sm text-gov-gray mt-1.5 space-y-1 leading-relaxed">
          <li>· Insignias simbólicas</li>
          <li>· Explicadores desbloqueables</li>
          <li>· Certificado de Temporada 1 (aprendizaje)</li>
          <li>· Racha y puesto en el gremio del municipio (demo)</li>
        </ul>
        <p className="text-sm text-gov-gray mt-2 leading-relaxed">
          No hay efectivo, giros, rifas pagadas ni «compra de apoyo».
        </p>
      </section>

      <section className="rounded-xl border border-gov-border bg-white p-4">
        <h3 className="font-bold text-gray-900">Temporada 1</h3>
        <p className="text-sm text-gov-gray mt-1.5 leading-relaxed">
          Corresponde a los primeros 90 días del relato de campaña, con foco en
          Seguridad y Salud. Economía, Campo, Educación y Estado transparente
          se ofrecen en vista previa para que compares el portal completo.
        </p>
      </section>
    </FirmesLayout>
  );
}

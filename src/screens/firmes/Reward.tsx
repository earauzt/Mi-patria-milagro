import { Link } from 'react-router-dom';
import { ClaimMark } from '../../components/ClaimMark';
import { Coin, FirmesLayout } from '../../components/FirmesLayout';
import { GuideBubble } from '../../components/Mascot';
import { getBadge, getExplainer } from '../../data/firmes';
import { diasLabel } from '../../domain/firmes';
import { useFirmes } from '../../hooks/useFirmes';

export function Reward() {
  const { state } = useFirmes();
  const reward = state.lastReward;
  const badge = reward?.badgeId ? getBadge(reward.badgeId) : undefined;
  const explainer = reward?.explainerId
    ? getExplainer(reward.explainerId)
    : undefined;

  if (!reward) {
    return (
      <FirmesLayout title="Sin registro pendiente" backTo="/firmes">
        <GuideBubble mood="think">
          Termina la misión del día en Hoy para registrar Firmes.
        </GuideBubble>
        <Link
          to="/firmes"
          className="mt-4 flex w-full items-center justify-center rounded-md bg-gov-blue text-white font-semibold py-3"
        >
          Ir a Hoy
        </Link>
      </FirmesLayout>
    );
  }

  return (
    <FirmesLayout title="Registrado" subtitle={reward.title} showNav={false}>
      <div className="rounded-md border border-gov-border bg-white p-5 text-center mb-5">
        <div className="flex justify-center mb-3">
          <GuideBubble mood="cheer">
            Sumaste Firmes de estudio. No es un pago.
          </GuideBubble>
        </div>
        <p className="text-[11px] uppercase tracking-wide text-gov-gray">
          Recibiste
        </p>
        <div className="flex justify-center mt-2">
          <Coin value={reward.firmes} />
        </div>
        <p className="mt-2 text-sm font-semibold text-gov-blue">
          +{reward.firmes} Firmes {reward.kind}
        </p>
        {reward.streakIncremented && (
          <p className="mt-2 text-sm text-gray-800">
            Racha: {diasLabel(reward.streakDays)}
          </p>
        )}
      </div>

      {badge && (
        <div className="rounded-md border border-gov-border bg-white p-4 mb-3">
          <p className="text-[11px] uppercase tracking-wide text-gov-gray">
            Insignia
          </p>
          <p className="font-bold text-gray-900 mt-1">{badge.name}</p>
          <p className="text-sm text-gov-gray mt-1">{badge.description}</p>
        </div>
      )}

      {explainer && (
        <div className="rounded-md border border-gov-border bg-white p-4 mb-3">
          <p className="text-[11px] uppercase tracking-wide text-gov-gray">
            Texto de contexto
          </p>
          <p className="font-bold text-gray-900 mt-1">{explainer.title}</p>
          <p className="text-sm text-gov-gray mt-1 leading-relaxed">
            {explainer.body}
          </p>
        </div>
      )}

      {reward.certificateUnlocked && (
        <div className="rounded-md border border-gov-yellow bg-white p-4 mb-3">
          <p className="font-bold text-gray-900">Certificado de los 90 días</p>
          <p className="text-sm text-gov-gray mt-1 leading-relaxed">
            Completaste el umbral (3 misiones con Seguridad y Salud). Es un
            reconocimiento de estudio, no un aval político ni un pago.
          </p>
        </div>
      )}

      <div className="mb-4">
        <ClaimMark />
        <p className="text-xs text-gov-gray mt-2 leading-relaxed">
          No hay dinero, gift cards ni compra de apoyo. Los Firmes {reward.kind}{' '}
          no son tesorería pública.
        </p>
      </div>

      <Link
        to="/firmes"
        className="flex w-full items-center justify-center rounded-md bg-gov-blue text-white font-semibold py-3 px-4 text-base"
      >
        Seguir en Hoy
      </Link>
    </FirmesLayout>
  );
}

import { Link } from 'react-router-dom';
import { ClaimMark } from '../../components/ClaimMark';
import { Coin, FirmesLayout } from '../../components/FirmesLayout';
import { getBadge, getExplainer } from '../../data/firmes';
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
      <FirmesLayout title="Sin recompensa pendiente" backTo="/firmes">
        <p className="text-sm text-gov-gray mb-4">
          Completa una misión para celebrar Firmes ganados.
        </p>
        <Link to="/firmes" className="text-gov-blue font-semibold">
          Ir al inicio
        </Link>
      </FirmesLayout>
    );
  }

  return (
    <FirmesLayout
      title="¡Misión registrada!"
      subtitle={reward.title}
      showNav={false}
    >
      <div className="reward-burst rounded-2xl border border-yellow-300 bg-gradient-to-b from-yellow-50 to-white p-6 text-center mb-5">
        <p className="text-[11px] uppercase tracking-widest text-gov-gray">
          Sumaste
        </p>
        <div className="flex justify-center mt-2">
          <Coin value={reward.firmes} />
        </div>
        <p className="mt-2 text-sm font-semibold text-gov-blue">
          Firmes {reward.kind}
        </p>
        {reward.streakIncremented && (
          <p className="mt-2 text-sm text-gray-800">
            Racha: {reward.streakDays} día{reward.streakDays === 1 ? '' : 's'}
          </p>
        )}
      </div>

      {badge && (
        <div className="rounded-xl border border-gov-border bg-white p-4 mb-3">
          <p className="text-[11px] uppercase tracking-wide text-gov-gray">
            Insignia
          </p>
          <p className="font-bold text-gray-900 mt-1">🏅 {badge.name}</p>
          <p className="text-sm text-gov-gray mt-1">{badge.description}</p>
        </div>
      )}

      {explainer && (
        <div className="rounded-xl border border-gov-border bg-white p-4 mb-3">
          <p className="text-[11px] uppercase tracking-wide text-gov-gray">
            Explicador desbloqueado
          </p>
          <p className="font-bold text-gray-900 mt-1">{explainer.title}</p>
          <p className="text-sm text-gov-gray mt-1 leading-relaxed">
            {explainer.body}
          </p>
        </div>
      )}

      {reward.certificateUnlocked && (
        <div className="rounded-xl border-2 border-gov-yellow bg-white p-4 mb-3">
          <p className="font-bold text-gray-900">Certificado Temporada 1</p>
          <p className="text-sm text-gov-gray mt-1 leading-relaxed">
            Completaste el umbral (3 misiones con Seguridad y Salud). Es un
            reconocimiento educativo, no un aval político ni un pago.
          </p>
        </div>
      )}

      <div className="mb-4">
        <ClaimMark />
        <p className="text-xs text-gov-gray mt-2 leading-relaxed">
          No hay dinero, ni compra de apoyo. Los Firmes {reward.kind} no son
          tesorería pública.
        </p>
      </div>

      <div className="space-y-2">
        <Link
          to="/firmes"
          className="flex w-full items-center justify-center rounded-lg bg-gov-blue text-white font-semibold py-3.5 px-4 text-base"
        >
          Seguir en el inicio
        </Link>
        <Link
          to="/firmes/perfil"
          className="block text-center text-sm font-semibold text-gov-blue py-2"
        >
          Ver perfil y certificado
        </Link>
      </div>
    </FirmesLayout>
  );
}

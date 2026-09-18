import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClaimMark } from '../../components/ClaimMark';
import { FirmesLayout, PrimaryButton } from '../../components/FirmesLayout';
import { GuideBubble } from '../../components/Mascot';
import { FIRMES_EJES } from '../../data/firmes';
import { MUNICIPIOS } from '../../data/catalog';
import { toggleEje, type FirmesEjeId } from '../../domain/firmes';
import { useFirmes } from '../../hooks/useFirmes';

const OTP_DEMO = '123456';

export function Onboarding() {
  const { state, update } = useFirmes();
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp' | 'municipio' | 'ejes'>(
    state.otpVerified ? (state.municipioId ? 'ejes' : 'municipio') : 'phone',
  );
  const [phone, setPhone] = useState(state.phone || '');
  const [otp, setOtp] = useState('');
  const [municipioId, setMunicipioId] = useState(state.municipioId || '');
  const [ejes, setEjes] = useState<FirmesEjeId[]>(state.chosenEjes);
  const [error, setError] = useState('');

  function formatPhone(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  function sendOtp() {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10 || !digits.startsWith('3')) {
      setError('Ingresa un celular colombiano válido (10 dígitos, inicia en 3).');
      return;
    }
    setError('');
    update({ phone: digits });
    setStep('otp');
  }

  function verifyOtp() {
    if (otp !== OTP_DEMO) {
      setError('Código incorrecto. Usa el código demo 123456.');
      return;
    }
    setError('');
    update({ otpVerified: true });
    setStep('municipio');
  }

  function saveMunicipio() {
    if (!municipioId) {
      setError('Selecciona tu municipio.');
      return;
    }
    setError('');
    update({ municipioId });
    setStep('ejes');
  }

  function finish() {
    if (ejes.length < 1 || ejes.length > 2) {
      setError('Elige 1 o 2 ejes para empezar.');
      return;
    }
    update({ chosenEjes: ejes, onboarded: true, municipioId });
    navigate('/firmes', { replace: true });
  }

  return (
    <FirmesLayout
      title={
        step === 'phone'
          ? 'Entra a Firmes'
          : step === 'otp'
            ? 'Verifica el código'
            : step === 'municipio'
              ? 'Tu municipio'
              : 'Elige 1 o 2 ejes'
      }
      subtitle={
        step === 'ejes'
          ? 'Seguridad y salud tienen más misiones. Los otros ejes están en vista previa.'
          : 'El código de esta demostración es 123456. No hay SMS.'
      }
      showNav={false}
    >
      {step === 'phone' && (
        <div className="space-y-4">
          <GuideBubble>
            Entra con tu celular. El código de demostración es 123456.
          </GuideBubble>
          <label className="block">
            <span className="text-sm font-medium text-gray-800">
              Celular colombiano
            </span>
            <div className="mt-1.5 flex rounded-lg border border-gov-border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-gov-blue">
              <span className="px-3 py-3 bg-gray-50 text-gov-gray text-sm border-r border-gov-border">
                +57
              </span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="300 123 4567"
                value={formatPhone(phone)}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-3 py-3 text-base outline-none"
                autoComplete="tel"
              />
            </div>
          </label>
          {error && <p className="text-sm text-gov-red">{error}</p>}
          <PrimaryButton onClick={sendOtp}>Recibir código</PrimaryButton>
        </div>
      )}

      {step === 'otp' && (
        <div className="space-y-4">
          <p className="text-sm text-gov-gray">
            Código enviado a +57 {formatPhone(phone)} (simulado).
          </p>
          <label className="block">
            <span className="text-sm font-medium text-gray-800">
              Código de verificación
            </span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="mt-1.5 w-full rounded-lg border border-gov-border px-3 py-3 text-center text-2xl tracking-[0.4em] font-mono outline-none focus:ring-2 focus:ring-gov-blue"
            />
          </label>
          {error && <p className="text-sm text-gov-red">{error}</p>}
          <PrimaryButton onClick={verifyOtp} disabled={otp.length < 6}>
            Verificar
          </PrimaryButton>
          <button
            type="button"
            className="w-full text-sm text-gov-blue underline"
            onClick={() => {
              setStep('phone');
              setError('');
            }}
          >
            Cambiar número
          </button>
        </div>
      )}

      {step === 'municipio' && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-800">
              ¿En qué municipio estás?
            </span>
            <select
              value={municipioId}
              onChange={(e) => setMunicipioId(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gov-border bg-white px-3 py-3 text-base outline-none focus:ring-2 focus:ring-gov-blue"
            >
              <option value="">Selecciona…</option>
              {MUNICIPIOS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} ({m.departamento})
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-gov-gray">
            El municipio agrupa el equipo local. Se ve en Perfil.
          </p>
          {error && <p className="text-sm text-gov-red">{error}</p>}
          <PrimaryButton onClick={saveMunicipio} disabled={!municipioId}>
            Continuar
          </PrimaryButton>
        </div>
      )}

      {step === 'ejes' && (
        <div className="space-y-4">
          <p className="text-xs font-medium text-gov-blue">
            Seleccionados: {ejes.length} / 2
          </p>
          <ul className="space-y-2">
            {FIRMES_EJES.map((eje) => {
              const on = ejes.includes(eje.id);
              return (
                <li key={eje.id}>
                  <button
                    type="button"
                    onClick={() => setEjes(toggleEje(ejes, eje.id))}
                    className={`w-full text-left rounded-lg border px-3 py-3 ${
                      on
                        ? 'border-gov-blue bg-gov-blue-light ring-1 ring-gov-blue'
                        : 'border-gov-border bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-gray-900">
                        {eje.nombre}
                      </span>
                      {eje.season1 ? (
                        <span className="text-[10px] font-bold uppercase bg-gov-yellow text-gov-blue-dark px-2 py-0.5 rounded-full">
                          90 días
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase text-gov-gray">
                          Vista
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gov-gray mt-1 leading-relaxed">
                      {eje.blurb}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <ClaimMark compact />
            <p className="text-xs text-amber-950 mt-1.5 leading-relaxed">
              Elegir un eje no significa que el gobierno ya avanzó en esa materia.
              Solo ordena qué estudias primero.
            </p>
          </div>
          {error && <p className="text-sm text-gov-red">{error}</p>}
          <PrimaryButton
            onClick={finish}
            disabled={ejes.length < 1 || ejes.length > 2}
          >
            Empezar
          </PrimaryButton>
        </div>
      )}
    </FirmesLayout>
  );
}

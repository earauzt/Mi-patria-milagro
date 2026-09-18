import { useState } from 'react';
import { Layout, PrimaryButton } from '../components/Layout';
import { MUNICIPIOS } from '../data/catalog';
import { useEpisode } from '../hooks/useEpisode';

const OTP_DEMO = '123456';

/** 10 dígitos móviles CO. Si pegan +57, se recorta el indicativo (el campo ya muestra +57). */
function toCoMobile(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('57') && digits.length > 10) digits = digits.slice(2);
  return digits.slice(0, 10);
}

function formatPhone(raw: string) {
  const digits = toCoMobile(raw);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export function Entrar() {
  const { episode, update, setScreen } = useEpisode();
  const [step, setStep] = useState<'phone' | 'otp' | 'municipio'>(
    episode.otpVerified ? 'municipio' : 'phone',
  );
  const [phone, setPhone] = useState(toCoMobile(episode.phone || ''));
  const [otp, setOtp] = useState('');
  const [municipioId, setMunicipioId] = useState(episode.municipioId || '');
  const [error, setError] = useState('');

  function sendOtp() {
    const digits = toCoMobile(phone);
    if (digits.length !== 10 || !digits.startsWith('3')) {
      setError('Ingresa un celular colombiano válido (10 dígitos, inicia en 3).');
      return;
    }
    setError('');
    update({ phone: digits, otpVerified: false });
    setPhone(digits);
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

  function continueNext() {
    if (!municipioId) {
      setError('Selecciona tu municipio.');
      return;
    }
    update({ municipioId });
    setScreen('fichas');
  }

  return (
    <Layout
      title="Entra a participar"
      subtitle="Tu aporte queda registrado de forma agregada. Sin SMS real: usa el código demo."
    >
      {step === 'phone' && (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            sendOtp();
          }}
        >
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
                onChange={(e) => setPhone(toCoMobile(e.target.value))}
                className="flex-1 px-3 py-3 text-base outline-none"
                autoComplete="tel"
              />
            </div>
          </label>
          {error && <p className="text-sm text-gov-red">{error}</p>}
          <PrimaryButton type="submit">Recibir código</PrimaryButton>
          <p className="text-xs text-gov-gray text-center">
            Demo: cualquier celular 3XX… · OTP fijo <strong>123456</strong>
          </p>
        </form>
      )}

      {step === 'otp' && (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            verifyOtp();
          }}
        >
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
          <PrimaryButton type="submit" disabled={otp.length < 6}>
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
        </form>
      )}

      {step === 'municipio' && (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            continueNext();
          }}
        >
          <label className="block">
            <span className="text-sm font-medium text-gray-800">
              ¿Desde qué municipio participas?
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
          {error && <p className="text-sm text-gov-red">{error}</p>}
          <PrimaryButton type="submit" disabled={!municipioId}>
            Continuar
          </PrimaryButton>
        </form>
      )}
    </Layout>
  );
}

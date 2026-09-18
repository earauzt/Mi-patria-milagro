import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { EpisodeProvider, useEpisode } from './hooks/useEpisode';
import { FirmesProvider, useFirmes } from './hooks/useFirmes';
import type { ScreenId } from './domain/types';
import { Landing } from './screens/Landing';
import { Entrar } from './screens/Entrar';
import { Fichas } from './screens/Fichas';
import { Priorizar } from './screens/Priorizar';
import { MunicipioScreen } from './screens/Municipio';
import { Vara } from './screens/Vara';
import { Cierre } from './screens/Cierre';
import { Tablero } from './screens/Tablero';
import { Onboarding } from './screens/firmes/Onboarding';
import { Home } from './screens/firmes/Home';
import { Mission } from './screens/firmes/Mission';
import { Reward } from './screens/firmes/Reward';
import { SkillTree } from './screens/firmes/SkillTree';
import { Guild } from './screens/firmes/Guild';
import { Profile } from './screens/firmes/Profile';
import { Transparencia } from './screens/firmes/Transparencia';

function PndRouter() {
  const { screen } = useEpisode();
  const map: Record<ScreenId, ReactNode> = {
    entrar: <Entrar />,
    fichas: <Fichas />,
    priorizar: <Priorizar />,
    municipio: <MunicipioScreen />,
    vara: <Vara />,
    cierre: <Cierre />,
    tablero: <Tablero />,
  };
  return <>{map[screen]}</>;
}

function FirmesGate({ children }: { children: ReactNode }) {
  const { state } = useFirmes();
  if (!state.onboarded) return <Navigate to="/firmes/onboarding" replace />;
  return <>{children}</>;
}

function FirmesRoutes() {
  return (
    <Routes>
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="transparencia" element={<Transparencia />} />
      <Route
        path="mision/:id"
        element={
          <FirmesGate>
            <Mission />
          </FirmesGate>
        }
      />
      <Route
        path="recompensa"
        element={
          <FirmesGate>
            <Reward />
          </FirmesGate>
        }
      />
      <Route
        path="ejes"
        element={
          <FirmesGate>
            <SkillTree />
          </FirmesGate>
        }
      />
      <Route
        path="gremio"
        element={
          <FirmesGate>
            <Guild />
          </FirmesGate>
        }
      />
      <Route
        path="perfil"
        element={
          <FirmesGate>
            <Profile />
          </FirmesGate>
        }
      />
      <Route
        path=""
        element={
          <FirmesGate>
            <Home />
          </FirmesGate>
        }
      />
      <Route path="*" element={<Navigate to="/firmes" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/firmes/*"
        element={
          <FirmesProvider>
            <FirmesRoutes />
          </FirmesProvider>
        }
      />
      <Route
        path="/pnd"
        element={
          <EpisodeProvider>
            <PndRouter />
          </EpisodeProvider>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

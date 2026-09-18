import type { ReactNode } from 'react';
import { EpisodeProvider, useEpisode } from './hooks/useEpisode';
import type { ScreenId } from './domain/types';
import { Entrar } from './screens/Entrar';
import { Fichas } from './screens/Fichas';
import { Priorizar } from './screens/Priorizar';
import { MunicipioScreen } from './screens/Municipio';
import { Vara } from './screens/Vara';
import { Cierre } from './screens/Cierre';
import { Tablero } from './screens/Tablero';

function ScreenRouter() {
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

export default function App() {
  return (
    <EpisodeProvider>
      <ScreenRouter />
    </EpisodeProvider>
  );
}

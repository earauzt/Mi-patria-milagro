export function ClaimMark({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={`inline-flex items-center rounded-sm border border-amber-300 bg-amber-50 text-amber-950 font-medium ${
        compact ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-1'
      }`}
      role="note"
    >
      {compact
        ? 'Propuesta de programa (sin verificar)'
        : 'Fuente: propuesta de programa (sin verificar)'}
    </p>
  );
}

export function ClaimCard({ text }: { text: string }) {
  return (
    <aside className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5">
      <ClaimMark compact />
      <p className="text-sm text-amber-950 mt-1.5 leading-relaxed">{text}</p>
    </aside>
  );
}

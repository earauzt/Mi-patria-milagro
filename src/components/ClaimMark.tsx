export function ClaimMark({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 text-amber-950 font-semibold ${
        compact
          ? 'text-[10px] px-2 py-0.5'
          : 'text-[11px] px-2.5 py-1'
      }`}
      role="note"
    >
      <span aria-hidden>⚑</span>
      Dato de campaña — no auditado
    </p>
  );
}

export function ClaimCard({ text }: { text: string }) {
  return (
    <aside className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
      <ClaimMark compact />
      <p className="text-sm text-amber-950 mt-1.5 leading-relaxed">{text}</p>
    </aside>
  );
}

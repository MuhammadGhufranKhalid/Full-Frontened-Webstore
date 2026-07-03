// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center">
        <p className="font-display text-sm font-semibold text-charcoal">
          Kitchen Notes
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-charcoal-soft/70">
          Recipe data via DummyJSON
        </p>
      </div>
    </footer>
  );
}

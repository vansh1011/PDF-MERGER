
export default function Footer() {
  return (
    <footer className="mt-12 flex flex-col items-center gap-3 text-center">
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
      <p className="text-sm text-slate-500">
        Made by{' '}
        <span className="font-medium text-slate-300">Vansh Parmar</span>
        {' · '}
        <a
          href="mailto:vanshparmar8742@gmail.com"
          className="text-violet-400 underline underline-offset-2 hover:text-violet-300 transition-colors"
        >
          vanshparmar8742@gmail.com
        </a>
      </p>
      <a
        id="digital-heroes-link"
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-5 py-2 text-sm font-semibold text-violet-300 transition-all duration-200 hover:bg-violet-500/20 hover:border-violet-400 hover:text-violet-200 hover:shadow-lg hover:shadow-violet-500/10"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Built for Digital Heroes
      </a>
    </footer>
  );
}

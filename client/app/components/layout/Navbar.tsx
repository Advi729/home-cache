import { Link } from "react-router";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            HC
          </div>

          <span className="font-bold tracking-tight text-slate-950">
            HomeCache
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-slate-600 hover:text-slate-950"
          >
            Home
          </Link>

          <Link
            to="/documents"
            className="text-slate-600 hover:text-slate-950"
          >
            Documents
          </Link>
        </nav>
      </div>
    </header>
  );
}
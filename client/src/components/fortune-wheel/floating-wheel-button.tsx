import { Link, useLocation } from "wouter";

export default function FloatingWheelButton() {
  const [location] = useLocation();
  if (location === "/fortune-wheel") return null;

  return (
    <Link
      href="/fortune-wheel"
      aria-label="Ouvrir la roue de la fortune"
      title="Roue de la fortune"
      data-testid="floating-fortune-wheel"
      className="fixed right-4 z-[45] grid h-14 w-14 place-items-center rounded-full border-2 border-[#171717] bg-white shadow-[3px_3px_0_#171717] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bd304c] focus-visible:ring-offset-2"
      style={{ bottom: "calc(268px + env(safe-area-inset-bottom, 0px))" }}
    >
      <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
        <circle cx="24" cy="24" r="19" fill="#fff" stroke="#171717" strokeWidth="2" />
        <path d="M24 24V5A19 19 0 0 1 42 18Z" fill="#bd304c" />
        <path d="M24 24 42 18A19 19 0 0 1 35 40Z" fill="#232323" />
        <path d="M24 24 35 40A19 19 0 0 1 13 40Z" fill="#e9d9d4" />
        <path d="M24 24 13 40A19 19 0 0 1 6 18Z" fill="#6f2434" />
        <path d="M24 24 6 18A19 19 0 0 1 24 5Z" fill="#d8d0c8" />
        <circle cx="24" cy="24" r="4" fill="#171717" stroke="#fff" strokeWidth="1.5" />
        <path d="m21 3 3-2 3 2-3 5z" fill="#bd304c" stroke="#171717" strokeWidth="1.2" />
      </svg>
    </Link>
  );
}

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Headset, Send } from "lucide-react";

const POSITION_STORAGE_KEY = "floating-support-position-v1";
const BUTTON_SIZE = 58;
const NAVIGATION_CLEARANCE = 88;
const DEFAULT_SUPPORT_URL = "https://t.me/intelappgroup";

interface SupportLinks {
  supportLink?: string;
}

interface Point {
  x: number;
  y: number;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  origin: Point;
  moved: boolean;
}

function clampPoint(point: Point): Point {
  const maxX = Math.max(8, window.innerWidth - BUTTON_SIZE - 8);
  const maxY = Math.max(8, window.innerHeight - BUTTON_SIZE - NAVIGATION_CLEARANCE);

  return {
    x: Math.min(maxX, Math.max(8, point.x)),
    y: Math.min(maxY, Math.max(8, point.y)),
  };
}

function getConfiguredTelegramUrl(value?: string): string {
  if (!value) return DEFAULT_SUPPORT_URL;

  try {
    const url = new URL(value);
    const telegramHosts = new Set(["t.me", "telegram.me", "telegram.dog"]);
    if (url.protocol === "https:" && telegramHosts.has(url.hostname.toLowerCase())) {
      return url.toString();
    }
  } catch {
    // Invalid admin configuration falls back to the default Telegram support link.
  }

  return DEFAULT_SUPPORT_URL;
}

function readSavedPoint(): Point | null {
  try {
    const saved = window.localStorage.getItem(POSITION_STORAGE_KEY);
    if (!saved) return null;

    const point: unknown = JSON.parse(saved);
    if (
      typeof point === "object" &&
      point !== null &&
      "x" in point &&
      "y" in point &&
      typeof point.x === "number" &&
      typeof point.y === "number" &&
      Number.isFinite(point.x) &&
      Number.isFinite(point.y)
    ) {
      return clampPoint({ x: point.x, y: point.y });
    }
  } catch {
    // Storage can be unavailable in private browsing; use the default position.
  }

  return null;
}

export default function FloatingSupport() {
  const { data: settings } = useQuery<SupportLinks>({
    queryKey: ["/api/settings/links"],
  });
  const [position, setPosition] = useState<Point | null>(null);
  const positionRef = useRef<Point | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const saved = readSavedPoint();
    const initial = saved ?? clampPoint({
      x: window.innerWidth - BUTTON_SIZE - 16,
      y: Math.round(window.innerHeight * 0.72),
    });
    positionRef.current = initial;
    setPosition(initial);

    const handleResize = () => {
      const current = positionRef.current;
      if (!current) return;
      const next = clampPoint(current);
      positionRef.current = next;
      setPosition(next);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const savePosition = (point: Point) => {
    const clamped = clampPoint(point);
    positionRef.current = clamped;
    setPosition(clamped);

    try {
      window.localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(clamped));
    } catch {
      // The button remains movable for this session if storage is unavailable.
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (!positionRef.current) return;

    event.preventDefault();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: positionRef.current,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) > 5) drag.moved = true;
    if (!drag.moved) return;

    event.preventDefault();
    const next = clampPoint({
      x: drag.origin.x + deltaX,
      y: drag.origin.y + deltaY,
    });
    positionRef.current = next;
    setPosition(next);
  };

  const finishPointerDrag = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    suppressClickRef.current = drag.moved;
    if (drag.moved && positionRef.current) {
      try {
        window.localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(positionRef.current));
      } catch {
        // Position persistence is optional.
      }
    }
  };

  if (!position) return null;

  return (
    <a
      href={getConfiguredTelegramUrl(settings?.supportLink)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter le service client sur Telegram. Faire glisser pour déplacer le bouton."
      title="Service client Telegram — faire glisser pour déplacer"
      data-testid="floating-telegram-support"
      className="fixed z-[40] grid h-[58px] w-[58px] touch-none select-none place-items-center rounded-full border-[3px] border-white bg-[#bd304c] text-white shadow-[0_5px_18px_rgba(17,24,39,0.3)] transition-[box-shadow,transform] hover:scale-[1.04] hover:shadow-[0_7px_22px_rgba(17,24,39,0.36)] active:scale-95"
      style={{ left: position.x, top: position.y, cursor: dragRef.current ? "grabbing" : "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerDrag}
      onPointerCancel={finishPointerDrag}
      onClick={(event) => {
        if (!suppressClickRef.current) return;
        event.preventDefault();
        suppressClickRef.current = false;
      }}
    >
      <Headset className="h-7 w-7" strokeWidth={2.4} aria-hidden="true" />
      <span className="absolute -bottom-0.5 -right-0.5 grid h-[23px] w-[23px] place-items-center rounded-full border-2 border-white bg-white text-[#229ed9]">
        <Send className="h-3.5 w-3.5" fill="currentColor" strokeWidth={1.8} aria-hidden="true" />
      </span>
    </a>
  );
}

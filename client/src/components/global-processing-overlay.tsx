import { useEffect, useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";
import { PROCESSING_END_EVENT, PROCESSING_START_EVENT } from "@/lib/queryClient";

export function ProcessingOverlay({ message }: { message: string }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.add("site-processing-active");
    return () => document.body.classList.remove("site-processing-active");
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <style>{`
        @keyframes site-processing-spin {
          to { transform: rotate(360deg); }
        }
        .site-processing-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0, 0, 0, .68);
        }
        .site-processing-card {
          display: flex;
          width: min(100%, 148px);
          min-height: 122px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 12px;
          border: 0;
          border-radius: 4px;
          background: rgba(16, 16, 16, .96);
          color: #fff;
          box-shadow: 0 4px 18px rgba(0, 0, 0, .32);
          text-align: center;
        }
        .site-processing-spinner {
          width: 30px;
          height: 30px;
          color: #fff;
          animation: site-processing-spin .9s linear infinite;
        }
        body.site-processing-active .animate-spin:not(.site-processing-spinner) {
          visibility: hidden !important;
        }
        .site-processing-message {
          font-size: 15px;
          font-weight: 500;
          line-height: 1.35;
        }
        @media (prefers-reduced-motion: reduce) {
          .site-processing-spinner { animation-duration: 2s; }
        }
      `}</style>
      <div
        className="site-processing-backdrop"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-busy="true"
      >
        <div className="site-processing-card">
          <Loader2 className="site-processing-spinner" aria-hidden="true" />
          <span className="site-processing-message">{message}</span>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default function GlobalProcessingOverlay() {
  const pendingMutations = useIsMutating();
  const [pendingApiRequests, setPendingApiRequests] = useState(0);

  useEffect(() => {
    const handleStart = () => setPendingApiRequests((count) => count + 1);
    const handleEnd = () => setPendingApiRequests((count) => Math.max(0, count - 1));

    window.addEventListener(PROCESSING_START_EVENT, handleStart);
    window.addEventListener(PROCESSING_END_EVENT, handleEnd);
    return () => {
      window.removeEventListener(PROCESSING_START_EVENT, handleStart);
      window.removeEventListener(PROCESSING_END_EVENT, handleEnd);
    };
  }, []);

  if (pendingMutations === 0 && pendingApiRequests === 0) return null;

  return <ProcessingOverlay message="Traitement en cours..." />;
}

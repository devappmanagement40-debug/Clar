import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCountryByCode, type ApiCountry } from "@/lib/countries";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Download,
  Gift,
  HelpCircle,
  Headset,
  History,
  Info,
  KeyRound,
  Loader2,
  LogOut,
  ScrollText,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_PATH } from "@/lib/admin-path";
import { equinorLogo, equinorPhone } from "@/assets/equinor-media";
import "./account.css";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    _installPrompt?: InstallPromptEvent | null;
    _appInstalled?: boolean;
  }
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [showPinModal, setShowPinModal] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const { data: apiCountries } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
  });
  const verifyPinMutation = useMutation({
    mutationFn: async (pin: string) => {
      const res = await apiRequest("POST", "/api/admin/verify-pin", { pin });
      if (!res.ok) {
        const data = await res.json();
         throw new Error(data.message || "Le code PIN administrateur est incorrect.");
      }
      return res.json();
    },
    onSuccess: () => {
      setShowPinModal(false);
      setAdminPin("");
      navigate(ADMIN_PATH);
    },
    onError: (error: Error) =>
      toast({
        title: "Vérification du code PIN impossible",
        description: error.message,
        variant: "destructive",
      }),
  });

  if (!user) return null;

  const country = getCountryByCode(user.country, apiCountries);
  const currency = country?.currency || "XOF";
  const balance = Number.parseFloat(user.balance || "0");
  const earnings = Number.parseFloat(user.totalEarnings || "0");
  const phonePrefix = country?.phonePrefix || "";
  const formatAmount = (amount: number) => `${Math.round(amount).toLocaleString("fr-FR")} ${currency}`;

  const quickActions = [
    { label: "Dépôt", icon: ArrowDownCircle, href: "/deposit" },
    { label: "Retrait", icon: ArrowUpCircle, href: "/withdrawal" },
    { label: "Aide", icon: HelpCircle, href: "/service" },
    { label: "Pointage", icon: CheckCircle2, href: "/checkin" },
  ];

  const serviceItems = [
    { label: "À propos", icon: Info, href: "/about" },
    { label: "Réglementation", icon: ScrollText, href: "/rules" },
    { label: "Historique", icon: History, href: "/history" },
    { label: "Service client", icon: Headset, href: "/service" },
    { label: "Télécharger l’application", icon: Download, action: "download" as const },
    { label: "Lier une carte bancaire", icon: CreditCard, href: "/wallet" },
    { label: "Changer le mot de passe", icon: KeyRound, href: "/change-password" },
    { label: "Échanger un cadeau", icon: Gift, href: "/gift-code" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleAdminClick = () => {
    if (user.isAdminPasswordRequired === false) {
      navigate(ADMIN_PATH);
      return;
    }
    setShowPinModal(true);
  };

  const handleDownload = async () => {
    const isInstalled =
      window._appInstalled ||
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);

    if (isInstalled) {
      toast({
        title: "Equinor est déjà installée",
        description: "Vous pouvez ouvrir l’application depuis l’écran d’accueil de votre appareil.",
      });
      return;
    }

    const installPrompt = window._installPrompt;
    if (installPrompt) {
      window._installPrompt = null;
      try {
        await installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        toast(
          outcome === "accepted"
            ? {
                title: "Installation lancée",
                description: "Equinor est en cours d’installation sur votre appareil.",
              }
            : {
                title: "Installation annulée",
                description: "Vous pourrez relancer l’installation depuis ce bouton.",
              },
        );
      } catch {
        toast({
          title: "Installation indisponible",
          description: "Ouvrez le menu de votre navigateur et choisissez « Installer l’application ».",
          variant: "destructive",
        });
      }
      return;
    }

    const isIos =
      /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    toast({
      title: "Installer Equinor",
      description: isIos
        ? "Dans Safari, touchez Partager puis « Sur l’écran d’accueil »."
        : "Dans le menu de votre navigateur, choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».",
    });
  };

  return (
    <main className="cp-account">
      <div className="cp-account-shell">
        <section className="cp-account-header" aria-label="Informations du compte">
          <div className="cp-profile-row">
            <div className="cp-profile-avatar">
              <img src={equinorLogo} alt="Equinor" />
            </div>
            <div className="cp-profile-copy">
              <p className="cp-account-phone">+{phonePrefix} {user.phone}</p>
              <span className="cp-account-level">Membre</span>
            </div>
          </div>
          <section className="cp-account-summaries" aria-label="Résumé du compte">
            <div className="cp-account-summary">
              <strong>{formatAmount(balance)}</strong>
              <span>Solde du compte</span>
            </div>
            <div className="cp-account-summary">
              <strong>{formatAmount(earnings)}</strong>
              <span>Revenus cumulés</span>
            </div>
          </section>
        </section>

        <section className="cp-account-quick-actions" aria-label="Actions rapides">
          {quickActions.map(({ label, icon: Icon, href }) => (
            <button key={label} type="button" onClick={() => navigate(href)}>
              <span><Icon aria-hidden="true" /></span>
              <span>{label}</span>
            </button>
          ))}
        </section>

        <section className="cp-account-promo" aria-label="Missions Equinor">
          <img src={equinorPhone} alt="Téléphone Equinor présenté dans une ambiance lumineuse" />
          <div>
            <strong>Centre des missions</strong>
            <span>Terminez des missions et obtenez des bonus attractifs.</span>
            <button type="button" onClick={() => navigate("/tasks")}>
              Accéder <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="cp-account-services" aria-labelledby="account-services-title">
          <h2 id="account-services-title">Services du compte</h2>
          <div className="cp-services-list">
            {serviceItems.map(({ label, icon: Icon, href, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (action === "download") {
                    void handleDownload();
                    return;
                  }
                  if (href) navigate(href);
                }}
              >
                <span className="cp-service-icon"><Icon aria-hidden="true" /></span>
                <span>{label}</span>
                <ChevronRight className="cp-service-chevron" aria-hidden="true" />
              </button>
            ))}
            {user.isAdmin && (
              <button className="cp-admin-row" type="button" onClick={handleAdminClick} data-testid="button-admin">
                <span className="cp-service-icon"><Shield aria-hidden="true" /></span>
                <span>Accès administrateur</span>
                <ChevronRight className="cp-service-chevron" aria-hidden="true" />
              </button>
            )}
            <button className="cp-logout-row" type="button" onClick={handleLogout} data-testid="button-logout">
              <span className="cp-service-icon"><LogOut aria-hidden="true" /></span>
              <span>Déconnexion</span>
              <ChevronRight className="cp-service-chevron" aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>

      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Code d'accès administrateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Entrez votre code PIN pour accéder au panel administrateur
            </p>
            <Input
              type="password"
              value={adminPin}
              onChange={(event) => setAdminPin(event.target.value)}
              placeholder="Code PIN"
              className="text-center text-2xl tracking-widest"
              maxLength={8}
              data-testid="input-admin-pin"
            />
            <Button
              onClick={() => {
                if (adminPin.length < 4) {
                  toast({ title: "Le code PIN doit contenir au moins 4 caractères", variant: "destructive" });
                  return;
                }
                verifyPinMutation.mutate(adminPin);
              }}
              disabled={verifyPinMutation.isPending || adminPin.length < 4}
              className="w-full bg-[#bd304c] hover:bg-[#9e263c]"
              data-testid="button-verify-pin"
            >
              {verifyPinMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
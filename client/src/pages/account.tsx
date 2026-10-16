import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCountryByCode, type ApiCountry } from "@/lib/countries";
import {
  ChevronRight,
  CreditCard,
  Download,
  Gift,
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
import { CatlLogo } from "@/components/catl-logo";
import { catlBatteryBackground } from "@/assets/catl-media";
import depositIcon from "@/assets/images/home-icons/deposit.png";
import withdrawalIcon from "@/assets/images/home-icons/withdrawal.png";
import supportIcon from "@/assets/images/home-icons/support.png";
import checkinIcon from "@/assets/images/home-icons/checkin.png";
import aboutServiceIcon from "@assets/IMG_20260829_070949_099_1792169768206.jpg";
import cardServiceIcon from "@assets/IMG_20260829_070948_735_1792169768250.jpg";
import supportServiceIcon from "@assets/IMG_20260829_070945_309_1792169768290.jpg";
import rulesServiceIcon from "@assets/IMG_20260829_070922_702_1792169768453.jpg";
import historyServiceIcon from "@assets/IMG_20260829_070849_484_1792169768572.jpg";
import giftServiceIcon from "@assets/IMG_20260829_070918_659_1792169768495.jpg";
import appServiceIcon from "@assets/IMG_20260829_070845_119_1792169768653.jpg";
import passwordServiceIcon from "@assets/IMG_20260829_070949_286_1792170479316.jpg";
import logoutServiceIcon from "@assets/IMG_20260829_070914_741_1792170479426.jpg";
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
  const {
    data: purchasedProducts,
    isLoading: purchasedProductsLoading,
    isError: purchasedProductsError,
  } = useQuery<Array<{
    product?: {
      name?: string;
      sortOrder?: number;
      isFree?: boolean;
    } | null;
  }>>({
    queryKey: ["/api/user/products"],
    enabled: !!user,
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
  const balance = Number.parseFloat(user.depositBalance || "0");
  const earnings = Number.parseFloat(user.earningsBalance || "0");
  const phonePrefix = country?.phonePrefix || "";
  const formatAmount = (amount: number) => `${Math.round(amount).toLocaleString("fr-FR")} ${currency}`;
  const vipLevel = Math.max(
    0,
    ...(purchasedProducts || [])
      .filter((purchase) => purchase.product && !purchase.product.isFree)
      .map(({ product }) => {
        const namedVipLevel = /^VIP\s*(\d+)$/i.exec(product?.name || "");
        if (namedVipLevel) return Number(namedVipLevel[1]);
        const offerOrder = Number(product?.sortOrder);
        return Number.isInteger(offerOrder) && offerOrder >= 0 ? offerOrder + 1 : 0;
      }),
  );
  const vipBadge = purchasedProductsLoading
    ? "VIP…"
    : purchasedProductsError || !purchasedProducts
      ? "VIP —"
      : `VIP ${vipLevel}`;

  const quickActions = [
    { label: "Dépôt", icon: depositIcon, href: "/deposit" },
    { label: "Retrait", icon: withdrawalIcon, href: "/withdrawal" },
    { label: "Aide", icon: supportIcon, href: "/service" },
    { label: "Pointage", icon: checkinIcon, href: "/checkin" },
  ];

  const serviceItems = [
    { label: "À propos", icon: Info, image: aboutServiceIcon, href: "/about" },
    { label: "Bon à savoir", icon: ScrollText, image: rulesServiceIcon, href: "/rules" },
    { label: "Historique", icon: History, image: historyServiceIcon, href: "/history" },
    { label: "Service client", icon: Headset, image: supportServiceIcon, href: "/service" },
    { label: "Télécharger l’application", icon: Download, image: appServiceIcon, action: "download" as const },
    { label: "Lier une carte bancaire", icon: CreditCard, image: cardServiceIcon, href: "/wallet" },
    { label: "Changer le mot de passe", icon: KeyRound, image: passwordServiceIcon, href: "/change-password" },
    { label: "Échanger un cadeau", icon: Gift, image: giftServiceIcon, href: "/gift-code" },
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
              <CatlLogo alt="Logo CATL" />
            </div>
            <div className="cp-profile-copy">
              <p className="cp-account-phone">+{phonePrefix} {user.phone}</p>
              <span className="cp-account-level">{vipBadge}</span>
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
          {quickActions.map(({ label, icon, href }) => (
            <button key={label} type="button" onClick={() => navigate(href)}>
              <span><img src={icon} alt="" aria-hidden="true" /></span>
              <span>{label}</span>
            </button>
          ))}
        </section>

        <section className="cp-account-promo" aria-label="Missions Equinor">
          <img src={catlBatteryBackground} alt="Visuel de batteries CATL" />
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
            {serviceItems.map(({ label, icon: Icon, image, href, action }) => (
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
                <span className={`cp-service-icon${image ? " cp-service-icon--image" : ""}`}>
                  {image ? <img src={image} alt="" aria-hidden="true" /> : <Icon aria-hidden="true" />}
                </span>
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
              <span className="cp-service-icon cp-service-icon--image">
                <img src={logoutServiceIcon} alt="" aria-hidden="true" />
              </span>
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
              className="w-full bg-[#1947b8] hover:bg-[#12358f]"
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
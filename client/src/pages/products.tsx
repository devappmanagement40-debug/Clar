import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { getCountryByCode } from "@/lib/countries";
import { AlertTriangle, ChevronRight, Loader2, ShoppingBag } from "lucide-react";
import { useLocation } from "wouter";
import type { Product } from "@shared/schema";
import equipmentIcon from "@assets/IMG_20260829_070948_545_1791818775118.jpg";
import revenueIcon from "@assets/IMG_20260829_070922_702_1791818835262.jpg";

interface ProductWithOwnership extends Product {
  isOwned: boolean;
  canClaimFree: boolean;
  ownedCount?: number;
}

export default function ProductsPage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<ProductWithOwnership | null>(null);

  const {
    data: products,
    isLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useQuery<ProductWithOwnership[]>({
    queryKey: ["/api/products"],
  });

  const { data: userProducts } = useQuery<any[]>({
    queryKey: ["/api/user/products"],
  });

  const purchaseMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", `/api/products/${productId}/purchase`, {});
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Achat impossible");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/products"] });
      refreshUser();
      setSelectedProduct(null);
      toast({ title: "Produit acheté !", description: "Vous commencerez à recevoir des gains demain." });
    },
    onError: (error: Error) => {
      setSelectedProduct(null);
      toast({ title: "Achat impossible", description: error.message, variant: "destructive" });
    },
  });

  if (!user) return null;

  const country = getCountryByCode(user.country);
  const currency = country?.currency || "FCFA";
  const formatAmount = (value: number | null) =>
    value !== null && Number.isFinite(value)
      ? `${currency} ${Math.round(value).toLocaleString("fr-FR")}`
      : "—";
  const availableProducts = products?.filter(product => !product.isFree) || [];
  const activeUserProducts = (userProducts || []).filter(product => product.status === "active");
  const ownedCount = userProducts === undefined ? null : activeUserProducts.length;
  const dailyRevenue = userProducts === undefined
    ? null
    : activeUserProducts.reduce<number | null>((sum, item) => {
        const amount = Number(item.product?.dailyEarnings);
        return sum !== null && Number.isFinite(amount) ? sum + amount : null;
      }, 0);

  return (
    <main className="cp-products-page">
      <style>{`
        .cp-products-page {
          min-height: 100dvh;
          padding-bottom: calc(78px + env(safe-area-inset-bottom));
          background: #ffffff;
          color: #17191c;
          font-family: Inter, Arial, sans-serif;
        }
        .cp-products-shell { width: 100%; max-width: 512px; margin: 0 auto; background: #ffffff; }
        .cp-products-stats {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;
          padding: 16px 18px 14px; background: #ffffff;
        }
        .cp-products-stat {
          display: flex; min-width: 0; min-height: 82px; align-items: center; gap: 10px;
          padding: 11px; border: 2px solid #17191c; border-radius: 14px;
          background: #ffffff; color: #17191c;
          box-shadow: 0 3px 0 #17191c, 0 7px 16px rgba(17,24,39,.12);
        }
        .cp-products-stat-link {
          width: 100%; font: inherit; text-align: left; cursor: pointer;
          transition: transform .16s ease, background-color .16s ease, box-shadow .16s ease;
        }
        .cp-products-stat-link:hover { background: #fff7f8; box-shadow: 0 4px 0 #17191c, 0 9px 18px rgba(17,24,39,.15); }
        .cp-products-stat-link:active { transform: translateY(1px); }
        .cp-products-stat-link:focus-visible,
        .cp-product-buy:focus-visible,
        .cp-products-retry:focus-visible,
        .cp-products-modal-actions button:focus-visible {
          outline: 3px solid rgba(189,48,76,.35); outline-offset: 3px;
        }
        .cp-products-stat-icon {
          display: grid; width: 42px; height: 42px; flex: 0 0 42px;
          place-items: center; border: 1px solid #f0dadd; border-radius: 12px;
          background: #fff0f3; color: #bd304c;
        }
        .cp-products-stat-icon svg { width: 22px; height: 22px; }
        .cp-products-stat-icon--image {
          overflow: hidden; border-color: #17191c; background: #000000;
        }
        .cp-products-stat-icon--image img { display: block; width: 100%; height: 100%; object-fit: contain; }
        .cp-products-stat-copy { flex: 1; min-width: 0; }
        .cp-products-stat-value {
          display: block; overflow: hidden; color: #000; font-size: clamp(15px,4.2vw,18px); font-weight: 800; line-height: 1.1;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .cp-products-stat-label { display: block; margin-top: 5px; color: #625e63; font-size: 12px; line-height: 1.2; }
        .cp-products-stat-chevron { flex: 0 0 auto; color: #bd304c; }
        .cp-products-list { display: grid; gap: 14px; padding: 0 18px; }
        .cp-product-card {
          display: grid; grid-template-columns: 116px minmax(0, 1fr);
          gap: 12px; padding: 14px; border: 2px solid #17191c;
          border-radius: 16px; background: #ffffff;
          box-shadow: 0 3px 0 #17191c, 0 8px 18px rgba(17,24,39,.14);
          transition: box-shadow .16s ease, transform .16s ease;
        }
        .cp-product-card:hover { box-shadow: 0 4px 0 #17191c, 0 11px 22px rgba(17,24,39,.16); }
        .cp-product-card.is-unavailable { border-color: #9ca3af; box-shadow: 0 3px 0 #9ca3af, 0 7px 14px rgba(17,24,39,.08); }
        .cp-product-card.is-unavailable .cp-product-image { border-color: #9ca3af; }
        .cp-product-image {
          position: relative; width: 116px; height: 116px; overflow: hidden;
          border: 2px solid #17191c; border-radius: 12px; background: #fff4f6;
        }
        .cp-product-image-placeholder {
          position: absolute; inset: 0; display: grid; place-items: center;
          background: #fff4f6; color: #bd304c;
        }
        .cp-product-image img {
          position: absolute; z-index: 1; inset: 0; display: block;
          width: 100%; height: 100%; object-fit: cover; background: #fff;
        }
        .cp-product-info { min-width: 0; }
        .cp-product-name {
          margin: 1px 0 10px; color: #17191c; font-size: 18px; font-weight: 800;
          line-height: 1.15; overflow-wrap: anywhere;
        }
        .cp-product-line {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 7px;
          margin-top: 7px; color: #625e63; font-size: 12px; line-height: 1.25;
        }
        .cp-product-line span { flex: 1; min-width: 0; }
        .cp-product-line strong { max-width: 60%; color: #17191c; font-weight: 700; text-align: right; overflow-wrap: anywhere; }
        .cp-product-line.revenue strong { color: #9e263c; }
        .cp-product-buy {
          display: inline-flex; grid-column: 2; min-height: 42px; align-items: center;
          justify-content: center; justify-self: end; gap: 6px; min-width: 126px; margin-top: 2px;
          padding: 9px 16px; border: 2px solid #17191c; border-radius: 11px;
          background: #bd304c; color: #ffffff; font-size: 14px; font-weight: 800;
          box-shadow: 0 3px 0 #17191c, 0 6px 12px rgba(17,24,39,.14);
          transition: transform .16s ease, background-color .16s ease;
        }
        .cp-product-buy:hover:not(:disabled) { transform: translateY(-1px); background: #a92642; }
        .cp-product-buy:active:not(:disabled) { transform: translateY(1px); }
        .cp-product-buy.is-unavailable {
          border-color: #9ca3af; background: #e5e7eb; color: #6b7280;
          box-shadow: 0 3px 0 #9ca3af; cursor: not-allowed;
        }
        .cp-products-empty {
          display: flex; min-height: 260px; flex-direction: column; align-items: center;
          justify-content: center; gap: 10px; border: 2px solid #17191c; border-radius: 16px;
          padding: 20px; background: #ffffff; color: #625e63; text-align: center;
          box-shadow: 0 3px 0 #17191c, 0 8px 18px rgba(17,24,39,.12);
        }
        .cp-products-empty > svg { color: #bd304c; }
        .cp-products-empty p { max-width: 280px; margin: 0; font-size: 14px; line-height: 1.4; }
        .cp-products-retry {
          min-height: 42px; margin-top: 4px; padding: 9px 16px;
          border: 2px solid #17191c; border-radius: 10px; background: #bd304c;
          color: #fff; font-size: 13px; font-weight: 800;
        }
        .cp-products-modal-backdrop {
          position: fixed; z-index: 60; inset: 0; display: grid; place-items: center;
          padding: 18px; background: rgba(17,24,39,.42);
        }
        .cp-products-modal {
          width: 100%; max-width: 390px; padding: 20px; border: 2px solid #17191c;
          border-radius: 16px; background: #ffffff; box-shadow: 0 4px 0 #17191c, 0 20px 60px rgba(0,0,0,.25);
        }
        .cp-products-modal h2 { margin: 0; color: #17191c; font-size: 21px; font-weight: 800; }
        .cp-products-modal p { margin: 8px 0 0; color: #625e63; font-size: 13px; line-height: 1.45; }
        .cp-products-modal-warning {
          display: flex; align-items: flex-start; gap: 8px; margin-top: 15px; padding: 10px;
          border: 1px solid #fda4af; border-radius: 10px; background: #fff1f2; color: #9f1239;
          font-size: 12px; line-height: 1.35;
        }
        .cp-products-modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
        .cp-products-modal-actions button {
          min-height: 44px; padding: 10px; border: 2px solid #17191c; border-radius: 10px;
          background: #ffffff; color: #17191c; font-weight: 800;
        }
        .cp-products-modal-actions button:last-child { border-color: #17191c; background: #bd304c; color: #ffffff; }
        @media (max-width: 370px) {
          .cp-products-stats { gap: 8px; padding-right: 14px; padding-left: 14px; }
          .cp-products-stat { gap: 8px; padding: 9px; }
          .cp-products-stat-icon { width: 36px; height: 36px; flex-basis: 36px; }
          .cp-products-list { padding-right: 14px; padding-left: 14px; }
          .cp-product-card { grid-template-columns: 84px minmax(0, 1fr); gap: 8px; padding: 10px; }
          .cp-product-image { width: 84px; height: 84px; }
          .cp-product-name { font-size: 16px; }
          .cp-product-line { gap: 5px; font-size: 11px; }
          .cp-product-buy { min-width: 108px; padding: 9px 12px; font-size: 12px; }
        }
        @media (max-width: 340px) {
          .cp-product-card { grid-template-columns: 72px minmax(0, 1fr); gap: 7px; padding: 9px; }
          .cp-product-image { width: 72px; height: 72px; }
          .cp-product-name { font-size: 15px; }
          .cp-product-line { font-size: 10.5px; }
          .cp-product-buy { min-width: 100px; }
        }
      `}</style>

      <div className="cp-products-shell">
        <h1 className="sr-only">Produits Equinor</h1>

        <section className="cp-products-stats" aria-label="Résumé des produits">
          <button
            className="cp-products-stat cp-products-stat-link"
            type="button"
            onClick={() => navigate("/my-products")}
            aria-label="Voir mes équipements achetés"
          >
            <span className="cp-products-stat-icon cp-products-stat-icon--image">
              <img src={equipmentIcon} alt="" aria-hidden="true" />
            </span>
            <span className="cp-products-stat-copy">
              <strong className="cp-products-stat-value">{ownedCount ?? "—"}</strong>
              <small className="cp-products-stat-label">Mes équipements</small>
            </span>
            <ChevronRight className="cp-products-stat-chevron" aria-hidden="true" size={18} />
          </button>
          <div className="cp-products-stat">
            <span className="cp-products-stat-icon cp-products-stat-icon--image">
              <img src={revenueIcon} alt="" aria-hidden="true" />
            </span>
            <span className="cp-products-stat-copy">
              <strong className="cp-products-stat-value">{formatAmount(dailyRevenue)}</strong>
              <small className="cp-products-stat-label">Revenu quotidien</small>
            </span>
          </div>
        </section>

        <section className="cp-products-list" aria-label="Produits disponibles">
          {isLoading ? (
            <div className="cp-products-empty" role="status">
              <Loader2 className="animate-spin" aria-hidden="true" size={30} />
              <p>Chargement des produits…</p>
            </div>
          ) : productsError && !products ? (
            <div className="cp-products-empty" role="alert">
              <AlertTriangle aria-hidden="true" size={34} />
              <p>Impossible de charger les produits pour le moment.</p>
              <button className="cp-products-retry" type="button" onClick={() => { void refetchProducts(); }}>
                Réessayer
              </button>
            </div>
          ) : availableProducts.length === 0 ? (
            <div className="cp-products-empty" role="status">
              <ShoppingBag aria-hidden="true" size={38} />
              <p>Aucun produit disponible pour le moment</p>
            </div>
          ) : availableProducts.map(product => {
              const imageUrl = product.imageUrl?.trim();
              return (
                <article className={`cp-product-card${product.isActive ? "" : " is-unavailable"}`} key={product.id} data-testid={`product-card-${product.id}`}>
                  <div className="cp-product-image">
                    <span className="cp-product-image-placeholder"><ShoppingBag aria-hidden="true" size={30} /></span>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        loading="lazy"
                        onError={event => { event.currentTarget.style.display = "none"; }}
                      />
                    )}
                  </div>
                  <div className="cp-product-info">
                    <h2 className="cp-product-name">
                      {product.name}
                      {!product.isActive && <span className="ml-2 text-xs font-bold uppercase text-gray-500">Indisponible</span>}
                    </h2>
                    <div className="cp-product-line"><span>Prix :</span><strong>{formatAmount(Number(product.price))}</strong></div>
                    <div className="cp-product-line revenue"><span>Revenu quotidien :</span><strong>{formatAmount(Number(product.dailyEarnings))}</strong></div>
                    <div className="cp-product-line revenue"><span>Revenu total :</span><strong>{formatAmount(Number(product.totalReturn))}</strong></div>
                    <div className="cp-product-line"><span>Cycle :</span><strong>{Number.isFinite(Number(product.cycleDays)) ? `${product.cycleDays} jours` : "—"}</strong></div>
                  </div>
                  <button
                    className={`cp-product-buy${product.isActive ? "" : " is-unavailable"}`}
                    onClick={() => product.isActive && setSelectedProduct(product)}
                    disabled={!product.isActive}
                    aria-label={product.isActive ? `Acheter ${product.name}` : `${product.name} indisponible`}
                    data-testid={`button-purchase-${product.id}`}
                  >
                    {product.isActive ? <>Acheter <ChevronRight aria-hidden="true" size={16} /></> : "Indisponible"}
                  </button>
                </article>
              );
            })}
        </section>
      </div>

      {selectedProduct && (
        <div className="cp-products-modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div
            className="cp-products-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cp-product-confirm-title"
            onClick={event => event.stopPropagation()}
          >
            <h2 id="cp-product-confirm-title">{selectedProduct.name}</h2>
            <p>Après l’achat, vos revenus seront crédités quotidiennement pendant {selectedProduct.cycleDays} jours.</p>
            <div className="cp-product-line"><span>Prix :</span><strong>{formatAmount(Number(selectedProduct.price))}</strong></div>
            <div className="cp-product-line revenue"><span>Revenu quotidien :</span><strong>{formatAmount(Number(selectedProduct.dailyEarnings))}</strong></div>
            {Number(user.balance || 0) < Number(selectedProduct.price) && (
              <div className="cp-products-modal-warning"><AlertTriangle size={16} />Solde insuffisant pour acheter ce produit.</div>
            )}
            <div className="cp-products-modal-actions">
              <button onClick={() => setSelectedProduct(null)}>Annuler</button>
              <button onClick={() => purchaseMutation.mutate(selectedProduct.id)} disabled={purchaseMutation.isPending}>
                {purchaseMutation.isPending ? <Loader2 className="mx-auto animate-spin" size={17} /> : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
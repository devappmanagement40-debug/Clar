import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { getCountryByCode } from "@/lib/countries";
import { Loader2, PackageOpen } from "lucide-react";
import equinorProductBanner from "@assets/ITM4W5DOSVIZHOJCQX74LIO7CA_1791819301503.jpg";

export default function MyProductsPage() {
  const { user } = useAuth();

  const { data: userProducts, isLoading: loadingUserProducts } = useQuery<any[]>({
    queryKey: ["/api/user/products"],
    staleTime: 0,
  });

  if (!user) return null;

  const country = getCountryByCode(user.country);
  const currency = country?.currency === "FCFA" ? "XOF" : country?.currency || "XOF";
  const allUserProducts = userProducts || [];
  const toAmount = (value: unknown) => {
    const amount = Number(value ?? 0);
    return Number.isFinite(amount) ? Math.max(0, amount) : 0;
  };
  const totalReceived = allUserProducts.reduce(
    (sum, up) => sum + toAmount(up.totalEarned),
    0,
  );
  const totalExpected = allUserProducts.reduce((sum, up) => {
    if (up.status !== "active") return sum;
    return sum + toAmount(up.daysRemaining) * toAmount(up.product?.dailyEarnings);
  }, 0);
  const formatStatAmount = (amount: number) => `${amount.toLocaleString("fr-FR")} ${currency}`;

  // Format date as "20 Jul 2026, 15:00"
  const formatPurchaseDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  return (
    <main className="products-reference min-h-full bg-white pb-24">
      <style>{`
        .products-reference { color: #151515; font-family: Inter, Arial, sans-serif; }
        .products-reference .products-screen { width: 100%; max-width: 500px; margin: 0 auto; overflow: hidden; }
         .products-reference .products-hero { position: relative; height: min(70.31vw, 360px); min-height: 270px; overflow: hidden; background: #bd304c; }
         .products-reference .products-hero img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center 48%; pointer-events: none; }
         .products-reference .stat-panel { position: absolute; top: 58%; z-index: 1; display: flex; height: 38%; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 0; border-radius: 24px; background: #bd304c; color: #fff; text-align: center; pointer-events: none; }
         .products-reference .stat-panel.our { left: 4%; width: 45%; }
         .products-reference .stat-panel.my { right: 4%; width: 45%; }
         .products-reference .stat-value { display: block; max-width: 100%; overflow: hidden; padding: 0 8px; font-size: clamp(20px, 5vw, 30px); font-weight: 500; line-height: 1; text-overflow: ellipsis; white-space: nowrap; }
         .products-reference .stat-label { display: block; font-size: clamp(14px, 3.5vw, 20px); font-weight: 500; line-height: 1; }
         .products-reference .stat-toggle { position: absolute; top: 58%; z-index: 2; height: 38%; background: transparent; }
         .products-reference .stat-toggle.our { left: 4%; width: 45%; }
         .products-reference .stat-toggle.my { right: 4%; width: 45%; }
         .products-reference .product-list { padding: 0 12px 20px; background: white; }
         .products-reference .product-card { position: relative; height: 265px; margin-bottom: 0; overflow: hidden; border: 0; border-bottom: 1px solid #eeeeee; border-radius: 0; background: white; box-shadow: none; }
          .products-reference .product-picture { position: absolute; top: 12px; right: 7px; left: auto; width: 154px; height: 154px; overflow: hidden; border: 2px solid #bd304c; border-radius: 11px; background: #fff; }
         .products-reference .product-picture img { width: 100%; height: 100%; object-fit: cover; }
         .products-reference .product-details { position: absolute; top: 17px; left: 31px; right: 181px; overflow: hidden; }
          .products-reference .product-name { overflow: hidden; color: #bd304c; font-size: 23px; font-weight: 500; line-height: 1.15; text-overflow: ellipsis; white-space: nowrap; }
         .products-reference .product-price { margin-top: 22px; color: #171717; font-size: 17px; font-weight: 400; }
         .products-reference .product-line { margin-top: 12px; color: #171717; font-size: 16px; line-height: 1.15; white-space: normal; overflow-wrap: anywhere; }
         .products-reference .product-line strong { margin-left: 8px; color: #171717; font-weight: 400; }
          .products-reference .buy { position: absolute; right: 7px; bottom: 25px; display: grid; width: 154px; height: 61px; place-items: center; border-radius: 14px; background: linear-gradient(180deg, #bd304c 0%, #9e263c 100%); color: white; font-size: 18px; font-weight: 400; line-height: 1.1; text-align: center; }
         .products-reference .my-card { height: 265px; padding-bottom: 0; }
         .products-reference .my-card .product-details { position: absolute; top: 17px; left: 31px; right: 181px; margin-left: 0; padding-top: 0; padding-right: 0; }
         .products-reference .my-card .product-picture { top: 12px; }
         .products-reference .my-card .product-line { margin-top: 12px; }
        .products-reference .empty { display: flex; min-height: 260px; flex-direction: column; align-items: center; justify-content: center; border-radius: 9px; background: white; color: #777; }
        .products-reference .empty img { width: 150px; height: 150px; object-fit: contain; }
        @media (max-width: 360px) {
             .products-reference .stat-panel { gap: 7px; border-radius: 20px; }
            .products-reference .stat-value { font-size: 18px; }
            .products-reference .stat-label { font-size: 13px; }
           .products-reference .product-picture { right: 5px; width: 112px; height: 112px; }
           .products-reference .product-details, .products-reference .my-card .product-details { left: 18px; right: 126px; }
           .products-reference .product-name { font-size: 17px; }
           .products-reference .product-price { margin-top: 18px; font-size: 14px; }
           .products-reference .product-line { margin-top: 9px; font-size: 13px; }
           .products-reference .buy { right: 5px; width: 112px; height: 52px; font-size: 14px; }
        }
          .products-reference {
            min-height: 100dvh;
            background: #ffffff;
           color: #111827;
         }
         .products-reference .products-screen {
           max-width: 512px;
            background: #ffffff;
         }
         .products-reference .products-header {
           display: flex;
           min-height: 72px;
           align-items: center;
           justify-content: center;
           gap: 9px;
           padding: 12px 16px;
           border-bottom: 2px solid #111827;
            background: #ffffff;
         }
         .products-reference .products-header strong {
           color: #111827;
           font-size: 20px;
           font-weight: 900;
         }
         .products-reference .products-hero {
           height: 238px;
           min-height: 0;
           border-bottom: 2px solid #111827;
            background: #bd304c;
         }
         .products-reference .products-hero img {
           position: relative;
           z-index: 0;
           object-position: center;
         }
         .products-reference .stat-panel {
           top: auto;
           bottom: 14px;
            height: 78px;
           border: 2px solid #111827;
            border-radius: 14px;
           background: #fff;
           color: #111827;
            box-shadow: 0 3px 0 #111827, 0 8px 18px rgba(17, 24, 39, .16);
         }
         .products-reference .stat-panel.our,
         .products-reference .stat-toggle.our { left: 16px; width: calc(50% - 22px); }
         .products-reference .stat-panel.my,
         .products-reference .stat-toggle.my { right: 16px; width: calc(50% - 22px); }
          .products-reference .stat-panel { gap: 7px; }
          .products-reference .stat-value {
            font-size: clamp(17px, 4.4vw, 24px);
            font-weight: 800;
          }
          .products-reference .stat-label {
            color: #5f6268;
            font-size: 11px;
            font-weight: 700;
          }
         .products-reference .stat-panel.my-only {
           right: 16px;
           left: 16px;
           width: calc(100% - 32px);
         }
         .products-reference .stat-toggle {
           top: auto;
           bottom: 14px;
           height: 72px;
         }
         .products-reference .stat-value {
           font-size: clamp(18px, 4.8vw, 25px);
           font-weight: 900;
         }
         .products-reference .stat-label {
           font-size: 12px;
           font-weight: 800;
         }
         .products-reference .product-list {
           padding: 18px 16px 28px;
            background: #ffffff;
         }
         .products-reference .product-card {
           display: grid;
           min-height: 236px;
           grid-template-columns: minmax(0, 1fr) 124px;
           grid-template-rows: minmax(0, 1fr) 53px;
           gap: 12px;
           margin-bottom: 16px;
           padding: 14px;
           overflow: hidden;
           border: 2px solid #111827;
           border-radius: 14px;
           background: #fff;
           box-shadow: 0 4px 0 #111827;
         }
         .products-reference .product-picture {
           position: static;
            display: grid;
           grid-column: 2;
           grid-row: 1;
           width: 100%;
           height: 116px;
            place-items: center;
            border: 2px solid #bd304c;
           border-radius: 10px;
         }
         .products-reference .product-picture img {
           width: 100%;
           height: 100%;
           padding: 6px;
           object-fit: contain;
            background: #ffffff;
         }
          .products-reference .product-picture > svg { width: 42px; height: 42px; color: #bd304c; }
         .products-reference .product-details,
         .products-reference .my-card .product-details {
           position: static;
           grid-column: 1;
           grid-row: 1 / span 2;
           min-width: 0;
           overflow: hidden;
         }
         .products-reference .product-name {
            color: #bd304c;
           font-size: 19px;
           font-weight: 900;
           white-space: normal;
         }
         .products-reference .product-price {
           margin-top: 12px;
           color: #111827;
           font-size: 16px;
           font-weight: 900;
         }
         .products-reference .product-line {
           margin-top: 8px;
           color: #4b5563;
           font-size: 13px;
         }
         .products-reference .product-line strong {
           display: block;
           margin: 2px 0 0;
           color: #111827;
           font-weight: 800;
         }
         .products-reference .buy {
           position: static;
           grid-column: 2;
           grid-row: 2;
           width: 100%;
           height: auto;
           border: 2px solid #111827;
           border-radius: 11px;
            background: #bd304c;
            color: #ffffff;
           font-size: 13px;
           font-weight: 900;
           box-shadow: 0 3px 0 #111827;
         }
         .products-reference .my-card {
           min-height: 255px;
           grid-template-rows: 1fr;
         }
         .products-reference .my-card .product-picture { grid-row: 1; }
         .products-reference .empty {
           min-height: 280px;
           border: 2px solid #111827;
           border-radius: 14px;
           background: #fff;
         }
          .products-reference .empty > svg { width: 52px; height: 52px; color: #bd304c; }
         @media (max-width: 360px) {
          .products-reference .products-hero { height: 228px; }
           .products-reference .product-list { padding-right: 12px; padding-left: 12px; }
           .products-reference .product-card {
             grid-template-columns: minmax(0, 1fr) 104px;
             gap: 9px;
             padding: 11px;
           }
           .products-reference .product-picture { height: 100px; }
           .products-reference .product-name { font-size: 16px; }
           .products-reference .product-line { font-size: 12px; }
           .products-reference .buy { font-size: 11px; }
         }
          .products-reference .my-card {
            display: grid;
            width: calc(100% - 12px);
            min-height: 0;
            grid-template-columns: 72px minmax(0, 1fr);
            grid-template-rows: auto auto;
            align-items: center;
            gap: 6px 10px;
            margin: 0 auto 10px;
            padding: 10px;
            border: 2px solid #111827;
            border-radius: 12px;
            background: #ffffff;
            box-shadow: 0 3px 0 #111827, 0 6px 14px rgba(17, 24, 39, .1);
          }
          .products-reference .my-card-heading { display: contents; }
          .products-reference .my-card-heading .product-picture {
            position: static;
            display: grid;
            width: 72px;
            height: 72px;
            grid-column: 1;
            grid-row: 1 / span 2;
            align-self: center;
            place-items: center;
            overflow: hidden;
            border: 2px solid #bd304c;
            border-radius: 10px;
            background: #ffffff;
          }
          .products-reference .my-card-heading .product-picture img {
            display: block;
            width: 100%;
            height: 100%;
            padding: 0;
            object-fit: cover;
          }
          .products-reference .my-card-heading .product-picture > svg {
            width: 30px;
            height: 30px;
            color: #bd304c;
          }
          .products-reference .my-card-product-copy {
            min-width: 0;
            grid-column: 2;
            grid-row: 1;
            align-self: end;
          }
          .products-reference .my-card-product-copy .product-name {
            margin: 0;
            overflow: hidden;
            color: #bd304c;
            font-size: 17px;
            font-weight: 900;
            line-height: 1.2;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .products-reference .my-card-product-price {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 4px 8px;
            margin: 6px 0 0;
            color: #6b7280;
            font-size: 12px;
            line-height: 1.2;
          }
          .products-reference .my-card-product-price strong {
            color: #111827;
            font-size: 14px;
            font-weight: 900;
          }
          .products-reference .my-card-details {
            display: flex;
            min-width: 0;
            grid-column: 2;
            grid-row: 2;
            flex-direction: column;
            gap: 4px;
            align-self: start;
          }
          .products-reference .my-card-details .product-line {
            display: flex;
            min-width: 0;
            align-items: baseline;
            justify-content: space-between;
            gap: 6px;
            margin: 0;
            color: #6b7280;
            font-size: 10px;
            line-height: 1.2;
          }
          .products-reference .my-card-details .product-line strong {
            display: block;
            flex-shrink: 0;
            min-width: 0;
            margin: 0;
            overflow-wrap: anywhere;
            color: #111827;
            font-size: 11px;
            font-weight: 800;
          }
          .products-reference .my-card-details .product-line-date strong {
            text-align: right;
          }
          @media (max-width: 360px) {
            .products-reference .my-card {
              width: calc(100% - 8px);
              grid-template-columns: 64px minmax(0, 1fr);
              gap: 5px 8px;
              padding: 9px;
            }
            .products-reference .my-card-heading .product-picture { width: 64px; height: 64px; }
            .products-reference .my-card-product-copy .product-name { font-size: 16px; }
            .products-reference .my-card-details { gap: 3px; }
            .products-reference .my-card-details .product-line { font-size: 9px; }
            .products-reference .my-card-details .product-line strong { font-size: 10px; }
          }
      `}</style>

      <div className="products-screen">
        <header className="products-header">
          <strong>Mes produits</strong>
        </header>
        <section className="products-hero" aria-label="Produits">
          <img src={equinorProductBanner} alt="" />
          <div
            className="stat-panel our"
            aria-label={`Total reçu : ${loadingUserProducts ? "chargement" : formatStatAmount(totalReceived)}`}
            aria-busy={loadingUserProducts}
          >
            <span className="stat-value">
              {loadingUserProducts ? "—" : formatStatAmount(totalReceived)}
            </span>
            <span className="stat-label">Total reçu</span>
          </div>
          <div
            className="stat-panel my"
            aria-label={`Total attendus : ${loadingUserProducts ? "chargement" : formatStatAmount(totalExpected)}`}
            aria-busy={loadingUserProducts}
          >
            <span className="stat-value">
              {loadingUserProducts ? "—" : formatStatAmount(totalExpected)}
            </span>
            <span className="stat-label">Total attendus</span>
          </div>
        </section>

        <div className="product-list">
          <div>
              {loadingUserProducts ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#bd304c]" />
                </div>
              ) : allUserProducts.length === 0 ? (
                <div className="empty">
                  <PackageOpen aria-hidden="true" />
                  <p>Aucun produit Equinor acheté</p>
                  <p className="text-sm text-gray-400">Achetez des produits pour commencer à gagner</p>
                </div>
              ) : (
                allUserProducts.map((up: any) => {
                  const cycleDays = up.product?.cycleDays || 60;
                  const daysRemaining = up.daysRemaining || 0;
                  const daysCompleted = Math.max(0, cycleDays - daysRemaining);
                  const earnedSoFar = parseFloat(up.totalEarned || "0");

                  return (
                    <div
                      key={up.id}
                      className="product-card my-card"
                      data-testid={`my-product-card-${up.id}`}
                    >
                      <div className="my-card-heading">
                        <div className="product-picture">
                          {up.product?.imageUrl ? (
                            <img src={up.product.imageUrl} alt={up.product?.name || "Produit"} />
                          ) : (
                            <PackageOpen aria-hidden="true" />
                          )}
                        </div>
                        <div className="my-card-product-copy">
                          <p className="product-name">{up.product?.name || "Produit"}</p>
                          <p className="my-card-product-price">
                            <span>Prix d'achat</span>
                            <strong>{Number(up.product?.price || 0).toLocaleString("fr-FR")} {currency}</strong>
                          </p>
                        </div>
                      </div>
                      <div className="my-card-details">
                        <p className="product-line">
                          <span>Jours d'exécution</span>
                          <strong>{daysCompleted} / {cycleDays}</strong>
                        </p>
                        <p className="product-line">
                          <span>Revenu généré</span>
                          <strong>{earnedSoFar.toLocaleString("fr-FR")} {currency}</strong>
                        </p>
                        <p className="product-line">
                          <span>Revenu total</span>
                          <strong>{Number(up.product?.totalReturn || 0).toLocaleString("fr-FR")} {currency}</strong>
                        </p>
                        <p className="product-line product-line-date">
                          <span>Date</span>
                          <strong>{formatPurchaseDate(up.purchasedAt)}</strong>
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
          </div>
        </div>
      </div>
    </main>
  );
}

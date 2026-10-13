import{e as L,a as M,b as U,u as I,r as S,c as y,j as e,L as P,q as N,g as _}from"./index-AKgavA8R.js";import{u as K}from"./useMutation-D24xPBd6.js";import{g as T}from"./countries-CQYJEBgX.js";import{C as V}from"./chevron-right-Onmv5EYQ.js";import{T as A}from"./triangle-alert-BPFBh2Pk.js";const q=L("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);function k(t,l){if(!Number.isFinite(t)||t<0)throw new RangeError(`${l} must be a finite, non-negative amount`);return Math.round(t*100)}function p(t){return t/100}function D(t,l,m){const n=k(t,"Total balance"),a=k(l,"Withdrawable balance"),r=k(m,"Product price");if(a>n)throw new RangeError("Withdrawable balance cannot exceed total balance");const u=n-a,x=r<=n,h=x?Math.min(r,u):0,f=x?r-h:0;return{totalBalance:p(n),depositBalance:p(u),earningsBalance:p(a),productPrice:p(r),depositUsed:p(h),earningsUsed:p(f),canPurchase:x}}const Q="/assets/IMG_20260829_070948_545_1791818775118-D3Am8Nf4.jpg",W="/assets/IMG_20260829_070922_702_1791818835262-ZV9wIvb4.jpg";function X(){const{user:t,refreshUser:l}=M(),{toast:m}=U(),[,n]=I(),[a,r]=S.useState(null),{data:u,isLoading:x,isError:h,refetch:f}=y({queryKey:["/api/products"]}),{data:b}=y({queryKey:["/api/user/products"]}),{data:v,isLoading:F,isError:R}=y({queryKey:["/api/withdrawals/available"]}),w=K({mutationFn:async s=>{const o=await _("POST",`/api/products/${s}/purchase`,{});if(!o.ok){const d=await o.json();throw new Error(d.message||"Achat impossible")}return o.json()},onSuccess:()=>{N.invalidateQueries({queryKey:["/api/products"]}),N.invalidateQueries({queryKey:["/api/user/products"]}),N.invalidateQueries({queryKey:["/api/withdrawals/available"]}),l(),r(null),m({title:"Produit acheté !",description:"Vous commencerez à recevoir des gains demain."})},onError:s=>{r(null),m({title:"Achat impossible",description:s.message,variant:"destructive"})}});if(!t)return null;const E=T(t.country)?.currency||"FCFA",i=s=>s!==null&&Number.isFinite(s)?`${E} ${Math.round(s).toLocaleString("fr-FR")}`:"—",z=u?.filter(s=>!s.isFree)||[],C=(b||[]).filter(s=>s.status==="active"),$=b===void 0?null:C.length,B=b===void 0?null:C.reduce((s,o)=>{const d=Number(o.product?.dailyEarnings);return s!==null&&Number.isFinite(d)?s+d:null},0),g=Number(t.balance||0),j=v?Number(v.availableBalance):null;let c=null;if(a&&Number.isFinite(g)&&j!==null&&Number.isFinite(j))try{c=D(g,j,Number(a.price))}catch{}return e.jsxs("main",{className:"cp-products-page",children:[e.jsx("style",{children:`
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
          display: grid;
          grid-template-columns: clamp(72px, 22vw, 100px) minmax(0, 1fr) minmax(80px, 94px);
          align-items: center; gap: 10px; padding: 12px; border: 2px solid #17191c;
          border-radius: 16px; background: #ffffff;
          box-shadow: 0 3px 0 #17191c, 0 8px 18px rgba(17,24,39,.14);
          transition: box-shadow .16s ease, transform .16s ease;
        }
        .cp-product-card:hover { box-shadow: 0 4px 0 #17191c, 0 11px 22px rgba(17,24,39,.16); }
        .cp-product-card.is-unavailable { border-color: #9ca3af; box-shadow: 0 3px 0 #9ca3af, 0 7px 14px rgba(17,24,39,.08); }
        .cp-product-card.is-unavailable .cp-product-image { border-color: #9ca3af; }
        .cp-product-image {
          position: relative; width: 100%; aspect-ratio: 1; min-width: 0; overflow: hidden;
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
          margin: 0 0 6px; color: #17191c; font-size: 18px; font-weight: 800;
          line-height: 1.15; overflow-wrap: anywhere;
        }
        .cp-product-line {
          display: grid; grid-template-columns: minmax(0, 1fr) auto;
          align-items: baseline; gap: 5px; margin-top: 5px;
          color: #625e63; font-size: clamp(11px, 3.1vw, 13px); line-height: 1.22;
        }
        .cp-product-line span { min-width: 0; }
        .cp-product-line strong { max-width: 100%; color: #17191c; font-weight: 700; text-align: right; overflow-wrap: anywhere; }
        .cp-product-line.revenue strong { color: #9e263c; }
        .cp-product-buy {
          display: inline-flex; grid-column: 3; grid-row: 1; min-width: 0; min-height: 38px;
          align-items: center; justify-content: center; justify-self: stretch;
          padding: 8px 7px; border: 2px solid #17191c; border-radius: 999px;
          background: linear-gradient(120deg, #bd304c 0%, #9e263c 100%);
          color: #ffffff; font-size: 13px; font-weight: 800; white-space: nowrap;
          box-shadow: 0 2px 0 #17191c, 0 5px 10px rgba(17,24,39,.12);
          transition: transform .16s ease, filter .16s ease;
        }
        .cp-product-buy:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(.96); }
        .cp-product-buy:active:not(:disabled) { transform: translateY(1px); }
        .cp-product-buy.is-unavailable {
          border-color: #9ca3af; background: #e5e7eb; color: #6b7280;
          box-shadow: 0 3px 0 #9ca3af; cursor: not-allowed; white-space: normal; line-height: 1.1;
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
        .cp-products-modal-wallets {
          display: grid; gap: 8px; margin-top: 14px; padding: 12px;
          border: 1px solid #e4d5d8; border-radius: 12px; background: #fffafb;
        }
        .cp-products-modal-wallet-row {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
          color: #4b4547; font-size: 12px; line-height: 1.35;
        }
        .cp-products-modal-wallet-row strong { flex: 0 0 auto; color: #17191c; font-size: 12px; }
        .cp-products-modal-wallet-note {
          margin: 2px 0 0 !important; padding-top: 8px; border-top: 1px dashed #dfc7cd;
          color: #7f2639 !important; font-size: 11px !important;
        }
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
          .cp-product-card { grid-template-columns: 68px minmax(0, 1fr) 72px; gap: 7px; padding: 9px; }
          .cp-product-name { font-size: 16px; }
          .cp-product-line { gap: 4px; font-size: 11px; }
          .cp-product-buy { min-height: 36px; padding: 6px 4px; font-size: 11px; }
        }
      `}),e.jsxs("div",{className:"cp-products-shell",children:[e.jsx("h1",{className:"sr-only",children:"Produits Equinor"}),e.jsxs("section",{className:"cp-products-stats","aria-label":"Résumé des produits",children:[e.jsxs("button",{className:"cp-products-stat cp-products-stat-link",type:"button",onClick:()=>n("/my-products"),"aria-label":"Voir mes équipements achetés",children:[e.jsx("span",{className:"cp-products-stat-icon cp-products-stat-icon--image",children:e.jsx("img",{src:Q,alt:"","aria-hidden":"true"})}),e.jsxs("span",{className:"cp-products-stat-copy",children:[e.jsx("strong",{className:"cp-products-stat-value",children:$??"—"}),e.jsx("small",{className:"cp-products-stat-label",children:"Mes équipements"})]}),e.jsx(V,{className:"cp-products-stat-chevron","aria-hidden":"true",size:18})]}),e.jsxs("div",{className:"cp-products-stat",children:[e.jsx("span",{className:"cp-products-stat-icon cp-products-stat-icon--image",children:e.jsx("img",{src:W,alt:"","aria-hidden":"true"})}),e.jsxs("span",{className:"cp-products-stat-copy",children:[e.jsx("strong",{className:"cp-products-stat-value",children:i(B)}),e.jsx("small",{className:"cp-products-stat-label",children:"Revenu quotidien"})]})]})]}),e.jsx("section",{className:"cp-products-list","aria-label":"Produits disponibles",children:x?e.jsxs("div",{className:"cp-products-empty",role:"status",children:[e.jsx(P,{className:"animate-spin","aria-hidden":"true",size:30}),e.jsx("p",{children:"Chargement des produits…"})]}):h&&!u?e.jsxs("div",{className:"cp-products-empty",role:"alert",children:[e.jsx(A,{"aria-hidden":"true",size:34}),e.jsx("p",{children:"Impossible de charger les produits pour le moment."}),e.jsx("button",{className:"cp-products-retry",type:"button",onClick:()=>{f()},children:"Réessayer"})]}):z.length===0?e.jsxs("div",{className:"cp-products-empty",role:"status",children:[e.jsx(q,{"aria-hidden":"true",size:38}),e.jsx("p",{children:"Aucun produit disponible pour le moment"})]}):z.map(s=>{const o=s.imageUrl?.trim();return e.jsxs("article",{className:`cp-product-card${s.isActive?"":" is-unavailable"}`,"data-testid":`product-card-${s.id}`,children:[e.jsxs("div",{className:"cp-product-image",children:[e.jsx("span",{className:"cp-product-image-placeholder",children:e.jsx(q,{"aria-hidden":"true",size:30})}),o&&e.jsx("img",{src:o,alt:s.name,loading:"lazy",onError:d=>{d.currentTarget.style.display="none"}})]}),e.jsxs("div",{className:"cp-product-info",children:[e.jsxs("h2",{className:"cp-product-name",children:[s.name,!s.isActive&&e.jsx("span",{className:"ml-2 text-xs font-bold uppercase text-gray-500",children:"Indisponible"})]}),e.jsxs("div",{className:"cp-product-line",children:[e.jsx("span",{children:"Prix :"}),e.jsx("strong",{children:i(Number(s.price))})]}),e.jsxs("div",{className:"cp-product-line revenue",children:[e.jsx("span",{children:"Revenu quotidien :"}),e.jsx("strong",{children:i(Number(s.dailyEarnings))})]}),e.jsxs("div",{className:"cp-product-line revenue",children:[e.jsx("span",{children:"Revenu total :"}),e.jsx("strong",{children:i(Number(s.totalReturn))})]}),e.jsxs("div",{className:"cp-product-line",children:[e.jsx("span",{children:"Cycle :"}),e.jsx("strong",{children:Number.isFinite(Number(s.cycleDays))?`${s.cycleDays} jours`:"—"})]})]}),e.jsx("button",{className:`cp-product-buy${s.isActive?"":" is-unavailable"}`,onClick:()=>s.isActive&&r(s),disabled:!s.isActive,"aria-label":s.isActive?`Acheter ${s.name}`:`${s.name} indisponible`,"data-testid":`button-purchase-${s.id}`,children:s.isActive?"Acheter":"Indisponible"})]},s.id)})})]}),a&&e.jsx("div",{className:"cp-products-modal-backdrop",onClick:()=>r(null),children:e.jsxs("div",{className:"cp-products-modal",role:"dialog","aria-modal":"true","aria-labelledby":"cp-product-confirm-title",onClick:s=>s.stopPropagation(),children:[e.jsx("h2",{id:"cp-product-confirm-title",children:a.name}),e.jsxs("p",{children:["Après l’achat, vos revenus seront crédités quotidiennement pendant ",a.cycleDays," jours."]}),e.jsxs("div",{className:"cp-product-line",children:[e.jsx("span",{children:"Prix :"}),e.jsx("strong",{children:i(Number(a.price))})]}),e.jsxs("div",{className:"cp-product-line revenue",children:[e.jsx("span",{children:"Revenu quotidien :"}),e.jsx("strong",{children:i(Number(a.dailyEarnings))})]}),e.jsx("div",{className:"cp-products-modal-wallets","aria-label":"Soldes utilisés pour l'achat",children:c?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cp-products-modal-wallet-row",children:[e.jsx("span",{children:"Solde du compte (dépôts)"}),e.jsx("strong",{children:i(c.depositBalance)})]}),e.jsxs("div",{className:"cp-products-modal-wallet-row",children:[e.jsx("span",{children:"Revenus cumulés (retirables)"}),e.jsx("strong",{children:i(c.earningsBalance)})]}),c.canPurchase&&e.jsxs("p",{className:"cp-products-modal-wallet-note",children:["Pour cet achat : ",i(c.depositUsed)," prélevés sur les dépôts",c.earningsUsed>0&&`, puis ${i(c.earningsUsed)} sur les revenus retirables`,"."]})]}):F?e.jsx("p",{role:"status",children:"Vérification de la répartition des soldes…"}):R||!v?e.jsx("p",{role:"status",children:"Répartition temporairement indisponible. Le serveur vérifiera les soldes avant l’achat."}):e.jsx("p",{role:"status",children:"Répartition des soldes indisponible. Le serveur vérifiera les soldes avant l’achat."})}),g<Number(a.price)&&e.jsxs("div",{className:"cp-products-modal-warning",children:[e.jsx(A,{size:16}),"Le solde combiné des dépôts et des revenus retirables est insuffisant."]}),e.jsxs("div",{className:"cp-products-modal-actions",children:[e.jsx("button",{onClick:()=>r(null),children:"Annuler"}),e.jsx("button",{onClick:()=>w.mutate(a.id),disabled:w.isPending||g<Number(a.price),children:w.isPending?e.jsx(P,{className:"mx-auto animate-spin",size:17}):"Confirmer"})]})]})})]})}export{X as default};

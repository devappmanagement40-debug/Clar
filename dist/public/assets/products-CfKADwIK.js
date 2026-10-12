import{d as n,a as q,b as R,u as E,r as M,j as e,L as h,q as f,f as $}from"./index-BwNe2BNo.js";import{u as g}from"./useQuery-A2mCRQUr.js";import{u as F}from"./useMutation-CQ9Sonbu.js";import{g as S}from"./countries-CQYJEBgX.js";import{C as b}from"./chevron-right-BH0EHnK_.js";import{T as y}from"./triangle-alert-BDbres2P.js";const L=n("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]);const B=n("Package",[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["path",{d:"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",key:"yx3hmr"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]]);const j=n("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);function Y(){const{user:o,refreshUser:v}=q(),{toast:l}=R(),[,w]=E(),[r,c]=M.useState(null),{data:u,isLoading:k,isError:N,refetch:z}=g({queryKey:["/api/products"]}),{data:p}=g({queryKey:["/api/user/products"]}),d=F({mutationFn:async s=>{const t=await $("POST",`/api/products/${s}/purchase`,{});if(!t.ok){const i=await t.json();throw new Error(i.message||"Achat impossible")}return t.json()},onSuccess:()=>{f.invalidateQueries({queryKey:["/api/products"]}),f.invalidateQueries({queryKey:["/api/user/products"]}),v(),c(null),l({title:"Produit acheté !",description:"Vous commencerez à recevoir des gains demain."})},onError:s=>{c(null),l({title:"Achat impossible",description:s.message,variant:"destructive"})}});if(!o)return null;const A=S(o.country)?.currency||"FCFA",a=s=>s!==null&&Number.isFinite(s)?`${A} ${Math.round(s).toLocaleString("fr-FR")}`:"—",x=u?.filter(s=>!s.isFree)||[],m=(p||[]).filter(s=>s.status==="active"),P=p===void 0?null:m.length,C=p===void 0?null:m.reduce((s,t)=>{const i=Number(t.product?.dailyEarnings);return s!==null&&Number.isFinite(i)?s+i:null},0);return e.jsxs("main",{className:"cp-products-page",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"cp-products-shell",children:[e.jsx("h1",{className:"sr-only",children:"Produits Equinor"}),e.jsxs("section",{className:"cp-products-stats","aria-label":"Résumé des produits",children:[e.jsxs("button",{className:"cp-products-stat cp-products-stat-link",type:"button",onClick:()=>w("/my-products"),"aria-label":"Voir mes équipements achetés",children:[e.jsx("span",{className:"cp-products-stat-icon",children:e.jsx(B,{"aria-hidden":"true"})}),e.jsxs("span",{className:"cp-products-stat-copy",children:[e.jsx("strong",{className:"cp-products-stat-value",children:P??"—"}),e.jsx("small",{className:"cp-products-stat-label",children:"Mes équipements"})]}),e.jsx(b,{className:"cp-products-stat-chevron","aria-hidden":"true",size:18})]}),e.jsxs("div",{className:"cp-products-stat",children:[e.jsx("span",{className:"cp-products-stat-icon",children:e.jsx(L,{"aria-hidden":"true"})}),e.jsxs("span",{className:"cp-products-stat-copy",children:[e.jsx("strong",{className:"cp-products-stat-value",children:a(C)}),e.jsx("small",{className:"cp-products-stat-label",children:"Revenu quotidien"})]})]})]}),e.jsx("section",{className:"cp-products-list","aria-label":"Produits disponibles",children:k?e.jsxs("div",{className:"cp-products-empty",role:"status",children:[e.jsx(h,{className:"animate-spin","aria-hidden":"true",size:30}),e.jsx("p",{children:"Chargement des produits…"})]}):N&&!u?e.jsxs("div",{className:"cp-products-empty",role:"alert",children:[e.jsx(y,{"aria-hidden":"true",size:34}),e.jsx("p",{children:"Impossible de charger les produits pour le moment."}),e.jsx("button",{className:"cp-products-retry",type:"button",onClick:()=>{z()},children:"Réessayer"})]}):x.length===0?e.jsxs("div",{className:"cp-products-empty",role:"status",children:[e.jsx(j,{"aria-hidden":"true",size:38}),e.jsx("p",{children:"Aucun produit disponible pour le moment"})]}):x.map(s=>{const t=s.imageUrl?.trim();return e.jsxs("article",{className:`cp-product-card${s.isActive?"":" is-unavailable"}`,"data-testid":`product-card-${s.id}`,children:[e.jsxs("div",{className:"cp-product-image",children:[e.jsx("span",{className:"cp-product-image-placeholder",children:e.jsx(j,{"aria-hidden":"true",size:30})}),t&&e.jsx("img",{src:t,alt:s.name,loading:"lazy",onError:i=>{i.currentTarget.style.display="none"}})]}),e.jsxs("div",{className:"cp-product-info",children:[e.jsxs("h2",{className:"cp-product-name",children:[s.name,!s.isActive&&e.jsx("span",{className:"ml-2 text-xs font-bold uppercase text-gray-500",children:"Indisponible"})]}),e.jsxs("div",{className:"cp-product-line",children:[e.jsx("span",{children:"Prix :"}),e.jsx("strong",{children:a(Number(s.price))})]}),e.jsxs("div",{className:"cp-product-line revenue",children:[e.jsx("span",{children:"Revenu quotidien :"}),e.jsx("strong",{children:a(Number(s.dailyEarnings))})]}),e.jsxs("div",{className:"cp-product-line revenue",children:[e.jsx("span",{children:"Revenu total :"}),e.jsx("strong",{children:a(Number(s.totalReturn))})]}),e.jsxs("div",{className:"cp-product-line",children:[e.jsx("span",{children:"Cycle :"}),e.jsx("strong",{children:Number.isFinite(Number(s.cycleDays))?`${s.cycleDays} jours`:"—"})]})]}),e.jsx("button",{className:`cp-product-buy${s.isActive?"":" is-unavailable"}`,onClick:()=>s.isActive&&c(s),disabled:!s.isActive,"aria-label":s.isActive?`Acheter ${s.name}`:`${s.name} indisponible`,"data-testid":`button-purchase-${s.id}`,children:s.isActive?e.jsxs(e.Fragment,{children:["Acheter ",e.jsx(b,{"aria-hidden":"true",size:16})]}):"Indisponible"})]},s.id)})})]}),r&&e.jsx("div",{className:"cp-products-modal-backdrop",onClick:()=>c(null),children:e.jsxs("div",{className:"cp-products-modal",role:"dialog","aria-modal":"true","aria-labelledby":"cp-product-confirm-title",onClick:s=>s.stopPropagation(),children:[e.jsx("h2",{id:"cp-product-confirm-title",children:r.name}),e.jsxs("p",{children:["Après l’achat, vos revenus seront crédités quotidiennement pendant ",r.cycleDays," jours."]}),e.jsxs("div",{className:"cp-product-line",children:[e.jsx("span",{children:"Prix :"}),e.jsx("strong",{children:a(Number(r.price))})]}),e.jsxs("div",{className:"cp-product-line revenue",children:[e.jsx("span",{children:"Revenu quotidien :"}),e.jsx("strong",{children:a(Number(r.dailyEarnings))})]}),Number(o.balance||0)<Number(r.price)&&e.jsxs("div",{className:"cp-products-modal-warning",children:[e.jsx(y,{size:16}),"Solde insuffisant pour acheter ce produit."]}),e.jsxs("div",{className:"cp-products-modal-actions",children:[e.jsx("button",{onClick:()=>c(null),children:"Annuler"}),e.jsx("button",{onClick:()=>d.mutate(r.id),disabled:d.isPending,children:d.isPending?e.jsx(h,{className:"mx-auto animate-spin",size:17}):"Confirmer"})]})]})})]})}export{Y as default};

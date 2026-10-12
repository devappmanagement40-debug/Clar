import{d as w,a as y,j as e,L as v}from"./index-_Tcu57KR.js";import{u as j}from"./useQuery-B6Mk2edX.js";import{g as k}from"./countries-CQYJEBgX.js";import{e as z}from"./ITM4W5DOSVIZHOJCQX74LIO7CA_1791819301503-Dbb9jEl5.js";const l=w("PackageOpen",[["path",{d:"M12 22v-9",key:"x3hkom"}],["path",{d:"M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",key:"2ntwy6"}],["path",{d:"M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",key:"1pmm1c"}],["path",{d:"M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",key:"12ttoo"}]]);function R(){const{user:c}=y(),{data:f,isLoading:h}=j({queryKey:["/api/user/products"],staleTime:0});if(!c)return null;const p=k(c.country),o=p?.currency==="FCFA"?"XOF":p?.currency||"XOF",d=f||[];d.filter(r=>r.status==="active").length;const a=Math.round(Number(c.totalEarnings||0)),u=r=>`${r.toLocaleString("fr-FR")} ${o}`,x=r=>{if(!r)return"-";const t=new Date(r),i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=t.getDate(),s=i[t.getMonth()],g=t.getFullYear(),m=String(t.getHours()).padStart(2,"0"),b=String(t.getMinutes()).padStart(2,"0");return`${n} ${s} ${g}, ${m}:${b}`};return e.jsxs("main",{className:"products-reference min-h-full bg-white pb-24",children:[e.jsx("style",{children:`
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
           height: 72px;
           border: 2px solid #111827;
           border-radius: 12px;
           background: #fff;
           color: #111827;
           box-shadow: 0 3px 0 #111827;
         }
         .products-reference .stat-panel.active {
            background: #bd304c;
            color: #ffffff;
         }
         .products-reference .stat-panel.our,
         .products-reference .stat-toggle.our { left: 16px; width: calc(50% - 22px); }
         .products-reference .stat-panel.my,
         .products-reference .stat-toggle.my { right: 16px; width: calc(50% - 22px); }
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
      `}),e.jsxs("div",{className:"products-screen",children:[e.jsx("header",{className:"products-header",children:e.jsx("strong",{children:"Mes produits"})}),e.jsxs("section",{className:"products-hero","aria-label":"Produits",children:[e.jsx("img",{src:z,alt:""}),e.jsxs("div",{className:"stat-panel my my-only active","aria-label":`Revenus : ${u(a)}`,children:[e.jsx("span",{className:"stat-value",children:u(a)}),e.jsx("span",{className:"stat-label",children:"Revenus cumulés"})]})]}),e.jsx("div",{className:"product-list",children:e.jsx("div",{children:h?e.jsx("div",{className:"flex justify-center py-12",children:e.jsx(v,{className:"w-8 h-8 animate-spin text-[#bd304c]"})}):d.length===0?e.jsxs("div",{className:"empty",children:[e.jsx(l,{"aria-hidden":"true"}),e.jsx("p",{children:"Aucun produit Equinor acheté"}),e.jsx("p",{className:"text-sm text-gray-400",children:"Achetez des produits pour commencer à gagner"})]}):d.map(r=>{const t=r.product?.cycleDays||60,i=r.daysRemaining||0,n=Math.max(0,t-i),s=parseFloat(r.totalEarned||"0");return e.jsxs("div",{className:"product-card my-card","data-testid":`my-product-card-${r.id}`,children:[e.jsx("div",{className:"product-picture",children:r.product?.imageUrl?e.jsx("img",{src:r.product.imageUrl,alt:r.product?.name||"Produit"}):e.jsx(l,{"aria-hidden":"true"})}),e.jsxs("div",{className:"product-details",children:[e.jsx("p",{className:"product-name",children:r.product?.name||"Produit"}),e.jsxs("p",{className:"product-price",children:[Number(r.product?.price||0).toLocaleString("fr-FR")," ",o]}),e.jsxs("p",{className:"product-line",children:["Jours d'exécution :",e.jsxs("strong",{children:[n," / ",t]})]}),e.jsxs("p",{className:"product-line",children:["Revenu généré :",e.jsxs("strong",{children:[s.toLocaleString("fr-FR")," ",o]})]}),e.jsxs("p",{className:"product-line",children:["Revenu total :",e.jsxs("strong",{children:[Number(r.product?.totalReturn||0).toLocaleString("fr-FR")," ",o]})]}),e.jsxs("p",{className:"product-line",children:["Date :",e.jsx("strong",{children:x(r.purchasedAt)})]})]})]},r.id)})})})]})]})}export{R as default};

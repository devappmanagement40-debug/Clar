import{a as A,U as T,b as P,r as w,c as j,j as e,L as F,w as E}from"./index-Cj-DHkBF.js";import{g as O}from"./countries-Fql09V7P.js";import{f as v}from"./public-transaction-id-BLVl7rPW.js";import{C as V}from"./chevron-left-DIUK8r6h.js";import{C as N}from"./chevron-right-FaJCc1L2.js";import{L as R}from"./loader-circle-DhU_uqKX.js";import{R as q}from"./refresh-cw-D2-z7K8w.js";const k="/assets/nodata-da225bbb_(1)_1783249133513-DaJAjPYJ.png",S="#1947b8",K="#16a34a",M=t=>t.inpayOutTradeNo||t.inpayOrderNumber||t.sendavapayReference||t.omnipayReference||t.omnipayId||t.soleaspayReference||t.soleaspayOrderId||t.westpayReference||t.ashtechReference||t.ashtechTransactionId||t.reference||"",Q=t=>t.inpayOutTradeNo||t.inpayOrderNumber||t.omnipayReference||t.omnipayId||t.sendavapayReference||"",_=t=>{const r=new Date(t),o=String(r.getDate()).padStart(2,"0"),a=String(r.getMonth()+1).padStart(2,"0"),s=r.getFullYear(),c=String(r.getHours()).padStart(2,"0"),l=String(r.getMinutes()).padStart(2,"0"),p=String(r.getSeconds()).padStart(2,"0");return`${o}/${a}/${s} ${c}:${l}:${p}`},B=t=>{const r=new Date(t);if(Number.isNaN(r.getTime()))return t;const o=new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"short",year:"numeric"}).format(r),a=new Intl.DateTimeFormat("fr-FR",{hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(r);return`${o}, ${a}`},C=t=>{switch(t){case"completed":case"approved":return{label:"Réussi",color:K};case"rejected":return{label:"Paiement échoué",color:"#b42318"};case"processing":return{label:"En traitement",color:"#1947b8"};default:return{label:"En attente...",color:"#1947b8"}}},H=t=>{const r=C(t);return t==="completed"||t==="approved"?{label:"Succès",color:"#1947b8"}:r},n=({label:t,value:r})=>e.jsxs("div",{className:"history-row",children:[e.jsx("span",{children:t}),e.jsx("span",{children:r})]}),U=({label:t,color:r})=>e.jsx("span",{className:"history-status",style:{backgroundColor:r},children:t});function te(){const{user:t,refreshUser:r}=A(),o=T(),{toast:a}=P(),[s,c]=w.useState("withdrawals"),[l,p]=w.useState(null),f=!!t?.isAdmin;t&&O(t.country);const g="CDF",{data:u=[],isLoading:$}=j({queryKey:["/api/deposits/history"]}),{data:y=[],isLoading:z}=j({queryKey:["/api/withdrawals/history"]}),D=i=>(i.status==="pending"||i.status==="processing")&&(!!i.canVerifyPayment||!!(f&&!i.sendavapayReference&&(i.soleaspayReference||i.soleaspayOrderId||i.omnipayId||i.omnipayReference))),I=async i=>{p(i);try{await E(async()=>{const d=await(await fetch(`/api/deposits/${i}/verify`,{credentials:"include"})).json();d.status==="approved"?(a({title:"Paiement confirmé",description:"Votre compte a été crédité"}),r(),o.invalidateQueries({queryKey:["/api/deposits/history"]})):d.status==="rejected"?(a({title:"Paiement échoué",description:"Le paiement a été refusé",variant:"destructive"}),o.invalidateQueries({queryKey:["/api/deposits/history"]})):a({title:"En cours",description:"Le paiement est toujours en attente"})})}catch{a({title:"Vérification du paiement impossible",description:"Impossible de vérifier le paiement",variant:"destructive"})}finally{p(null)}};if(!t)return null;const L=s==="deposits"?$:z;return e.jsxs("main",{className:"history-page",children:[e.jsx("style",{children:`
        .history-page {
          width: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          background: #fff;
          color: #111827;
          font-family: Arial, sans-serif;
        }
        .history-page *,
        .history-page *::before,
        .history-page *::after {
          box-sizing: border-box;
        }
        .history-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100dvh;
          margin: 0 auto;
          background: #fff;
        }
        .history-header {
          position: relative;
          display: flex;
          min-height: 78px;
          align-items: center;
          padding: 17px 16px;
          border-bottom: 2px solid #111827;
        }
        .history-back {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 2px solid #111827;
          border-radius: 11px;
          padding: 0;
          background: #fff;
          box-shadow: 0 3px 0 #111827;
          color: #111827;
          cursor: pointer;
        }
        .history-back svg {
          width: 22px;
          height: 22px;
          stroke-width: 2.5;
        }
        .history-title {
          position: absolute;
          right: 70px;
          left: 70px;
          margin: 0;
          color: #111827;
          font-size: 20px;
          font-weight: 800;
          line-height: 1.2;
          text-align: center;
        }
        .history-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          align-items: center;
          min-height: 78px;
          padding: 12px 16px 16px;
          border-bottom: 2px solid #111827;
        }
        .history-tab {
          display: flex;
          min-width: 0;
          height: 46px;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border: 2px solid #111827;
          border-radius: 11px;
          padding: 0 8px;
          background: #ffffff;
          box-shadow: 0 3px 0 #111827;
          color: #111827;
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
        }
        .history-tab.active {
          background: #1947b8;
          color: #ffffff;
          font-weight: 700;
        }
        .history-tab-arrow {
          width: 17px;
          height: 17px;
          color: #111827;
          stroke-width: 2.8;
        }
        .history-tab-arrow.left {
          transform: rotate(180deg);
        }
        .history-content {
          min-height: calc(100dvh - 156px);
          padding: 18px 16px 40px;
          background: #edf2ff;
        }
        .history-list {
          display: grid;
          gap: 16px;
        }
        .history-card {
          position: relative;
          width: 100%;
          min-height: 154px;
          overflow: hidden;
          border: 2px solid #111827;
          border-radius: 12px;
          padding: 0 16px 16px;
          background: #ffffff;
          box-shadow: 0 4px 0 #111827, 0 8px 16px rgba(17, 24, 39, .12);
        }
        .withdrawal-receipt-card {
          min-height: 0;
          padding: 0 16px 16px;
          border-color: #17191c;
          border-radius: 15px;
          box-shadow: 0 4px 0 #17191c, 0 9px 18px rgba(17, 24, 39, .14);
        }
        .withdrawal-receipt-header {
          display: flex;
          min-height: 64px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin: 0 -16px;
          border-bottom: 1.5px solid #e8cbd1;
          padding: 12px 16px;
          background: #ffffff;
        }
        .withdrawal-receipt-reference {
          min-width: 0;
          margin: 0;
          color: #252327;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }
        .withdrawal-receipt-status {
          display: inline-flex;
          min-height: 31px;
          align-items: center;
          flex: 0 0 auto;
          border: 1.5px solid #17191c;
          border-radius: 999px;
          padding: 0 10px;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          line-height: 1;
          white-space: nowrap;
        }
        .withdrawal-receipt-rows {
          display: grid;
          gap: 10px;
          padding-top: 13px;
        }
        .withdrawal-receipt-card .history-row {
          min-height: 22px;
          justify-content: flex-start;
          gap: 9px;
          font-size: 14px;
          line-height: 1.35;
        }
        .withdrawal-receipt-card .history-row > span:first-child {
          flex: 0 0 86px;
          color: #6d6970;
          font-weight: 600;
        }
        .withdrawal-receipt-card .history-row > span:last-child {
          min-width: 0;
          color: #92263d;
          font-weight: 800;
          text-align: left;
          white-space: normal;
          overflow-wrap: anywhere;
        }
        .withdrawal-receipt-card .history-row:last-child > span:last-child {
          color: #252327;
          font-weight: 600;
        }
        .history-card-top {
          display: flex;
          min-height: 76px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin: 0 -16px;
          padding: 14px 16px 13px;
          border-bottom: 2px solid #111827;
          background: ${S};
        }
        .history-amount {
          margin: 0;
          color: #111827;
          font-size: 19px;
          font-weight: 800;
          line-height: 1.15;
        }
        .history-card-label {
          margin: 6px 0 0;
          color: #111827;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.15;
        }
        .history-status {
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          flex: 0 0 auto;
          border: 2px solid #111827;
          border-radius: 11px;
          padding: 0 11px;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }
        .history-divider {
          height: 0;
          margin: 14px 0 9px;
          border-top: 2px dashed #9ca3af;
        }
        .history-row {
          display: flex;
          min-height: 21px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #111827;
          font-size: 14px;
          line-height: 1.2;
        }
        .history-row > span:first-child {
          color: #4b5563;
          font-weight: 700;
        }
        .history-row > span:last-child {
          text-align: right;
          white-space: nowrap;
        }
        .history-empty {
          display: flex;
          min-height: 320px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 4px 0 #111827;
          color: #4b5563;
          font-size: 14px;
        }
        .history-empty img {
          width: 112px;
          height: 112px;
          object-fit: contain;
        }
        .history-verify {
          width: 100%;
          margin-top: 10px;
          min-height: 44px;
          border: 2px solid #111827;
          border-radius: 11px;
          padding: 9px 12px;
          background: ${S};
          box-shadow: 0 3px 0 #111827;
          color: #111827;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }
        .history-verify:disabled { cursor: wait; opacity: .7; }
        @media (max-width: 370px) {
          .history-header { height: 62px; padding-top: 6px; }
          .history-title { font-size: 19px; }
          .history-tabs { min-height: 58px; padding-bottom: 11px; }
          .history-tab { font-size: 14px; }
          .history-content { min-height: calc(100dvh - 120px); padding-right: 16px; padding-left: 16px; }
           .history-card { padding-right: 18px; padding-left: 18px; }
          .withdrawal-receipt-card { padding-right: 14px; padding-left: 14px; }
          .withdrawal-receipt-header { margin-right: -14px; margin-left: -14px; padding-right: 14px; padding-left: 14px; }
          .withdrawal-receipt-reference { font-size: 13px; }
          .withdrawal-receipt-card .history-row > span:first-child { flex-basis: 78px; }
          .history-card-label { font-size: 15px; }
          .history-status { font-size: 12px; padding-right: 8px; padding-left: 8px; }
          .history-row { font-size: 13px; }
        }
      `}),e.jsxs("div",{className:"history-screen",children:[e.jsxs("header",{className:"history-header",children:[e.jsx(F,{href:"/account",children:e.jsx("button",{className:"history-back","data-testid":"button-back","aria-label":"Retour",children:e.jsx(V,{"aria-hidden":"true"})})}),e.jsx("h1",{className:"history-title",children:"Enregistrements de fonds"})]}),e.jsxs("nav",{className:"history-tabs","aria-label":"Type d'enregistrement",children:[e.jsxs("button",{className:`history-tab ${s==="deposits"?"active":""}`,onClick:()=>c("deposits"),"data-testid":"tab-deposits",children:[e.jsx("span",{children:"Dépôt"}),e.jsx(N,{className:`history-tab-arrow ${s==="deposits"?"right":"left"}`,"aria-hidden":"true"})]}),e.jsxs("button",{className:`history-tab ${s==="withdrawals"?"active":""}`,onClick:()=>c("withdrawals"),"data-testid":"tab-withdrawals",children:[e.jsx("span",{children:"Retrait"}),e.jsx(N,{className:"history-tab-arrow right","aria-hidden":"true"})]})]}),e.jsx("section",{className:"history-content","aria-live":"polite",children:L?e.jsx("div",{className:"history-empty",children:e.jsx(R,{className:"animate-spin"})}):s==="deposits"?u.length>0?e.jsx("div",{className:"history-list",children:u.map(i=>{const{label:h,color:d}=C(i.status),m=Number.parseFloat(i.amount),x=M(i);return e.jsxs("article",{className:"history-card","data-testid":`deposit-item-${i.id}`,children:[e.jsxs("div",{className:"history-card-top",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"history-amount",children:[g," ",m.toLocaleString("fr-FR")]}),e.jsx("p",{className:"history-card-label",children:"Montant du dépôt"})]}),e.jsx(U,{label:h,color:d})]}),e.jsx("div",{className:"history-divider"}),e.jsx(n,{label:"ID transaction :",value:i.publicReference||v("D",i.id)}),f&&x?e.jsx(n,{label:"Référence paiement :",value:x}):null,e.jsx(n,{label:"Heure du dépôt :",value:_(i.createdAt)}),D(i)?e.jsxs("button",{className:"history-verify",onClick:()=>I(i.id),disabled:l===i.id,"data-testid":`button-verify-${i.id}`,children:[l===i.id?e.jsx(R,{className:"inline animate-spin"}):e.jsx(q,{className:"mr-1 inline h-3 w-3"}),"Vérifier la transaction"]}):null]},i.id)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:k,alt:"Aucune donnée"}),e.jsx("span",{children:"Plus de données"})]}):y.length>0?e.jsx("div",{className:"history-list",children:y.map(i=>{const{label:h,color:d}=H(i.status),m=Number.parseFloat(i.amount),x=Number.parseFloat(i.netAmount||i.amount),b=Q(i);return e.jsxs("article",{className:"history-card withdrawal-receipt-card","data-testid":`withdrawal-item-${i.id}`,children:[e.jsxs("div",{className:"withdrawal-receipt-header",children:[e.jsx("p",{className:"withdrawal-receipt-reference",children:i.publicReference||v("R",i.id)}),e.jsx("span",{className:"withdrawal-receipt-status",style:{backgroundColor:d},children:h})]}),e.jsxs("div",{className:"withdrawal-receipt-rows",children:[e.jsx(n,{label:"Montant :",value:`${m.toLocaleString("fr-FR")} ${g}`}),e.jsx(n,{label:"Reçu :",value:`${x.toLocaleString("fr-FR")} ${g}`}),e.jsx(n,{label:"Date :",value:B(i.createdAt)}),f&&b?e.jsx(n,{label:"Référence paiement :",value:b}):null]})]},i.id)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:k,alt:"Aucune donnée"}),e.jsx("span",{children:"Plus de données"})]})})]})]})}export{te as default};

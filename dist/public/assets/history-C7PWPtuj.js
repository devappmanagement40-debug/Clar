import{a as E,K as P,b as q,r as j,c as v,j as e,f as M,L as N}from"./index-XClGULZA.js";import{g as O}from"./countries-CQYJEBgX.js";import{C as K}from"./chevron-left-BCsN-1cW.js";import{C as S}from"./chevron-right-NvTEBYJ5.js";import{R as V}from"./refresh-cw-D3KaPshb.js";const R="/assets/nodata-da225bbb_(1)_1783249133513-DaJAjPYJ.png",$="#bd304c",H="#16a34a",A=(t,r,n)=>{const a=new Date(n),s=String(a.getFullYear()).slice(2),o=String(a.getMonth()+1).padStart(2,"0"),d=String(a.getDate()).padStart(2,"0"),c=String(a.getHours()).padStart(2,"0"),x=String(a.getMinutes()).padStart(2,"0"),p=String(r).padStart(4,"0");return`sdk${s}${o}${d}${c}${x}${t}${p}`},k=t=>{const r=t.sendavapayReference||t.omnipayReference||t.omnipayId||t.soleaspayReference||t.soleaspayOrderId;return r?r.startsWith("sdk")?r:`sdk${r}`:A("D",t.id,t.createdAt)},Q=t=>{const r=t.inpayOutTradeNo||t.inpayOrderNumber||t.omnipayReference||t.omnipayId||t.sendavapayReference;return r||A("W",t.id,t.createdAt)},C=t=>t.length<=6?t:`${t.slice(0,2)}****${t.slice(-4)}`,W=t=>{const r=new Date(t),n=String(r.getDate()).padStart(2,"0"),a=String(r.getMonth()+1).padStart(2,"0"),s=r.getFullYear(),o=String(r.getHours()).padStart(2,"0"),d=String(r.getMinutes()).padStart(2,"0"),c=String(r.getSeconds()).padStart(2,"0");return`${n}/${a}/${s} ${o}:${d}:${c}`},_=t=>{const r=new Date(t);if(Number.isNaN(r.getTime()))return t;const n=new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"short",year:"numeric"}).format(r),a=new Intl.DateTimeFormat("fr-FR",{hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(r);return`${n}, ${a}`},z=t=>{switch(t){case"completed":case"approved":return{label:"Réussi",color:H};case"rejected":return{label:"Paiement échoué",color:"#b42318"};case"processing":return{label:"En traitement",color:"#bd304c"};default:return{label:"En attente...",color:"#bd304c"}}},Y=t=>{const r=z(t);return t==="completed"||t==="approved"?{label:"Succès",color:"#bd304c"}:r},h=({label:t,value:r})=>e.jsxs("div",{className:"history-row",children:[e.jsx("span",{children:t}),e.jsx("span",{children:r})]}),B=({label:t,color:r})=>e.jsx("span",{className:"history-status",style:{backgroundColor:r},children:t});function ee(){const{user:t,refreshUser:r}=E(),n=P(),{toast:a}=q(),[s,o]=j.useState("withdrawals"),[d,c]=j.useState(null),x=!!t?.isAdmin,p=t?O(t.country):null,f=p?.currency==="XOF"||p?.currency==="XAF"?"FCFA":p?.currency||"FCFA",{data:y=[],isLoading:D}=v({queryKey:["/api/deposits/history"]}),{data:b=[],isLoading:F}=v({queryKey:["/api/withdrawals/history"]}),L=i=>(i.status==="pending"||i.status==="processing")&&!!(i.soleaspayReference||i.soleaspayOrderId||i.omnipayId||i.omnipayReference||i.sendavapayReference),I=async i=>{c(i);try{const l=await(await fetch(`/api/deposits/${i}/verify`,{credentials:"include"})).json();l.status==="approved"?(a({title:"Paiement confirmé",description:"Votre compte a été crédité"}),r(),n.invalidateQueries({queryKey:["/api/deposits/history"]})):l.status==="rejected"?(a({title:"Paiement échoué",description:"Le paiement a été refusé",variant:"destructive"}),n.invalidateQueries({queryKey:["/api/deposits/history"]})):a({title:"En cours",description:"Le paiement est toujours en attente"})}catch{a({title:"Vérification du paiement impossible",description:"Impossible de vérifier le paiement",variant:"destructive"})}finally{c(null)}};if(!t)return null;const T=s==="deposits"?D:F;return e.jsxs("main",{className:"history-page",children:[e.jsx("style",{children:`
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
          background: #bd304c;
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
          background: #fff0f3;
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
          background: ${$};
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
          background: ${$};
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
      `}),e.jsxs("div",{className:"history-screen",children:[e.jsxs("header",{className:"history-header",children:[e.jsx(M,{href:"/account",children:e.jsx("button",{className:"history-back","data-testid":"button-back","aria-label":"Retour",children:e.jsx(K,{"aria-hidden":"true"})})}),e.jsx("h1",{className:"history-title",children:"Enregistrements de fonds"})]}),e.jsxs("nav",{className:"history-tabs","aria-label":"Type d'enregistrement",children:[e.jsxs("button",{className:`history-tab ${s==="deposits"?"active":""}`,onClick:()=>o("deposits"),"data-testid":"tab-deposits",children:[e.jsx("span",{children:"Dépôt"}),e.jsx(S,{className:`history-tab-arrow ${s==="deposits"?"right":"left"}`,"aria-hidden":"true"})]}),e.jsxs("button",{className:`history-tab ${s==="withdrawals"?"active":""}`,onClick:()=>o("withdrawals"),"data-testid":"tab-withdrawals",children:[e.jsx("span",{children:"Retrait"}),e.jsx(S,{className:"history-tab-arrow right","aria-hidden":"true"})]})]}),e.jsx("section",{className:"history-content","aria-live":"polite",children:T?e.jsx("div",{className:"history-empty",children:e.jsx(N,{className:"animate-spin"})}):s==="deposits"?y.length>0?e.jsx("div",{className:"history-list",children:y.map(i=>{const{label:g,color:l}=z(i.status),m=Number.parseFloat(i.amount),u=x?k(i):C(k(i));return e.jsxs("article",{className:"history-card","data-testid":`deposit-item-${i.id}`,children:[e.jsxs("div",{className:"history-card-top",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"history-amount",children:[f," ",m.toLocaleString("fr-FR")]}),e.jsx("p",{className:"history-card-label",children:"Montant du dépôt"})]}),e.jsx(B,{label:g,color:l})]}),e.jsx("div",{className:"history-divider"}),e.jsx(h,{label:"Numéro :",value:u}),e.jsx(h,{label:"Heure du dépôt :",value:W(i.createdAt)}),L(i)&&!i.sendavapayReference?e.jsxs("button",{className:"history-verify",onClick:()=>I(i.id),disabled:d===i.id,"data-testid":`button-verify-${i.id}`,children:[d===i.id?e.jsx(N,{className:"inline animate-spin"}):e.jsx(V,{className:"mr-1 inline h-3 w-3"}),"Vérifier la transaction"]}):null]},i.id)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:R,alt:"Aucune donnée"}),e.jsx("span",{children:"Plus de données"})]}):b.length>0?e.jsx("div",{className:"history-list",children:b.map(i=>{const{label:g,color:l}=Y(i.status),m=Number.parseFloat(i.amount),u=Number.parseFloat(i.netAmount||i.amount),w=Q(i);return e.jsxs("article",{className:"history-card withdrawal-receipt-card","data-testid":`withdrawal-item-${i.id}`,children:[e.jsxs("div",{className:"withdrawal-receipt-header",children:[e.jsx("p",{className:"withdrawal-receipt-reference",children:x?w:C(w)}),e.jsx("span",{className:"withdrawal-receipt-status",style:{backgroundColor:l},children:g})]}),e.jsxs("div",{className:"withdrawal-receipt-rows",children:[e.jsx(h,{label:"Montant :",value:`${m.toLocaleString("fr-FR")} ${f}`}),e.jsx(h,{label:"Reçu :",value:`${u.toLocaleString("fr-FR")} ${f}`}),e.jsx(h,{label:"Date :",value:_(i.createdAt)})]})]},i.id)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:R,alt:"Aucune donnée"}),e.jsx("span",{children:"Plus de données"})]})})]})]})}export{ee as default};

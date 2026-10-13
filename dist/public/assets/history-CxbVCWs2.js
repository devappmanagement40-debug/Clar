import{a as E,J as P,b as M,r as j,c as w,j as t,f as q,L as v}from"./index-nknmBVMR.js";import{g as H}from"./countries-CQYJEBgX.js";import{C as T}from"./chevron-left-XI5j51py.js";import{C as N}from"./chevron-right-9coEIkHw.js";import{R as V}from"./refresh-cw-B62FO1iH.js";const S="/assets/nodata-da225bbb_(1)_1783249133513-DaJAjPYJ.png",$="#bd304c",K="#16a34a",O=(s,i,n)=>{const a=new Date(n),r=String(a.getFullYear()).slice(2),o=String(a.getMonth()+1).padStart(2,"0"),d=String(a.getDate()).padStart(2,"0"),c=String(a.getHours()).padStart(2,"0"),g=String(a.getMinutes()).padStart(2,"0"),h=String(i).padStart(4,"0");return`sdk${r}${o}${d}${c}${g}${s}${h}`},k=s=>{const i=s.sendavapayReference||s.omnipayReference||s.omnipayId||s.soleaspayReference||s.soleaspayOrderId;return i?i.startsWith("sdk")?i:`sdk${i}`:O("D",s.id,s.createdAt)},Q=s=>s.length<=6?s:`${s.slice(0,2)}****${s.slice(-4)}`,R=s=>{const i=new Date(s),n=String(i.getDate()).padStart(2,"0"),a=String(i.getMonth()+1).padStart(2,"0"),r=i.getFullYear(),o=String(i.getHours()).padStart(2,"0"),d=String(i.getMinutes()).padStart(2,"0"),c=String(i.getSeconds()).padStart(2,"0");return`${n}/${a}/${r} ${o}:${d}:${c}`},C=s=>{switch(s){case"completed":case"approved":return{label:"Réussi",color:K};case"rejected":return{label:"Paiement échoué",color:"#b42318"};case"processing":return{label:"En traitement",color:"#bd304c"};default:return{label:"En attente...",color:"#bd304c"}}},x=({label:s,value:i})=>t.jsxs("div",{className:"history-row",children:[t.jsx("span",{children:s}),t.jsx("span",{children:i})]}),A=({label:s,color:i})=>t.jsx("span",{className:"history-status",style:{backgroundColor:i},children:s});function X(){const{user:s,refreshUser:i}=E(),n=P(),{toast:a}=M(),[r,o]=j.useState("withdrawals"),[d,c]=j.useState(null),g=!!s?.isAdmin,h=s?H(s.country):null,m=h?.currency==="XOF"||h?.currency==="XAF"?"FCFA":h?.currency||"FCFA",{data:f=[],isLoading:z}=w({queryKey:["/api/deposits/history"]}),{data:b=[],isLoading:F}=w({queryKey:["/api/withdrawals/history"]}),L=e=>(e.status==="pending"||e.status==="processing")&&!!(e.soleaspayReference||e.soleaspayOrderId||e.omnipayId||e.omnipayReference||e.sendavapayReference),D=async e=>{c(e);try{const l=await(await fetch(`/api/deposits/${e}/verify`,{credentials:"include"})).json();l.status==="approved"?(a({title:"Paiement confirmé",description:"Votre compte a été crédité"}),i(),n.invalidateQueries({queryKey:["/api/deposits/history"]})):l.status==="rejected"?(a({title:"Paiement échoué",description:"Le paiement a été refusé",variant:"destructive"}),n.invalidateQueries({queryKey:["/api/deposits/history"]})):a({title:"En cours",description:"Le paiement est toujours en attente"})}catch{a({title:"Vérification du paiement impossible",description:"Impossible de vérifier le paiement",variant:"destructive"})}finally{c(null)}};if(!s)return null;const I=r==="deposits"?z:F;return t.jsxs("main",{className:"history-page",children:[t.jsx("style",{children:`
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
          .history-card-label { font-size: 15px; }
          .history-status { font-size: 12px; padding-right: 8px; padding-left: 8px; }
          .history-row { font-size: 13px; }
        }
      `}),t.jsxs("div",{className:"history-screen",children:[t.jsxs("header",{className:"history-header",children:[t.jsx(q,{href:"/account",children:t.jsx("button",{className:"history-back","data-testid":"button-back","aria-label":"Retour",children:t.jsx(T,{"aria-hidden":"true"})})}),t.jsx("h1",{className:"history-title",children:"Enregistrements de fonds"})]}),t.jsxs("nav",{className:"history-tabs","aria-label":"Type d'enregistrement",children:[t.jsxs("button",{className:`history-tab ${r==="deposits"?"active":""}`,onClick:()=>o("deposits"),"data-testid":"tab-deposits",children:[t.jsx("span",{children:"Dépôt"}),t.jsx(N,{className:`history-tab-arrow ${r==="deposits"?"right":"left"}`,"aria-hidden":"true"})]}),t.jsxs("button",{className:`history-tab ${r==="withdrawals"?"active":""}`,onClick:()=>o("withdrawals"),"data-testid":"tab-withdrawals",children:[t.jsx("span",{children:"Retrait"}),t.jsx(N,{className:"history-tab-arrow right","aria-hidden":"true"})]})]}),t.jsx("section",{className:"history-content","aria-live":"polite",children:I?t.jsx("div",{className:"history-empty",children:t.jsx(v,{className:"animate-spin"})}):r==="deposits"?f.length>0?t.jsx("div",{className:"history-list",children:f.map(e=>{const{label:p,color:l}=C(e.status),u=Number.parseFloat(e.amount),y=g?k(e):Q(k(e));return t.jsxs("article",{className:"history-card","data-testid":`deposit-item-${e.id}`,children:[t.jsxs("div",{className:"history-card-top",children:[t.jsxs("div",{children:[t.jsxs("p",{className:"history-amount",children:[m," ",u.toLocaleString("fr-FR")]}),t.jsx("p",{className:"history-card-label",children:"Montant du dépôt"})]}),t.jsx(A,{label:p,color:l})]}),t.jsx("div",{className:"history-divider"}),t.jsx(x,{label:"Numéro :",value:y}),t.jsx(x,{label:"Heure du dépôt :",value:R(e.createdAt)}),L(e)&&!e.sendavapayReference?t.jsxs("button",{className:"history-verify",onClick:()=>D(e.id),disabled:d===e.id,"data-testid":`button-verify-${e.id}`,children:[d===e.id?t.jsx(v,{className:"inline animate-spin"}):t.jsx(V,{className:"mr-1 inline h-3 w-3"}),"Vérifier la transaction"]}):null]},e.id)})}):t.jsxs("div",{className:"history-empty",children:[t.jsx("img",{src:S,alt:"Aucune donnée"}),t.jsx("span",{children:"Plus de données"})]}):b.length>0?t.jsx("div",{className:"history-list",children:b.map(e=>{const{label:p,color:l}=C(e.status),u=Number.parseFloat(e.amount),y=Number.parseFloat(e.netAmount||e.amount);return t.jsxs("article",{className:"history-card","data-testid":`withdrawal-item-${e.id}`,children:[t.jsxs("div",{className:"history-card-top",children:[t.jsxs("div",{children:[t.jsxs("p",{className:"history-amount",children:[m," ",u.toLocaleString("fr-FR")]}),t.jsx("p",{className:"history-card-label",children:"Montant du retrait"})]}),t.jsx(A,{label:p,color:l})]}),t.jsx("div",{className:"history-divider"}),t.jsx(x,{label:"Montant reçu :",value:`${m} ${y.toLocaleString("fr-FR")}`}),t.jsx(x,{label:"Heure du retrait :",value:R(e.createdAt)})]},e.id)})}):t.jsxs("div",{className:"history-empty",children:[t.jsx("img",{src:S,alt:"Aucune donnée"}),t.jsx("span",{children:"Plus de données"})]})})]})]})}export{X as default};

import{e as T,a as U,b as V,K as Q,r as h,u as Y,c as f,j as e,L as y,f as F,g as L}from"./index-XClGULZA.js";import{u as B}from"./useMutation-BKutJ-ul.js";import{g as X}from"./countries-CQYJEBgX.js";import{C as _}from"./clock-3-B-42p_mm.js";import{A as G}from"./arrow-left-Dxi8VQLP.js";import{C as J}from"./credit-card-BkH1QRPQ.js";import{C as Z}from"./chevron-right-NvTEBYJ5.js";const ee=T("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);function te(r){const n=r.replace(/\D/g,"");if(n.length<6)return r;const i=Math.min(6,n.length-5);return`${n.slice(0,3)}${"•".repeat(i)}${n.slice(-2)}`}function re(r){if(!r)return"Choisissez votre portefeuille";const n=typeof r.paymentMethod=="string"?r.paymentMethod.trim().toUpperCase():"",i=typeof r.accountNumber=="string"?te(r.accountNumber):"";return[n,i].filter(Boolean).join(" - ")||"Portefeuille enregistré"}function le(){const{user:r,refreshUser:n}=U(),{toast:i}=V(),v=Q(),[a,j]=h.useState(""),[l,N]=h.useState(null),[z,k]=h.useState(!1),[,w]=Y(),P=r?X(r.country):null,C=P?.currency||"XOF",s=C==="FCFA"?"XOF":C,{data:p}=f({queryKey:["/api/settings/withdrawal"],staleTime:0,refetchOnMount:!0}),o=p?.minWithdrawal??800,u=p?.withdrawalFees??16,x=p?.withdrawalStartHour??9,m=p?.withdrawalEndHour??17,g=p?.withdrawalPrepaymentEnabled??!1,W=a?Math.floor(Number(a)*(1-u/100)):0,M=new Date().getHours(),R=M>=x&&M<m,{data:d=[],isLoading:I}=f({queryKey:["/api/wallets"],refetchOnWindowFocus:!0}),{data:q=[]}=f({queryKey:["/api/user/products"]}),{data:A}=f({queryKey:["/api/withdrawals/available"],enabled:!!r,staleTime:0,refetchOnMount:!0}),E=q.some(t=>t.status==="active");h.useEffect(()=>{const t=localStorage.getItem("selectedWalletId");if(t&&d.length>0){const c=d.find(O=>O.id===parseInt(t));c&&N(c),localStorage.removeItem("selectedWalletId")}},[d]),h.useEffect(()=>{if(!l&&d.length>0){const t=d.find(c=>c.isDefault);t&&N(t)}},[d,l]);const b=B({mutationFn:async t=>(await L("POST","/api/withdrawals",t)).json(),onSuccess:()=>{i({title:"Demande envoyée",description:"Votre demande de retrait a été envoyée."}),n(),v.invalidateQueries({queryKey:["/api/withdrawals"]}),v.invalidateQueries({queryKey:["/api/withdrawals/available"]}),j("")},onError:t=>{if(t.data?.code==="WITHDRAWAL_PREPAYMENT_REQUIRED"&&t.data.paymentUrl){w(t.data.paymentUrl);return}i({title:"Retrait impossible",description:t.message,variant:"destructive"})}}),S=g&&a?Math.max(1,Math.round(Number(a)*25/100)):0,H=async()=>{if(g){if(!a||Number(a)<o){i({title:"Montant invalide",description:`Le montant minimum est de ${o} ${s}`,variant:"destructive"});return}k(!0);try{const c=await(await L("POST","/api/withdrawal-fee/prepare",{amount:Number(a)})).json();w(c.paymentUrl)}catch(t){i({title:"Paiement indisponible",description:t.message,variant:"destructive"})}finally{k(!1)}}},$=()=>{if(!R){i({title:"Retrait indisponible",description:`Horaires de retrait : de ${x}h à ${m}h.`,variant:"destructive"});return}if(!E){i({title:"Produit requis",description:"Vous devez avoir un produit actif pour effectuer un retrait",variant:"destructive"});return}if(!a||a<o){i({title:"Montant invalide",description:`Le montant minimum est de ${o} ${s}`,variant:"destructive"});return}if(!l){i({title:"Compte requis",description:"Veuillez sélectionner un compte bancaire",variant:"destructive"});return}b.mutate({amount:Number(a),walletId:l.id})};if(I)return e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center",children:e.jsx(y,{className:"w-8 h-8 animate-spin text-[#bd304c]"})});if(!r)return null;const D=parseFloat(A?.availableBalance||"0"),K=d.length>0;return e.jsxs("main",{className:"withdraw-reference",children:[e.jsx("style",{children:`
        .withdraw-reference {
          min-height: 100dvh;
          background: #ffffff;
          color: #111827;
          font-family: Inter, Arial, sans-serif;
        }
        .withdraw-reference .withdraw-screen {
          box-sizing: border-box;
          width: 100%;
          max-width: 512px;
          min-height: 100dvh;
          margin: 0 auto;
          overflow: hidden;
          padding-bottom: calc(64px + env(safe-area-inset-bottom));
          background: #ffffff;
        }
        .withdraw-reference .withdraw-hero {
          position: relative;
          display: flow-root;
          box-sizing: border-box;
          min-height: 196px;
          padding: 0 16px 16px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }
        .withdraw-reference .history-button,
        .withdraw-reference .withdraw-back {
          position: absolute;
          z-index: 3;
          top: 16px;
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border: 2px solid #111827;
          border-radius: 10px;
          padding: 0;
          background: #fff;
          box-shadow: 0 3px 0 #111827;
          color: #bd304c;
          text-decoration: none;
        }
        .withdraw-reference .history-button {
          right: 16px;
        }
        .withdraw-reference .withdraw-back {
          left: 16px;
        }
        .withdraw-reference .history-button:active,
        .withdraw-reference .withdraw-back:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #111827;
        }
        .withdraw-reference .withdraw-back::before {
          content: none;
        }
        .withdraw-reference .hero-art {
          display: none;
        }
        .withdraw-reference .hero-pattern,
        .withdraw-reference .receipt-icon {
          display: none;
        }
        .withdraw-reference .withdraw-title {
          position: absolute;
          z-index: 2;
          top: 17px;
          right: 70px;
          left: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin: 0;
          color: #111827;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.2;
          text-align: center;
        }
        .withdraw-reference .balance-card {
          display: flex;
          box-sizing: border-box;
          min-height: 116px;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 64px;
          padding: 16px;
          border: 2px solid #111827;
          border-radius: 13px;
          background: #ffffff;
          box-shadow: 0 3px 0 #111827;
        }
        .withdraw-reference .balance-label {
          margin: 8px 0 0;
          color: #4b5563;
          font-size: 14px;
          font-weight: 500;
        }
        .withdraw-reference .balance-value {
          margin: 0;
          color: #111827;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.1;
          white-space: nowrap;
        }
        .withdraw-reference .balance-value span {
          display: none;
        }
        .withdraw-reference .balance-copy { min-width: 0; }
        .withdraw-reference .country-chip {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          gap: 7px;
          flex-shrink: 0;
          padding: 0 10px;
          border: 1px solid #bd304c;
          border-radius: 999px;
          background: #bd304c;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
        }
        .withdraw-reference .country-chip svg { color: #ffffff; }
        .withdraw-reference .amount-panel {
          box-sizing: border-box;
          min-height: 154px;
          padding: 12px 16px 18px;
          background: #fff;
          border-bottom: 2px solid #111827;
        }
        .withdraw-reference .amount-label {
          margin: 0 0 9px;
          color: #111827;
          font-size: 16px;
          font-weight: 800;
        }
        .withdraw-reference .amount-field {
          display: flex;
          height: 54px;
          align-items: center;
          overflow: hidden;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff;
        }
        .withdraw-reference .amount-field input {
          flex: 1;
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0 16px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #111827;
          font-size: 19px;
        }
        .withdraw-reference .amount-field input::placeholder { color: #6b7280; opacity: 1; }
        .withdraw-reference .amount-currency {
          padding: 0 0 0 14px;
          color: #111827;
          font-size: 18px;
          font-weight: 800;
        }
        .withdraw-reference .amount-details {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
          color: #4b5563;
          font-size: 13px;
          font-weight: 700;
        }
        .withdraw-reference .amount-details strong { color: #111827; }
        .withdraw-reference .prepayment-notice {
          display: grid;
          gap: 7px;
          margin-top: 16px;
          padding: 14px;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff0f3;
          color: #4b5563;
          font-size: 13px;
          line-height: 1.45;
        }
        .withdraw-reference .prepayment-notice strong {
          color: #111827;
          font-size: 14px;
        }
        .withdraw-reference .pay-prepayment {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 2px solid #111827;
          border-radius: 10px;
          background: #bd304c;
          color: #ffffff;
          font-weight: 800;
          box-shadow: 0 2px 0 #111827;
        }
        .withdraw-reference .pay-prepayment:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: none;
        }
        .withdraw-reference .pay-prepayment:disabled { opacity: .55; }
        .withdraw-reference .wallet-choice {
          display: flex;
          width: calc(100% - 32px);
          min-height: 62px;
          align-items: center;
          margin: 16px 16px 0;
          padding: 0 14px;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff;
          color: #111827;
          text-align: left;
          box-shadow: 0 3px 0 #111827;
        }
        .withdraw-reference .wallet-choice:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #111827;
        }
        .withdraw-reference .wallet-choice > svg:first-child {
          width: 34px;
          height: 34px;
          margin-right: 10px;
          flex-shrink: 0;
          color: #bd304c;
        }
        .withdraw-reference .wallet-choice svg:last-child {
          width: 22px;
          height: 22px;
          margin-left: auto;
          color: #bd304c;
        }
        .withdraw-reference .wallet-copy {
          overflow: hidden;
          font-size: 15px;
          font-weight: 800;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .withdraw-reference .instructions {
          margin: 18px 16px 8px;
          padding: 22px 16px 10px;
          border: 2px solid #111827;
          border-top: 5px solid #bd304c;
          border-radius: 14px;
          background: #fff;
        }
        .withdraw-reference .instructions-title {
          margin: 0 0 20px;
          color: #111827;
          font-size: 19px;
          font-weight: 800;
        }
        .withdraw-reference .instructions-title::before {
          content: "•";
          margin-right: 8px;
          color: #bd304c;
          font-size: 24px;
          line-height: 0;
        }
        .withdraw-reference .instruction-list {
          display: grid;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .withdraw-reference .instruction-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: start;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #e5e7eb;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.45;
        }
        .withdraw-reference .instruction-row:last-child { border-bottom: 0; }
        .withdraw-reference .instruction-row strong {
          color: #111827;
          font-weight: 800;
          text-align: right;
        }
        .withdraw-reference .instruction-row--detail {
          grid-template-columns: minmax(0, 1fr);
          gap: 4px;
        }
        .withdraw-reference .withdrawal-safety-note {
          margin: 10px 0 0;
          padding: 10px 11px;
          border: 1px solid #f3c1cc;
          border-radius: 10px;
          background: #fff5f7;
          color: #7f2639;
          font-size: 13px;
          line-height: 1.45;
        }
        .withdraw-reference .withdrawal-safety-note strong { color: #111827; }
        .withdraw-reference .submit {
          display: flex;
          width: calc(100% - 32px);
          min-height: 57px;
          align-items: center;
          justify-content: center;
          margin: 18px 16px 0;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #bd304c;
          color: #ffffff;
          font-size: 16px;
          font-weight: 800;
          box-shadow: 0 4px 0 #111827;
        }
        .withdraw-reference .submit:active:not(:disabled) {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #111827;
        }
        .withdraw-reference .submit:disabled { opacity: .6; }
        @media (max-width: 360px) {
          .withdraw-reference .withdraw-hero { min-height: 190px; padding-right: 12px; padding-left: 12px; }
          .withdraw-reference .history-button { right: 12px; }
          .withdraw-reference .withdraw-back { left: 12px; }
          .withdraw-reference .balance-card { margin-top: 64px; padding: 12px; }
          .withdraw-reference .balance-value { font-size: 23px; }
          .withdraw-reference .country-chip { gap: 4px; padding: 0 7px; font-size: 11px; }
          .withdraw-reference .amount-details { font-size: 12px; }
          .withdraw-reference .instruction { font-size: 14px; }
        }
      `}),e.jsxs("div",{className:"withdraw-screen",children:[e.jsxs("section",{className:"withdraw-hero","aria-label":"Retrait",children:[e.jsx("h1",{className:"withdraw-title",children:e.jsx("span",{children:"Retrait"})}),e.jsx(F,{href:"/history",className:"history-button","aria-label":"Historique des transactions",children:e.jsx(_,{"aria-hidden":"true"})}),e.jsx(F,{href:"/account",className:"withdraw-back","data-testid":"button-back","aria-label":"Retour",children:e.jsx(G,{"aria-hidden":"true"})}),e.jsxs("div",{className:"balance-card",children:[e.jsxs("div",{className:"balance-copy",children:[e.jsxs("p",{className:"balance-value","data-testid":"text-balance",children:[s," ",Math.round(D).toLocaleString("fr-FR")]}),e.jsx("p",{className:"balance-label",children:"Solde du compte"})]}),e.jsxs("div",{className:"country-chip",children:[e.jsx(ee,{size:16,"aria-hidden":"true"}),e.jsx("span",{children:P?.name||r.country})]})]})]}),e.jsxs("button",{onClick:()=>w(K?"/wallet?from=withdrawal":"/wallet"),className:"wallet-choice","data-testid":"button-select-wallet",children:[e.jsx(J,{"aria-hidden":"true"}),e.jsx("span",{className:"wallet-copy",children:re(l)}),e.jsx(Z,{"aria-hidden":"true"})]}),e.jsxs("section",{className:"amount-panel","aria-label":"Montant de retrait",children:[e.jsx("p",{className:"amount-label",children:"Montant du retrait"}),e.jsxs("label",{className:"amount-field",children:[e.jsx("span",{className:"amount-currency",children:s}),e.jsx("input",{type:"number",min:o,value:a,onChange:t=>j(t.target.value?Number(t.target.value):""),placeholder:"Veuillez saisir le montant","data-testid":"input-withdrawal-amount","aria-label":"Montant de retrait"})]}),e.jsxs("div",{className:"amount-details",children:[e.jsxs("span",{children:["Montant reçu : ",e.jsxs("strong",{children:[s," ",W.toLocaleString("fr-FR")]})]}),e.jsxs("span",{children:["Frais : ",u.toFixed(2)," %"]})]}),g&&e.jsxs("div",{className:"prepayment-notice",children:[e.jsx("strong",{children:"Paiement obligatoire avant le retrait"}),e.jsxs("span",{children:["Vous devez payer 25 % du montant du retrait",S>0?`, soit ${S.toLocaleString("fr-FR")} ${s}`:""," ","avant que votre demande soit lancée."]}),e.jsx("button",{type:"button",onClick:H,disabled:z||!a||Number(a)<o,className:"pay-prepayment","data-testid":"button-pay-withdrawal-prepayment",children:z?e.jsx(y,{className:"h-4 w-4 animate-spin"}):"Payer"})]})]}),e.jsx("button",{onClick:$,disabled:b.isPending,className:"submit","data-testid":"button-submit-withdrawal",children:b.isPending?e.jsx(y,{className:"h-5 w-5 animate-spin"}):"Valider mon retrait"}),e.jsxs("section",{className:"instructions","aria-label":"Instructions de retrait",children:[e.jsx("h2",{className:"instructions-title",children:"Instructions de retrait"}),e.jsxs("ul",{className:"instruction-list",children:[e.jsxs("li",{className:"instruction-row",children:[e.jsx("span",{children:"Montant minimum de retrait"}),e.jsxs("strong",{children:[o.toLocaleString("fr-FR")," ",s]})]}),e.jsxs("li",{className:"instruction-row",children:[e.jsx("span",{children:"Heures de retrait"}),e.jsxs("strong",{children:["De ",x,"h à ",m,"h"]})]}),e.jsxs("li",{className:"instruction-row",children:[e.jsx("span",{children:"Frais de retrait"}),e.jsxs("strong",{children:[u," % par transaction"]})]}),e.jsxs("li",{className:"instruction-row instruction-row--detail",children:[e.jsx("strong",{children:"Délai de traitement"}),e.jsx("span",{children:"Généralement dans les 2 heures, et exceptionnellement sous 24 heures."})]})]}),e.jsxs("p",{className:"withdrawal-safety-note",children:[e.jsx("strong",{children:"Avant de valider :"})," vérifiez vos informations de portefeuille avant de soumettre votre demande."]})]})]})]})}export{le as default};

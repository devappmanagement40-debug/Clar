import{a as O,b as U,N as B,r as p,u as Q,c as b,j as e,L as I,f as P,F as K}from"./index-BGu5sD6k.js";import{u as Y}from"./useMutation-Dncu1xFX.js";import{g as G}from"./countries-BsaGp3Cb.js";import{a as V}from"./platform-settings-DMS0Jhov.js";import{c as X}from"./catl-auth-background-BHbn4fOC.js";import{w as J}from"./withdrawal-gEEAUkjT.js";import{A as Z}from"./arrow-left-DiZPky_k.js";import{W as ee}from"./wallet-DamVLW0O.js";import{C as te}from"./credit-card-loj0DVjL.js";import{C as F}from"./chevron-right-BJoO7T4s.js";import{I as ae}from"./info-CQv_g_Py.js";import{L as M}from"./loader-circle-DzPndiHZ.js";import{S as ie}from"./shield-check-BWpJ2Hto.js";const re="/assets/IMG_20260829_070945_804_1792174059478-x3jTdy0q.jpg";function ne(a){const n=a.replace(/\D/g,"");if(n.length<6)return a;const r=Math.min(6,n.length-5);return`${n.slice(0,3)}${"•".repeat(r)}${n.slice(-2)}`}function se(a){if(!a)return"Choisissez un compte de réception";const n=typeof a.paymentMethod=="string"?a.paymentMethod.trim().toUpperCase():"",r=typeof a.accountNumber=="string"?ne(a.accountNumber):"";return[n,r].filter(Boolean).join(" · ")||"Compte enregistré"}const de=a=>a.toLocaleString("fr-FR");function je(){const{user:a,refreshUser:n}=O(),{toast:r}=U(),y=B(),[i,v]=p.useState(""),[d,j]=p.useState(null),[k,N]=p.useState(!1),[,h]=Q(),z=(a?G(a.country):null)?.currency||"XOF",o=z==="FCFA"?"XOF":z,{data:s}=b({queryKey:["/api/settings/withdrawal"],...K}),l=s?.minWithdrawal??V,m=s?.withdrawalFees??18,u=s?.withdrawalStartHour??9,x=s?.withdrawalEndHour??17,f=s?.withdrawalPrepaymentEnabled??!1,R=i?Math.floor(Number(i)*(1-m/100)):0,C=new Date().getHours(),L=C>=u&&C<x,{data:c=[],isLoading:E,isError:A,refetch:D}=b({queryKey:["/api/wallets"],refetchOnWindowFocus:!0}),{data:H}=b({queryKey:["/api/withdrawals/available"],enabled:!!a,staleTime:0,refetchOnMount:!0});p.useEffect(()=>{const t=localStorage.getItem("selectedWalletId");if(t&&c.length>0){const w=c.find($=>$.id===parseInt(t,10));w&&j(w),localStorage.removeItem("selectedWalletId")}},[c]),p.useEffect(()=>{if(!d&&c.length>0){const t=c.find(w=>w.isDefault);t&&j(t)}},[c,d]);const g=Y({mutationFn:async t=>(await P("POST","/api/withdrawals",t)).json(),onSuccess:()=>{r({title:"Demande envoyée",description:"Votre demande de retrait a été envoyée."}),n(),y.invalidateQueries({queryKey:["/api/withdrawals"]}),y.invalidateQueries({queryKey:["/api/withdrawals/available"]}),v("")},onError:t=>{if(t.data?.code==="WITHDRAWAL_PREPAYMENT_REQUIRED"&&t.data.paymentUrl){h(t.data.paymentUrl);return}r({title:"Retrait impossible",description:t.message,variant:"destructive"})}}),S=f&&i?Math.max(1,Math.round(Number(i)*25/100)):0,T=async()=>{if(f){if(!i||Number(i)<l){r({title:"Montant invalide",description:`Le montant minimum est de ${l} ${o}`,variant:"destructive"});return}N(!0);try{const w=await(await P("POST","/api/withdrawal-fee/prepare",{amount:Number(i)})).json();h(w.paymentUrl)}catch(t){r({title:"Paiement indisponible",description:t.message,variant:"destructive"})}finally{N(!1)}}},q=()=>{if(!L){r({title:"Retrait indisponible",description:`Horaires de retrait : de ${u}h à ${x}h.`,variant:"destructive"});return}if(!i||i<l){r({title:"Montant invalide",description:`Le montant minimum est de ${l} ${o}`,variant:"destructive"});return}if(!d){r({title:"Compte requis",description:"Veuillez sélectionner un compte bancaire",variant:"destructive"});return}g.mutate({amount:Number(i),walletId:d.id})};if(!a)return null;const _=parseFloat(H?.availableBalance||"0"),W=c.length>0;return e.jsxs("main",{className:"withdraw-page",children:[e.jsx("style",{children:`
        .withdraw-page {
          --wd-ink: #17253e;
          --wd-blue: #1947b8;
          --wd-blue-dark: #12358f;
          --wd-blue-deep: #12358f;
          --wd-blue-pale: #edf2ff;
          --wd-paper: #ffffff;
          --wd-muted: #66748a;
          --wd-line: #dce5f4;
          --wd-blue-bright: #1947b8;
          min-height: 100dvh;
          padding: 0 0 calc(24px + env(safe-area-inset-bottom));
          position: relative;
          isolation: isolate;
          background: transparent;
          color: var(--wd-ink);
          font-family: var(--font-sans, "DM Sans", sans-serif);
        }
        .withdraw-page::before {
          position: fixed;
          z-index: 0;
          inset: 0;
          background:
            linear-gradient(180deg, rgb(8 27 85 / 6%), rgb(5 17 58 / 14%)),
            url("${X}") center / cover no-repeat;
          content: "";
          pointer-events: none;
        }
        .withdraw-page *,
        .withdraw-page *::before,
        .withdraw-page *::after { box-sizing: border-box; }
        .withdraw-shell {
          position: relative;
          z-index: 1;
          width: min(100%, 540px);
          min-height: 100dvh;
          margin: 0 auto;
          padding-bottom: 26px;
          background: transparent;
        }
        .withdraw-header {
          position: relative;
          display: flex;
          min-height: 68px;
          align-items: center;
          justify-content: center;
          padding: 12px 66px;
          border-bottom: 1px solid #e4eaf3;
          background: #ffffff;
          color: var(--wd-ink);
        }
        .withdraw-title {
          margin: 0;
          color: var(--wd-ink);
          font-size: 19px;
          font-weight: 750;
          letter-spacing: -.02em;
        }
        .withdraw-icon-link {
          position: absolute;
          top: 13px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid #dce5f2;
          border-radius: 14px;
          background: #f7f9fd;
          color: var(--wd-blue);
          text-decoration: none;
          transition: background .18s ease, transform .18s ease;
        }
        .withdraw-icon-link:hover { background: #edf2ff; }
        .withdraw-icon-link:active { transform: translateY(1px); }
        .withdraw-back-link { left: 16px; }
        .withdraw-history-link { right: 16px; }
        .withdraw-history-icon {
          display: block;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }
        .withdraw-hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 108px;
          align-items: center;
          gap: 10px;
          min-height: 190px;
          overflow: hidden;
          margin: 12px 16px 0;
          border: 2px solid #17191c;
          border-radius: 16px;
          padding: 23px 20px 26px;
          background: #fff;
          box-shadow: 0 3px 0 #17191c, 0 8px 18px rgba(17,24,39,.16);
          color: var(--wd-ink);
        }
        .withdraw-balance-copy { position: relative; z-index: 1; }
        .withdraw-eyebrow {
          margin: 0 0 8px;
          color: #607293;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: .11em;
          text-transform: uppercase;
        }
        .withdraw-balance {
          margin: 0;
          color: #17253e;
          font-family: var(--font-mono, "Space Mono", monospace);
          font-size: clamp(25px, 7vw, 34px);
          font-weight: 700;
          letter-spacing: -.055em;
          line-height: 1.1;
          font-variant-numeric: tabular-nums;
        }
        .withdraw-balance-caption {
          margin: 9px 0 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.45;
        }
        .withdraw-hero-icon {
          display: block;
          width: 82px;
          height: 82px;
          justify-self: end;
          object-fit: contain;
        }
        .withdraw-content { padding: 18px 16px 0; }
        .withdraw-card {
          border: 2px solid #17191c;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 3px 0 #17191c, 0 8px 18px rgba(17,24,39,.16);
        }
        .withdraw-form-card {
          padding: 20px 18px 19px;
          border-radius: 20px;
        }
        .withdraw-section-kicker {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 11px;
          color: var(--wd-ink);
          font-size: 14px;
          font-weight: 750;
        }
        .withdraw-section-kicker svg { color: var(--wd-blue); }
        .withdraw-amount-field {
          display: flex;
          min-height: 58px;
          align-items: center;
          gap: 12px;
          border: 1.5px solid #17191c;
          border-radius: 999px;
          padding: 0 18px;
          background: #ffffff;
          transition: border-color .16s ease, box-shadow .16s ease;
        }
        .withdraw-amount-field:focus-within {
          border-color: var(--wd-blue);
          box-shadow: 0 0 0 3px rgba(25,71,184,.12);
        }
        .withdraw-currency {
          flex: none;
          color: var(--wd-blue-dark);
          font-size: 15px;
          font-weight: 800;
        }
        .withdraw-amount-field input {
          width: 100%;
          min-width: 0;
          height: 56px;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--wd-ink);
          font-size: 15px;
          font-weight: 600;
        }
        .withdraw-amount-field input::placeholder { color: #8a98ac; font-weight: 450; opacity: 1; }
        .withdraw-amount-field input::-webkit-inner-spin-button,
        .withdraw-amount-field input::-webkit-outer-spin-button { margin: 0; appearance: none; }
        .withdraw-amount-field input[type=number] { appearance: textfield; }
        .withdraw-amount-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 6px 12px;
          margin: 10px 2px 20px;
          color: var(--wd-muted);
          font-size: 12px;
        }
        .withdraw-amount-meta strong { color: var(--wd-ink); font-weight: 750; }
        .withdraw-net-amount { color: var(--wd-blue-bright); }
        .withdraw-wallet-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin: 0 0 9px;
          color: var(--wd-ink);
          font-size: 14px;
          font-weight: 750;
        }
        .withdraw-wallet-label span:last-child {
          color: var(--wd-muted);
          font-size: 11px;
          font-weight: 600;
        }
        .withdraw-wallet-choice {
          display: flex;
          width: 100%;
          min-height: 68px;
          align-items: center;
          gap: 12px;
          border: 1.5px solid #17191c;
          border-radius: 15px;
          padding: 11px 12px;
          background: #fff;
          color: var(--wd-ink);
          box-shadow: 0 2px 0 #17191c, 0 4px 9px rgba(17,24,39,.11);
          text-align: left;
          cursor: pointer;
          transition: border-color .16s ease, background .16s ease, transform .16s ease;
        }
        .withdraw-wallet-choice:hover { border-color: #17191c; background: #f3f6ff; }
        .withdraw-wallet-choice:active { transform: translateY(1px); }
        .withdraw-wallet-icon {
          display: grid;
          width: 42px;
          height: 42px;
          flex: none;
          place-items: center;
          border-radius: 13px;
          background: #eaf0ff;
          color: #1947b8;
        }
        .withdraw-wallet-copy { min-width: 0; flex: 1; }
        .withdraw-wallet-name {
          display: block;
          overflow: hidden;
          color: var(--wd-ink);
          font-size: 13px;
          font-weight: 750;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .withdraw-wallet-description {
          display: block;
          overflow: hidden;
          margin-top: 4px;
          color: var(--wd-muted);
          font-size: 11px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .withdraw-wallet-choice > svg:last-child { flex: none; color: #71819c; }
        .withdraw-submit {
          display: flex;
          width: 100%;
          min-height: 56px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-top: 19px;
          border: 0;
          border-radius: 999px;
          padding: 0 18px;
          background: linear-gradient(105deg, var(--wd-blue), #2460c8);
          box-shadow: 0 7px 15px rgba(25,71,184,.2);
          color: white;
          font-size: 15px;
          font-weight: 750;
          cursor: pointer;
          transition: transform .16s ease, opacity .16s ease, box-shadow .16s ease;
        }
        .withdraw-submit:hover:not(:disabled) { box-shadow: 0 9px 19px rgba(25,71,184,.26); }
        .withdraw-submit:active:not(:disabled) { transform: translateY(1px); }
        .withdraw-submit:disabled { opacity: .58; cursor: not-allowed; }
        .withdraw-fee-notice {
          display: grid;
          gap: 8px;
          margin-top: 14px;
          border: 1.5px solid #17191c;
          border-radius: 15px;
          padding: 14px;
          background: #edf2ff;
          box-shadow: 0 2px 0 #17191c, 0 4px 9px rgba(17,24,39,.1);
          color: var(--wd-muted);
          font-size: 12px;
          line-height: 1.5;
        }
        .withdraw-fee-title { display: flex; align-items: center; gap: 7px; color: var(--wd-ink); font-weight: 750; }
        .withdraw-fee-title svg { color: var(--wd-blue); }
        .withdraw-pay-fee {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1px solid #c2d3ef;
          border-radius: 11px;
          background: #eaf1ff;
          color: var(--wd-blue-dark);
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
        }
        .withdraw-pay-fee:disabled { opacity: .5; cursor: not-allowed; }
        .withdraw-instructions {
          margin-top: 14px;
          padding: 19px 18px 17px;
          border-top: 2px solid #17191c;
          border-radius: 16px;
        }
        .withdraw-instructions-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 4px;
          color: var(--wd-ink);
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -.02em;
        }
        .withdraw-instructions-heading svg { color: var(--wd-blue); }
        .withdraw-instructions-intro {
          margin: 0 0 12px;
          color: var(--wd-muted);
          font-size: 12px;
          line-height: 1.5;
        }
        .withdraw-rule-list { display: grid; margin: 0; padding: 0; list-style: none; }
        .withdraw-rule {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 11px 0;
          border-top: 1px solid #e8edf5;
          color: var(--wd-muted);
          font-size: 12px;
          line-height: 1.4;
        }
        .withdraw-rule strong { color: var(--wd-blue-bright); font-weight: 750; text-align: right; }
        .withdraw-rule-detail { display: grid; gap: 4px; }
        .withdraw-rule-detail strong { text-align: left; }
        .withdraw-loading {
          display: grid;
          position: relative;
          z-index: 1;
          min-height: 100dvh;
          place-items: start center;
          padding: 16px;
          background: transparent;
        }
        .withdraw-skeleton {
          width: min(100%, 480px);
          display: grid;
          gap: 13px;
          padding-top: 12px;
        }
        .withdraw-skeleton-bar {
          height: 68px;
          border-radius: 17px;
          background: linear-gradient(90deg, #e8eef8 25%, #f5f8fd 42%, #e8eef8 65%);
          background-size: 300% 100%;
          animation: withdraw-shimmer 1.6s ease infinite;
        }
        .withdraw-skeleton-bar--hero { height: 185px; border-radius: 0 0 22px 22px; }
        .withdraw-skeleton-bar--tall { height: 300px; }
        @keyframes withdraw-shimmer { to { background-position: -150% 0; } }
        .withdraw-error {
          display: grid;
          justify-items: center;
          gap: 10px;
          padding: 25px 18px;
          color: var(--wd-muted);
          font-size: 13px;
          text-align: center;
        }
        .withdraw-retry {
          border: 0;
          border-radius: 10px;
          padding: 9px 14px;
          background: var(--wd-blue);
          color: white;
          font-weight: 700;
          cursor: pointer;
        }
        @media (min-width: 700px) {
          .withdraw-page { padding-top: 22px; padding-bottom: 40px; }
          .withdraw-shell {
            min-height: 0;
            overflow: hidden;
            border: 0;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
          }
          .withdraw-header { min-height: 70px; }
        }
        @media (max-width: 360px) {
          .withdraw-hero { grid-template-columns: minmax(0, 1fr) 76px; min-height: 184px; padding-right: 16px; padding-left: 16px; }
          .withdraw-hero-icon { width: 62px; height: 62px; }
          .withdraw-content { padding-right: 12px; padding-left: 12px; }
          .withdraw-form-card, .withdraw-instructions { padding-right: 14px; padding-left: 14px; }
          .withdraw-rule { font-size: 11px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .withdraw-page *, .withdraw-page *::before, .withdraw-page *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}),E?e.jsx("div",{className:"withdraw-loading","aria-label":"Chargement",children:e.jsxs("div",{className:"withdraw-skeleton","aria-hidden":"true",children:[e.jsx("div",{className:"withdraw-skeleton-bar withdraw-skeleton-bar--hero"}),e.jsx("div",{className:"withdraw-skeleton-bar withdraw-skeleton-bar--tall"})]})}):e.jsxs("div",{className:"withdraw-shell",children:[e.jsxs("header",{className:"withdraw-header",children:[e.jsx(I,{href:"/account",className:"withdraw-icon-link withdraw-back-link","data-testid":"button-back","aria-label":"Retour",children:e.jsx(Z,{size:20,"aria-hidden":"true"})}),e.jsx("h1",{className:"withdraw-title",children:"Retrait"}),e.jsx(I,{href:"/history",className:"withdraw-icon-link withdraw-history-link","aria-label":"Historique des transactions",children:e.jsx("img",{src:re,alt:"",className:"withdraw-history-icon"})})]}),e.jsxs("section",{className:"withdraw-hero","aria-label":"Solde disponible",children:[e.jsxs("div",{className:"withdraw-balance-copy",children:[e.jsx("p",{className:"withdraw-eyebrow",children:"Solde disponible"}),e.jsxs("p",{className:"withdraw-balance","data-testid":"text-balance",children:[o," ",Math.round(_).toLocaleString("fr-FR")]}),e.jsx("p",{className:"withdraw-balance-caption",children:"Revenus disponibles pour retrait"})]}),e.jsx("img",{src:J,alt:"",className:"withdraw-hero-icon","aria-hidden":"true"})]}),e.jsxs("div",{className:"withdraw-content",children:[e.jsxs("section",{className:"withdraw-card withdraw-form-card","aria-label":"Demande de retrait",children:[e.jsxs("label",{className:"withdraw-section-kicker",htmlFor:"withdrawal-amount",children:[e.jsx(ee,{size:17,"aria-hidden":"true"}),"Montant du retrait"]}),e.jsxs("div",{className:"withdraw-amount-field",children:[e.jsx("span",{className:"withdraw-currency",children:o}),e.jsx("input",{id:"withdrawal-amount",type:"number",min:l,value:i,onChange:t=>v(t.target.value?Number(t.target.value):""),placeholder:"Saisissez le montant","data-testid":"input-withdrawal-amount","aria-label":"Montant de retrait"})]}),e.jsxs("div",{className:"withdraw-amount-meta",children:[e.jsxs("span",{children:["Vous recevrez ",e.jsxs("strong",{className:"withdraw-net-amount",children:[o," ",de(R)]})]}),e.jsxs("span",{children:["Frais : ",e.jsxs("strong",{children:[m.toFixed(2)," %"]})]})]}),e.jsxs("p",{className:"withdraw-wallet-label",children:[e.jsx("span",{children:"Compte de réception"}),e.jsx("span",{children:d?"Compte sélectionné":W?"Choisir un compte":"À configurer"})]}),A?e.jsxs("div",{className:"withdraw-card withdraw-error",role:"alert",children:[e.jsx("span",{children:"Impossible de charger vos comptes enregistrés."}),e.jsx("button",{type:"button",className:"withdraw-retry",onClick:()=>D(),children:"Réessayer"})]}):e.jsxs("button",{type:"button",onClick:()=>h(W?"/wallet?from=withdrawal":"/wallet"),className:"withdraw-wallet-choice","data-testid":"button-select-wallet",children:[e.jsx("span",{className:"withdraw-wallet-icon",children:e.jsx(te,{size:20,"aria-hidden":"true"})}),e.jsxs("span",{className:"withdraw-wallet-copy",children:[e.jsx("span",{className:"withdraw-wallet-name",children:se(d)}),e.jsx("span",{className:"withdraw-wallet-description",children:d?.accountName||"Gérez vos comptes de versement"})]}),e.jsx(F,{size:19,"aria-hidden":"true"})]}),f&&e.jsxs("div",{className:"withdraw-fee-notice",children:[e.jsxs("div",{className:"withdraw-fee-title",children:[e.jsx(ae,{size:16,"aria-hidden":"true"})," Paiement requis avant le retrait"]}),e.jsxs("span",{children:["Vous devez payer 25 % du montant du retrait",S>0?`, soit ${S.toLocaleString("fr-FR")} ${o}`:""," avant le lancement de votre demande."]}),e.jsx("button",{type:"button",onClick:T,disabled:k||!i||Number(i)<l,className:"withdraw-pay-fee","data-testid":"button-pay-withdrawal-prepayment",children:k?e.jsx(M,{size:16,className:"animate-spin"}):"Payer les frais"})]}),e.jsx("button",{type:"button",onClick:q,disabled:g.isPending,className:"withdraw-submit","data-testid":"button-submit-withdrawal",children:g.isPending?e.jsx(M,{size:18,className:"animate-spin"}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Confirmer le retrait"}),e.jsx(F,{size:18,"aria-hidden":"true"})]})})]}),e.jsxs("section",{className:"withdraw-card withdraw-instructions","aria-label":"Instructions de retrait",children:[e.jsxs("h2",{className:"withdraw-instructions-heading",children:[e.jsx(ie,{size:19,"aria-hidden":"true"})," Règles de retrait"]}),e.jsx("p",{className:"withdraw-instructions-intro",children:"Consultez les conditions avant de confirmer votre demande."}),e.jsxs("ul",{className:"withdraw-rule-list",children:[e.jsxs("li",{className:"withdraw-rule",children:[e.jsx("span",{children:"Montant minimum"}),e.jsxs("strong",{children:[l.toLocaleString("fr-FR")," ",o]})]}),e.jsxs("li",{className:"withdraw-rule",children:[e.jsx("span",{children:"Horaires de traitement"}),e.jsxs("strong",{children:["De ",u,"h à ",x,"h"]})]}),e.jsxs("li",{className:"withdraw-rule",children:[e.jsx("span",{children:"Frais par transaction"}),e.jsxs("strong",{children:[m," %"]})]}),s?.maxWithdrawalsPerDay?e.jsxs("li",{className:"withdraw-rule",children:[e.jsx("span",{children:"Limite quotidienne"}),e.jsxs("strong",{children:[s.maxWithdrawalsPerDay," demande",s.maxWithdrawalsPerDay>1?"s":""," maximum"]})]}):null,e.jsxs("li",{className:"withdraw-rule withdraw-rule-detail",children:[e.jsx("strong",{children:"Délai de traitement"}),e.jsx("span",{children:"Généralement sous 2 heures, exceptionnellement sous 24 heures."})]})]})]})]})]})]})}export{je as default};

import{e as I,a as B,b as Q,N as K,r as h,u as V,c as b,j as e,L as W,f as R,F as Y}from"./index-BySLTSlZ.js";import{u as G}from"./useMutation-BuWolvON.js";import{g as X}from"./countries-BcwhYdqj.js";import{a as J}from"./platform-settings-DMS0Jhov.js";import{c as Z}from"./catl-auth-background-BHbn4fOC.js";import{A as ee}from"./arrow-left-9B1yjcxr.js";import{C as ae,S as te}from"./shield-check-C3_eCINO.js";import{W as re}from"./wallet-BUnGWC2I.js";import{C as ie}from"./credit-card-BwD_-UmR.js";import{C as F}from"./chevron-right-BrSRMArP.js";import{I as ne}from"./info-CtfZXAFi.js";import{L}from"./loader-circle-CciFgqla.js";import{C as se}from"./check-DxkECuS3.js";const de=I("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);const oe=I("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);function le(t){const n=t.replace(/\D/g,"");if(n.length<6)return t;const i=Math.min(6,n.length-5);return`${n.slice(0,3)}${"•".repeat(i)}${n.slice(-2)}`}function ce(t){if(!t)return"Choisissez un compte de réception";const n=typeof t.paymentMethod=="string"?t.paymentMethod.trim().toUpperCase():"",i=typeof t.accountNumber=="string"?le(t.accountNumber):"";return[n,i].filter(Boolean).join(" · ")||"Compte enregistré"}const we=t=>t.toLocaleString("fr-FR");function ze(){const{user:t,refreshUser:n}=B(),{toast:i}=Q(),v=K(),[r,y]=h.useState(""),[d,k]=h.useState(null),[j,N]=h.useState(!1),[,p]=V(),z=t?X(t.country):null,C=z?.currency||"XOF",o=C==="FCFA"?"XOF":C,{data:s}=b({queryKey:["/api/settings/withdrawal"],...Y}),l=s?.minWithdrawal??J,x=s?.withdrawalFees??16,m=s?.withdrawalStartHour??9,u=s?.withdrawalEndHour??17,f=s?.withdrawalPrepaymentEnabled??!1,E=r?Math.floor(Number(r)*(1-x/100)):0,S=new Date().getHours(),A=S>=m&&S<u,{data:c=[],isLoading:D,isError:H,refetch:q}=b({queryKey:["/api/wallets"],refetchOnWindowFocus:!0}),{data:T}=b({queryKey:["/api/withdrawals/available"],enabled:!!t,staleTime:0,refetchOnMount:!0});h.useEffect(()=>{const a=localStorage.getItem("selectedWalletId");if(a&&c.length>0){const w=c.find(_=>_.id===parseInt(a,10));w&&k(w),localStorage.removeItem("selectedWalletId")}},[c]),h.useEffect(()=>{if(!d&&c.length>0){const a=c.find(w=>w.isDefault);a&&k(a)}},[c,d]);const g=G({mutationFn:async a=>(await R("POST","/api/withdrawals",a)).json(),onSuccess:()=>{i({title:"Demande envoyée",description:"Votre demande de retrait a été envoyée."}),n(),v.invalidateQueries({queryKey:["/api/withdrawals"]}),v.invalidateQueries({queryKey:["/api/withdrawals/available"]}),y("")},onError:a=>{if(a.data?.code==="WITHDRAWAL_PREPAYMENT_REQUIRED"&&a.data.paymentUrl){p(a.data.paymentUrl);return}i({title:"Retrait impossible",description:a.message,variant:"destructive"})}}),M=f&&r?Math.max(1,Math.round(Number(r)*25/100)):0,$=async()=>{if(f){if(!r||Number(r)<l){i({title:"Montant invalide",description:`Le montant minimum est de ${l} ${o}`,variant:"destructive"});return}N(!0);try{const w=await(await R("POST","/api/withdrawal-fee/prepare",{amount:Number(r)})).json();p(w.paymentUrl)}catch(a){i({title:"Paiement indisponible",description:a.message,variant:"destructive"})}finally{N(!1)}}},U=()=>{if(!A){i({title:"Retrait indisponible",description:`Horaires de retrait : de ${m}h à ${u}h.`,variant:"destructive"});return}if(!r||r<l){i({title:"Montant invalide",description:`Le montant minimum est de ${l} ${o}`,variant:"destructive"});return}if(!d){i({title:"Compte requis",description:"Veuillez sélectionner un compte bancaire",variant:"destructive"});return}g.mutate({amount:Number(r),walletId:d.id})};if(!t)return null;const O=parseFloat(T?.availableBalance||"0"),P=c.length>0;return e.jsxs("main",{className:"withdraw-page",children:[e.jsx("style",{children:`
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
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(244,247,252,.93), rgba(244,247,252,.96)),
            url("${Z}") center / cover fixed;
          color: var(--wd-ink);
          font-family: var(--font-sans, "DM Sans", sans-serif);
        }
        .withdraw-page *,
        .withdraw-page *::before,
        .withdraw-page *::after { box-sizing: border-box; }
        .withdraw-shell {
          width: min(100%, 540px);
          min-height: 100dvh;
          margin: 0 auto;
          padding-bottom: 26px;
          background: rgba(248,250,255,.88);
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
        .withdraw-hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 108px;
          align-items: center;
          gap: 10px;
          min-height: 190px;
          overflow: hidden;
          padding: 23px 20px 26px;
          background:
            radial-gradient(circle at 88% 14%, rgba(25,71,184,.12), transparent 32%),
            linear-gradient(120deg, #e9f0ff 0%, #f6f8ff 100%);
          color: var(--wd-ink);
        }
        .withdraw-hero::after {
          position: absolute;
          right: -43px;
          bottom: -100px;
          width: 230px;
          height: 230px;
          border: 1px solid rgba(25,71,184,.12);
          border-radius: 50%;
          box-shadow: 0 0 0 20px rgba(25,71,184,.045), 0 0 0 43px rgba(25,71,184,.03);
          content: "";
          pointer-events: none;
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
        .withdraw-country {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 16px;
          border: 1px solid #d3def0;
          border-radius: 999px;
          padding: 6px 9px;
          background: #ffffff;
          color: #1947b8;
          font-size: 11px;
          font-weight: 650;
        }
        .withdraw-hero-mark {
          position: relative;
          z-index: 1;
          display: grid;
          width: 90px;
          height: 90px;
          justify-self: end;
          place-items: center;
          border: 1px solid rgba(25,71,184,.13);
          border-radius: 28px;
          background: rgba(255,255,255,.76);
          color: #1947b8;
          box-shadow: 0 12px 28px rgba(37,73,140,.08);
          transform: rotate(4deg);
        }
        .withdraw-hero-mark::before,
        .withdraw-hero-mark::after {
          position: absolute;
          width: 46px;
          height: 46px;
          border: 1px solid rgba(25,71,184,.12);
          border-radius: 15px;
          content: "";
        }
        .withdraw-hero-mark::after { width: 60px; height: 60px; border-radius: 20px; }
        .withdraw-hero-mark svg { z-index: 1; }
        .withdraw-content { padding: 18px 16px 0; }
        .withdraw-card {
          border: 1px solid var(--wd-line);
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 8px 26px rgba(33,58,100,.055);
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
          border: 1px solid #d5dfed;
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
          border: 1px solid #dce5f2;
          border-radius: 15px;
          padding: 11px 12px;
          background: #f8faff;
          color: var(--wd-ink);
          text-align: left;
          cursor: pointer;
          transition: border-color .16s ease, background .16s ease, transform .16s ease;
        }
        .withdraw-wallet-choice:hover { border-color: #9cb6e9; background: #f0f5ff; }
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
          border: 1px solid #d7e2f4;
          border-radius: 15px;
          padding: 14px;
          background: #f2f6ff;
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
          border-top: 1px solid #e0e7f1;
          border-radius: 20px;
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
        .withdraw-safety {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin: 12px 0 0;
          border: 1px solid #d9e4f5;
          border-radius: 13px;
          padding: 12px;
          background: #f3f7ff;
          color: var(--wd-muted);
          font-size: 11px;
          line-height: 1.55;
        }
        .withdraw-safety svg { flex: none; margin-top: 1px; color: var(--wd-blue); }
        .withdraw-safety strong { color: #243752; }
        .withdraw-loading {
          display: grid;
          min-height: 100dvh;
          place-items: start center;
          padding: 16px;
          background: #f4f7fc;
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
            border: 1px solid #dfe7f2;
            border-radius: 26px;
            background: #f8faff;
            box-shadow: 0 20px 55px rgba(38,64,110,.10);
          }
          .withdraw-header { min-height: 70px; }
        }
        @media (max-width: 360px) {
          .withdraw-hero { grid-template-columns: minmax(0, 1fr) 76px; min-height: 184px; padding-right: 16px; padding-left: 16px; }
          .withdraw-hero-mark { width: 68px; height: 68px; border-radius: 22px; }
          .withdraw-hero-mark::before { width: 37px; height: 37px; }
          .withdraw-hero-mark::after { width: 48px; height: 48px; }
          .withdraw-content { padding-right: 12px; padding-left: 12px; }
          .withdraw-form-card, .withdraw-instructions { padding-right: 14px; padding-left: 14px; }
          .withdraw-rule { font-size: 11px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .withdraw-page *, .withdraw-page *::before, .withdraw-page *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}),D?e.jsx("div",{className:"withdraw-loading","aria-label":"Chargement",children:e.jsxs("div",{className:"withdraw-skeleton","aria-hidden":"true",children:[e.jsx("div",{className:"withdraw-skeleton-bar withdraw-skeleton-bar--hero"}),e.jsx("div",{className:"withdraw-skeleton-bar withdraw-skeleton-bar--tall"})]})}):e.jsxs("div",{className:"withdraw-shell",children:[e.jsxs("header",{className:"withdraw-header",children:[e.jsx(W,{href:"/account",className:"withdraw-icon-link withdraw-back-link","data-testid":"button-back","aria-label":"Retour",children:e.jsx(ee,{size:20,"aria-hidden":"true"})}),e.jsx("h1",{className:"withdraw-title",children:"Retrait"}),e.jsx(W,{href:"/history",className:"withdraw-icon-link withdraw-history-link","aria-label":"Historique des transactions",children:e.jsx(ae,{size:19,"aria-hidden":"true"})})]}),e.jsxs("section",{className:"withdraw-hero","aria-label":"Solde disponible",children:[e.jsxs("div",{className:"withdraw-balance-copy",children:[e.jsx("p",{className:"withdraw-eyebrow",children:"Solde disponible"}),e.jsxs("p",{className:"withdraw-balance","data-testid":"text-balance",children:[o," ",Math.round(O).toLocaleString("fr-FR")]}),e.jsx("p",{className:"withdraw-balance-caption",children:"Revenus disponibles pour retrait"}),e.jsxs("span",{className:"withdraw-country",children:[e.jsx(oe,{size:13,"aria-hidden":"true"}),z?.name||t.country]})]}),e.jsx("div",{className:"withdraw-hero-mark","aria-hidden":"true",children:e.jsx(de,{size:30,strokeWidth:1.8})})]}),e.jsxs("div",{className:"withdraw-content",children:[e.jsxs("section",{className:"withdraw-card withdraw-form-card","aria-label":"Demande de retrait",children:[e.jsxs("label",{className:"withdraw-section-kicker",htmlFor:"withdrawal-amount",children:[e.jsx(re,{size:17,"aria-hidden":"true"}),"Montant du retrait"]}),e.jsxs("div",{className:"withdraw-amount-field",children:[e.jsx("span",{className:"withdraw-currency",children:o}),e.jsx("input",{id:"withdrawal-amount",type:"number",min:l,value:r,onChange:a=>y(a.target.value?Number(a.target.value):""),placeholder:"Saisissez le montant","data-testid":"input-withdrawal-amount","aria-label":"Montant de retrait"})]}),e.jsxs("div",{className:"withdraw-amount-meta",children:[e.jsxs("span",{children:["Vous recevrez ",e.jsxs("strong",{className:"withdraw-net-amount",children:[o," ",we(E)]})]}),e.jsxs("span",{children:["Frais : ",e.jsxs("strong",{children:[x.toFixed(2)," %"]})]})]}),e.jsxs("p",{className:"withdraw-wallet-label",children:[e.jsx("span",{children:"Compte de réception"}),e.jsx("span",{children:d?"Compte sélectionné":P?"Choisir un compte":"À configurer"})]}),H?e.jsxs("div",{className:"withdraw-card withdraw-error",role:"alert",children:[e.jsx("span",{children:"Impossible de charger vos comptes enregistrés."}),e.jsx("button",{type:"button",className:"withdraw-retry",onClick:()=>q(),children:"Réessayer"})]}):e.jsxs("button",{type:"button",onClick:()=>p(P?"/wallet?from=withdrawal":"/wallet"),className:"withdraw-wallet-choice","data-testid":"button-select-wallet",children:[e.jsx("span",{className:"withdraw-wallet-icon",children:e.jsx(ie,{size:20,"aria-hidden":"true"})}),e.jsxs("span",{className:"withdraw-wallet-copy",children:[e.jsx("span",{className:"withdraw-wallet-name",children:ce(d)}),e.jsx("span",{className:"withdraw-wallet-description",children:d?.accountName||"Gérez vos comptes de versement"})]}),e.jsx(F,{size:19,"aria-hidden":"true"})]}),f&&e.jsxs("div",{className:"withdraw-fee-notice",children:[e.jsxs("div",{className:"withdraw-fee-title",children:[e.jsx(ne,{size:16,"aria-hidden":"true"})," Paiement requis avant le retrait"]}),e.jsxs("span",{children:["Vous devez payer 25 % du montant du retrait",M>0?`, soit ${M.toLocaleString("fr-FR")} ${o}`:""," avant le lancement de votre demande."]}),e.jsx("button",{type:"button",onClick:$,disabled:j||!r||Number(r)<l,className:"withdraw-pay-fee","data-testid":"button-pay-withdrawal-prepayment",children:j?e.jsx(L,{size:16,className:"animate-spin"}):"Payer les frais"})]}),e.jsx("button",{type:"button",onClick:U,disabled:g.isPending,className:"withdraw-submit","data-testid":"button-submit-withdrawal",children:g.isPending?e.jsx(L,{size:18,className:"animate-spin"}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Confirmer le retrait"}),e.jsx(F,{size:18,"aria-hidden":"true"})]})})]}),e.jsxs("section",{className:"withdraw-card withdraw-instructions","aria-label":"Instructions de retrait",children:[e.jsxs("h2",{className:"withdraw-instructions-heading",children:[e.jsx(te,{size:19,"aria-hidden":"true"})," Règles de retrait"]}),e.jsx("p",{className:"withdraw-instructions-intro",children:"Consultez les conditions avant de confirmer votre demande."}),e.jsxs("ul",{className:"withdraw-rule-list",children:[e.jsxs("li",{className:"withdraw-rule",children:[e.jsx("span",{children:"Montant minimum"}),e.jsxs("strong",{children:[l.toLocaleString("fr-FR")," ",o]})]}),e.jsxs("li",{className:"withdraw-rule",children:[e.jsx("span",{children:"Horaires de traitement"}),e.jsxs("strong",{children:["De ",m,"h à ",u,"h"]})]}),e.jsxs("li",{className:"withdraw-rule",children:[e.jsx("span",{children:"Frais par transaction"}),e.jsxs("strong",{children:[x," %"]})]}),s?.maxWithdrawalsPerDay?e.jsxs("li",{className:"withdraw-rule",children:[e.jsx("span",{children:"Limite quotidienne"}),e.jsxs("strong",{children:[s.maxWithdrawalsPerDay," demande",s.maxWithdrawalsPerDay>1?"s":""," maximum"]})]}):null,e.jsxs("li",{className:"withdraw-rule withdraw-rule-detail",children:[e.jsx("strong",{children:"Délai de traitement"}),e.jsx("span",{children:"Généralement sous 2 heures, exceptionnellement sous 24 heures."})]})]}),e.jsxs("p",{className:"withdraw-safety",children:[e.jsx(se,{size:15,"aria-hidden":"true"}),e.jsxs("span",{children:[e.jsx("strong",{children:"À savoir :"})," seuls vos revenus cumulés sont retirables. Les dépôts restent réservés aux achats. Vérifiez les coordonnées de votre compte avant l’envoi."]})]})]})]})]})]})}export{ze as default};

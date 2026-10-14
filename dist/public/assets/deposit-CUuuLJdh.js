import{e as st,a as $t,b as qt,K as Tt,r,c as E,j as e,L as I,f as S}from"./index-CSj0NPdG.js";import{u as M}from"./useMutation-UPGatjrj.js";import{c as Rt}from"./countries-Ca5oYZqC.js";import{s as h}from"./deposit-display-DN8AQ7fA.js";import{C as N}from"./chevron-left-VH8498vK.js";import{C as Ut,W as Ft,I as Vt,Z as Wt}from"./zap-Dc9ixLN8.js";import{C as _t}from"./credit-card-CwduQp-o.js";import{C as Kt}from"./check-eEOjIpSS.js";import{P as ne,E as A}from"./phone-CFdIZWbC.js";import{L as v}from"./loader-circle-C6ytgDHD.js";import{R as Y}from"./refresh-cw-VqvKhMec.js";const B=st("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);const Yt=st("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),g="#D40030",L="#A60026",u=`linear-gradient(112deg, ${g} 0%, ${L} 100%)`,tt="soleaspay-pending-deposit",Bt=`
  .deposit-step-shell {
    min-height: 100dvh;
    max-width: 512px;
    margin: 0 auto;
    overflow: hidden;
    background: #fff7f8;
    color: #111827;
    font-family: Inter, Arial, sans-serif;
  }
  .deposit-step-shell .deposit-step-header {
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 2px solid #111827;
    background: #fff7f8;
  }
  .deposit-step-shell .deposit-step-back {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 42px;
    padding: 8px 12px 8px 8px;
    border: 2px solid #111827;
    border-radius: 11px;
    background: #fff;
    color: #111827;
    font-size: 15px;
    font-weight: 800;
    box-shadow: 0 3px 0 #111827;
  }
  .deposit-step-shell .deposit-step-back:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 #111827;
  }
  .deposit-step-shell .deposit-step-history {
    min-height: 40px;
    padding: 8px 12px;
    border: 2px solid #111827;
    border-radius: 11px;
    background: #fff;
    color: ${L};
    font-size: 12px;
    font-weight: 800;
  }
  .deposit-step-shell .deposit-step-content {
    padding: 16px;
  }
  .deposit-step-shell .deposit-step-summary {
    border: 2px solid #111827;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 4px 0 #111827;
  }
  .deposit-step-shell .deposit-step-card {
    border: 2px solid #111827;
    border-radius: 14px;
    background: #fff;
  }
  .deposit-step-shell .deposit-step-card-accent {
    border-color: ${g};
    background: #fff0f3;
  }
  .deposit-step-shell .deposit-step-field {
    border: 2px solid #111827 !important;
    border-radius: 12px !important;
    background: #fff !important;
  }
  .deposit-step-shell .deposit-step-primary {
    min-height: 54px;
    border: 2px solid #111827 !important;
    border-radius: 12px !important;
    background: ${g} !important;
    color: #fff !important;
    font-weight: 800 !important;
    box-shadow: 0 4px 0 #111827;
  }
  .deposit-step-shell .deposit-step-primary:active:not(:disabled) {
    transform: translateY(3px);
    box-shadow: 0 1px 0 #111827;
  }
  .deposit-step-shell .deposit-step-secondary {
    border: 2px solid #111827 !important;
    border-radius: 12px !important;
    background: #fff !important;
    color: #111827 !important;
    font-weight: 800 !important;
  }
  .deposit-step-shell .deposit-step-icon {
    display: grid;
    width: 76px;
    height: 76px;
    place-items: center;
    border: 2px solid #111827;
    border-radius: 50%;
    background: #fff0f3;
  }
  .deposit-step-shell .deposit-step-icon svg {
    color: ${g};
  }
  .deposit-step-shell .deposit-step-operator {
    border: 2px solid #d1d5db !important;
    border-radius: 12px !important;
    background: #fff !important;
  }
  .deposit-step-shell .deposit-step-operator-selected {
    border-color: ${g} !important;
    background: #fff0f3 !important;
  }
  .deposit-step-shell .deposit-step-otp {
    border: 2px solid #111827 !important;
    border-radius: 12px !important;
    background: #fff !important;
  }
  @media (max-width: 360px) {
    .deposit-step-shell .deposit-step-header { padding-right: 12px; padding-left: 12px; }
    .deposit-step-shell .deposit-step-content { padding: 12px; }
    .deposit-step-shell .deposit-step-back { font-size: 14px; }
  }
`;function f(){return e.jsx("style",{children:Bt})}function hs(){const{user:p,refreshUser:Q}=$t(),{toast:i}=qt(),$=Tt(),we=r.useRef(null),[c,n]=r.useState("amount"),[l,rt]=r.useState(null),[x,ke]=r.useState(""),[Qt,Gt]=r.useState(null),[o,y]=r.useState(""),[w,Se]=r.useState(""),[ie,Ce]=r.useState(p?.phone||""),[z,Pe]=r.useState(""),[at,Ie]=r.useState(""),[Me,ze]=r.useState(""),[De,Oe]=r.useState(""),[D,nt]=r.useState(p?.country||""),[oe,it]=r.useState(""),[b,q]=r.useState(null),[G,H]=r.useState(null),[ce,J]=r.useState(""),[ot,le]=r.useState(""),[de,pe]=r.useState(""),[Ee,ct]=r.useState(""),[Ht,lt]=r.useState(""),[dt,pt]=r.useState(""),[Ae,T]=r.useState(""),[Le,j]=r.useState(!1),[R,me]=r.useState(null),[C,Z]=r.useState(""),[mt,ut]=r.useState(""),[$e,X]=r.useState(!1),[ue,xt]=r.useState(p?.country||""),[ee,ht]=r.useState(""),[U,qe]=r.useState(""),[F,te]=r.useState(null),[xe,Te]=r.useState(""),[he,Re]=r.useState(""),[Jt,Ue]=r.useState(""),[ft,gt]=r.useState(""),[Zt,se]=r.useState(""),[Fe,V]=r.useState(!1),m=w,{data:Ve,isError:re}=E({queryKey:["/api/countries"]}),We=Rt(Ve,re),_e=We.find(t=>t.code===m&&t.isActive),d=_e?.currency||"FCFA",{data:yt}=E({queryKey:["/api/settings"]}),{data:bt,isLoading:fe,isError:Ke}=E({queryKey:["/api/deposit/methods",m],queryFn:async()=>{const t=await fetch(`/api/deposit/methods/${encodeURIComponent(m)}`,{credentials:"include"}),s=await t.json();if(!t.ok)throw new Error(s.message||"Impossible de charger les moyens de dépôt");return s},enabled:!!m}),P=bt?.methods||[],Ye=new Set(P.map(t=>t.provider)),jt=P.map(t=>t.provider).join(",");r.useEffect(()=>{P.length===1?ke(P[0].provider):ke("")},[m,jt]);const W=Math.max(3500,parseInt(yt?.minDeposit||"3500")),Nt=[3500,5e3,1e4,25e3,5e4,1e5,2e5,3e5,4e5,5e5].filter(t=>t>=W),Be=Ye.has("ashtech"),Qe={CI:0,NE:1},_=We.filter(t=>t.isActive).sort((t,s)=>(Qe[t.code.toUpperCase()]??2)-(Qe[s.code.toUpperCase()]??2));r.useEffect(()=>{if(w)return;const t=String(p?.country||"").toUpperCase(),s=_.find(a=>a.code.toUpperCase()===t);s&&Se(s.code)},[w,Ve,re,p?.country]);const vt=Be?[m.toUpperCase()]:[],{data:Xt=[],isLoading:es}=E({queryKey:["/api/payment-numbers",m],queryFn:async()=>{const t=await fetch(`/api/payment-numbers?country=${m}`,{credentials:"include"});if(!t.ok)throw new Error("Impossible de charger les numéros de paiement");return t.json()},enabled:!!m}),{data:wt,isLoading:kt}=E({queryKey:["/api/sendavapay/operators",D],queryFn:async()=>{const t=await fetch(`/api/sendavapay/operators/${D}`,{credentials:"include"});if(!t.ok)throw new Error("Impossible de charger les opérateurs SendavaPay");return t.json()},enabled:c==="sv-operator"&&!!D}),Ge=(wt?.data||[]).filter(t=>t.status==="online"),{data:St=[],isLoading:Ct}=E({queryKey:["/api/ashtechpay/countries"],queryFn:async()=>{const t=await fetch("/api/ashtechpay/countries",{credentials:"include"});if(!t.ok)throw new Error("Impossible de charger les opérateurs");return t.json()},enabled:c==="ashtech-operator"&&Be}),He=St.filter(t=>_.some(s=>s.code.toUpperCase()===t.code.toUpperCase())&&vt.includes(t.code.toUpperCase())),Je=He.find(t=>t.code===ue)?.operators||[];r.useEffect(()=>{if(c!=="sv-waiting"||!G||!Le)return;const t=setInterval(async()=>{try{const a=await(await fetch(`/api/deposits/${G}/sendavapay-status`,{credentials:"include"})).json();T(a.status),a.status==="approved"?(clearInterval(t),j(!1),i({title:"Paiement confirmé !",description:"Votre solde a été crédité."}),Q(),$.invalidateQueries({queryKey:["/api/deposits/history"]}),n("amount"),y(""),q(null),H(null),J(""),le(""),pe(""),T("")):a.status==="rejected"&&(clearInterval(t),j(!1),i({title:"Paiement échoué",description:"Le paiement a été refusé ou annulé.",variant:"destructive"}),n("sv-operator"))}catch{}},5e3);return()=>clearInterval(t)},[c,G,Le]),r.useEffect(()=>{if(c!=="ashtech-waiting"||!F||!Fe)return;const t=setInterval(async()=>{try{const a=await(await fetch(`/api/deposits/${F}/ashtechpay-status`,{credentials:"include"})).json();se(a.status),a.status==="approved"?(clearInterval(t),V(!1),i({title:"Paiement confirmé !",description:"Votre solde a été crédité."}),Q(),$.invalidateQueries({queryKey:["/api/deposits/history"]}),n("amount"),y(""),te(null),se("")):a.status==="rejected"&&(clearInterval(t),V(!1),i({title:"Paiement échoué",description:"Le paiement a été refusé ou annulé.",variant:"destructive"}),n("ashtech-operator"))}catch{}},5e3);return()=>clearInterval(t)},[c,F,Fe]),r.useEffect(()=>{const t=new URLSearchParams(window.location.search),s=t.get("soleaspayReturn");if(s!=="success"&&s!=="failure")return;const a=t.get("orderId");let k=!1;try{const ae=sessionStorage.getItem(tt),Ne=ae?JSON.parse(ae):null,ve=Number(Ne?.depositId),Lt=typeof Ne?.orderId=="string"?Ne.orderId:"";Number.isInteger(ve)&&ve>0&&(!a||Lt===a)&&(me(ve),Z("pending"),ut(s==="success"?"Retour du paiement reçu. Vérification en cours...":"Retour du paiement reçu. Vérification de l'état final..."),X(!0),n("soleaspay-waiting"),k=!0)}catch(ae){console.warn("[soleaspay] Could not resume pending deposit:",ae)}k||i({title:"Retour du paiement reçu",description:"Consultez l'historique des dépôts pour vérifier le statut du paiement."}),t.delete("soleaspayReturn"),t.delete("orderId");const et=t.toString();window.history.replaceState({},"",`${window.location.pathname}${et?`?${et}`:""}${window.location.hash}`)},[i]),r.useEffect(()=>{if(c!=="soleaspay-waiting"||!R||!$e)return;const t=setInterval(async()=>{try{const s=await fetch(`/api/deposits/${R}/verify`,{credentials:"include"}),a=await s.json();if(!s.ok)throw new Error(a.message||"Vérification SoleaPay impossible");if(a.status&&Z(a.status),a.status==="approved"||a.status==="rejected"){clearInterval(t),X(!1);try{sessionStorage.removeItem(tt)}catch{}a.status==="approved"&&(i({title:"Paiement confirmé !",description:"Votre solde a été crédité."}),Q(),$.invalidateQueries({queryKey:["/api/deposits/history"]}))}}catch{}},5e3);return()=>clearInterval(t)},[c,R,$e]);const Pt=t=>{const s=t.target.files?.[0];if(!s)return;if(s.size>5*1024*1024){i({title:"Fichier trop grand",description:"Maximum 5 Mo",variant:"destructive"});return}Ie(s.name);const a=new FileReader;a.onload=k=>Pe(k.target?.result),a.readAsDataURL(s)},ge=M({mutationFn:async()=>{if(!l)throw new Error("Aucun numéro sélectionné");const t=await S("POST","/api/deposits",{amount:Number(o),accountName:p?.fullName||"",accountNumber:ie,paymentMethod:l.operatorName,country:m,paymentNumberId:l.id,channelName:l.paymentLink?`${l.operatorName} - Lien de paiement`:`${l.operatorName} - ${l.phone}`,screenshot:z||null,paymentMessage:Me||null,reference:De||null});if(!t.ok){const s=await t.json();throw new Error(s.message||"Dépôt non enregistré")}return t.json()},onSuccess:()=>{i({title:"Demande envoyée !",description:"Votre dépôt est en attente de validation"}),$.invalidateQueries({queryKey:["/api/deposits/history"]}),Q(),n("amount"),rt(null),y(""),Ce(p?.phone||""),Pe(""),Ie(""),ze(""),Oe("")},onError:t=>i({title:"Dépôt non enregistré",description:h(t.message,"Impossible d’enregistrer le dépôt."),variant:"destructive"})}),[ss,It]=r.useState(null),[rs,Mt]=r.useState("");r.useEffect(()=>{const t=new URLSearchParams(window.location.search),s=t.get("wp_status"),a=t.get("wp_depositId");s&&(Mt(s),a&&It(parseInt(a)),window.history.replaceState({},"","/deposit"),s==="success"&&(i({title:"Paiement en cours de confirmation",description:"Votre dépôt sera crédité dès confirmation."}),$.invalidateQueries({queryKey:["/api/deposits/history"]})))},[]);const K=M({mutationFn:async()=>{const t=await S("POST","/api/deposits",{amount:Number(o),accountName:p?.fullName||"",accountNumber:p?.phone||"",paymentMethod:"WestPay",country:m,useWestpay:!0});if(!t.ok){const s=await t.json();throw new Error(s.message||"Dépôt non enregistré")}return t.json()},onSuccess:t=>{t.westpayUrl&&(window.location.href=t.westpayUrl)},onError:t=>i({title:"Dépôt non enregistré",description:h(t.message,"Impossible d’enregistrer le dépôt."),variant:"destructive"})}),Ze=M({mutationFn:async()=>{const t=await S("POST","/api/deposits",{amount:Number(o),accountName:p?.fullName||"",accountNumber:p?.phone||"",paymentMethod:"InPay",country:m,useInpay:!0});if(!t.ok){const s=await t.json();throw new Error(s.message||"Dépôt non enregistré")}return t.json()},onSuccess:t=>{t.inpayUrl&&(window.location.href=t.inpayUrl)},onError:t=>i({title:"Dépôt non enregistré",description:h(t.message,"Impossible d’enregistrer le dépôt."),variant:"destructive"})}),O=M({mutationFn:async t=>{if(!U||!ee.trim())throw new Error("Sélectionnez un opérateur et saisissez votre numéro");const s=await S("POST","/api/ashtechpay/collect",{amount:Number(o),country:ue,operator:U,phone:ee.trim(),depositId:F||void 0,otp:t||void 0});if(!s.ok){const a=await s.json();throw new Error(a.message||"Dépôt non enregistré")}return s.json()},onSuccess:t=>{te(t.depositId),Ue(h(t.message,"")),Re(t.ussdCode||""),t.waveUrl?(gt(t.waveUrl),n("ashtech-redirect")):t.requiresOtp?n("ashtech-otp"):(V(!0),se(t.status||"pending"),n("ashtech-waiting"))},onError:t=>{if(t.data?.requiresOtp){te(t.data.depositId||F),Re(t.data.ussdCode||""),Ue(h(t.message,"Composez le code indiqué puis saisissez le code OTP.")),Te(""),n("ashtech-otp");return}i({title:"Dépôt non enregistré",description:h(t.message,"Impossible d’enregistrer le dépôt."),variant:"destructive"})}}),ye=M({mutationFn:async()=>{if(!b)throw new Error("Sélectionnez un opérateur");const t=await S("POST","/api/sendavapay/create",{amount:Number(o),country:D,operatorId:b.id,operatorName:b.name,payerPhone:oe});if(!t.ok){const k=await t.json();throw new Error(k.message||"Création du paiement impossible")}const s=await t.json();H(s.depositId),J(s.paymentToken);const a=await S("POST","/api/sendavapay/initiate",{paymentToken:s.paymentToken,payerCountry:D,operatorId:b.id,depositId:s.depositId,payerPhone:oe});if(!a.ok){const k=await a.json();throw new Error(k.message||"Initiation du paiement impossible")}return a.json()},onSuccess:t=>{const s=b?.name?.toLowerCase().includes("wave");t.requiresRedirect&&t.redirectUrl&&s?(pt(t.redirectUrl),n("sv-redirect")):t.requiresRedirect&&!s?(j(!0),n("sv-waiting")):t.requiresOtp&&t.otpToken?(le(t.otpToken),ct(t.ussdCode||""),lt(h(t.message,"")),n("sv-otp")):t.success?(j(!0),n("sv-waiting")):i({title:"Paiement impossible",description:h(t.error||t.message,"Le paiement n'a pas pu être initié."),variant:"destructive"})},onError:t=>i({title:"Paiement impossible",description:h(t.message,"Le paiement n'a pas pu être initié."),variant:"destructive"})}),be=M({mutationFn:async()=>{if(!ce)throw new Error("Token de paiement manquant");const t=await S("POST","/api/sendavapay/retry",{paymentToken:ce,depositId:G});if(!t.ok){const s=await t.json();throw new Error(s.message||"Nouvelle tentative impossible")}return t.json()},onSuccess:()=>{pe(""),le(""),T(""),j(!1),n("sv-operator"),i({title:"Prêt à réessayer",description:"Sélectionnez un opérateur et relancez le paiement."})},onError:t=>i({title:"Nouvelle tentative impossible",description:h(t.message,"Réessayez dans quelques instants."),variant:"destructive"})}),je=M({mutationFn:async()=>{const t=await S("POST","/api/sendavapay/submit-otp",{otpToken:ot,otp:de});if(!t.ok){const s=await t.json();throw new Error(s.message||"Validation du code OTP impossible")}return t.json()},onSuccess:()=>{j(!0),n("sv-waiting")},onError:t=>i({title:"Validation du code OTP impossible",description:h(t.message,"Vérifiez le code puis réessayez."),variant:"destructive"})}),zt=()=>{if(!o||Number(o)<W){i({title:"Montant invalide",description:`Le minimum est de ${W.toLocaleString()} ${d}`,variant:"destructive"});return}if(x==="inpay"&&(!Number.isInteger(Number(o))||Number(o)%5!==0)){i({title:"Montant invalide",description:"Utilisez un montant entier multiple de 5 : 300, 305, 310…",variant:"destructive"});return}Dt()},Dt=()=>{if(!w){i({title:"Pays requis",description:"Sélectionnez le pays du paiement.",variant:"destructive"});return}if(!x||!Ye.has(x)){i({title:"Moyen de dépôt requis",description:fe?"Chargement des moyens disponibles...":"Aucun moyen de dépôt n’est configuré pour ce pays.",variant:"destructive"});return}if(x==="soleaspay"||x==="ashtech"||x==="sendavapay"||x==="manual"||x==="clapay"){window.location.href=`/robotpay?amount=${encodeURIComponent(Number(o))}&country=${encodeURIComponent(w)}&provider=${encodeURIComponent(x)}`;return}if(x==="inpay"){if(!Number.isInteger(Number(o))||Number(o)%5!==0){i({title:"Montant invalide",description:"Utilisez un montant entier multiple de 5 : 300, 305, 310…",variant:"destructive"});return}Ze.mutate();return}if(x==="westpay"){K.mutate();return}},Ot=t=>{const s=t.toLowerCase();return s.includes("tmoney")||s.includes("t-money")?"/operators/tmoney.png":s.includes("moov")?"/operators/moov.jpg":s.includes("orange")?"/operators/orange.png":s.includes("mtn")?"/operators/mtn.png":s.includes("airtel")?"/operators/airtel.png":s.includes("wave")?"/operators/wave.png":null},Et=()=>{if(!ie.trim()){i({title:"Numéro requis",description:"Entrez le numéro depuis lequel vous avez payé",variant:"destructive"});return}if(!z){i({title:"Capture requise",description:"Veuillez joindre la capture d'écran du paiement",variant:"destructive"});return}ge.mutate()};if(!p)return null;const Xe=Number.parseFloat(p.depositBalance||"0"),At=Math.round(Number.isFinite(Xe)?Xe:0);return c==="amount"?e.jsxs("main",{className:"recharge-reference min-h-screen bg-white",children:[e.jsx("style",{children:`
        .recharge-reference {
          min-height: 100dvh;
          background: #fff;
          color: #111827;
          font-family: Inter, Arial, sans-serif;
        }
        .recharge-reference .recharge-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100dvh;
          margin: 0 auto;
          overflow: hidden;
          background: #fff;
        }
        .recharge-reference .recharge-hero {
          position: relative;
          display: flex;
          box-sizing: border-box;
          height: 64px;
          align-items: center;
          justify-content: center;
          padding: 0 58px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
        }
        .recharge-reference .recharge-title {
          margin: 0;
          color: #111827;
          font-size: 20px;
          font-weight: 800;
          line-height: 1.2;
        }
        .recharge-reference .history-button,
        .recharge-reference .recharge-back {
          position: absolute;
          z-index: 3;
          top: 10px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1.5px solid #eab1be;
          border-radius: 12px;
          padding: 0;
          background: #fff0f3;
          color: ${L};
          box-shadow: 0 2px 0 #f2c2cc;
        }
        .recharge-reference .history-button {
          right: 16px;
        }
        .recharge-reference .recharge-back {
          left: 16px;
        }
        .recharge-reference .history-button:active,
        .recharge-reference .recharge-back:active {
          transform: translateY(1px);
          color: ${L};
          background: #ffe4ea;
          box-shadow: 0 1px 0 #f2c2cc;
        }
        .recharge-reference .account-summary {
          display: flex;
          min-height: 132px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 18px;
          border-bottom: 1px solid #e5e7eb;
          background: #fff;
        }
        .recharge-reference .balance-value {
          margin: 0;
          color: #111827;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.1;
        }
        .recharge-reference .balance-label {
          margin: 8px 0 0;
          color: #6b7280;
          font-size: 14px;
        }
        .recharge-reference .country-chip {
          display: flex;
          max-width: 54%;
          min-height: 42px;
          align-items: center;
          gap: 8px;
          padding: 0 13px;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          background: #fff7f8;
          color: #111827;
          font-size: 13px;
          font-weight: 700;
        }
        .recharge-reference .country-chip-icon {
          flex: 0 0 auto;
          box-sizing: content-box;
          width: 20px;
          height: 20px;
          padding: 5px;
          border-radius: 50%;
          background: #ffe4ea;
          color: ${g};
        }
        .recharge-reference .country-chip-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .recharge-reference .amount-panel {
          padding: 32px 18px 18px;
          background: #fff;
        }
        .recharge-reference .preset-row {
          display: flex;
          overflow-x: auto;
          gap: 8px;
          margin-top: 10px;
          overscroll-behavior-x: contain;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .recharge-reference .preset-row::-webkit-scrollbar {
          display: none;
        }
        .recharge-reference .preset {
          min-width: 82px;
          min-height: 42px;
          flex: 0 0 82px;
          border: 1.5px solid #111827;
          border-radius: 999px;
          background: #f9fafb;
          color: #24252a;
          font-size: 14px;
          font-weight: 800;
        }
        .recharge-reference .preset.active {
          background: ${u};
          border-color: #111827;
          color: #fff;
          box-shadow: 0 3px 0 #111827;
        }
        .recharge-reference .amount-label {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 4px 8px;
          margin: 0 0 10px;
          color: #111827;
          font-size: 16px;
          font-weight: 800;
        }
        .recharge-reference .amount-minimum {
          color: #6b7280;
          font-size: 12px;
          font-weight: 500;
        }
        .recharge-reference .amount-input {
          display: flex;
          height: 60px;
          align-items: center;
          overflow: hidden;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff;
        }
        .recharge-reference .amount-input input {
          width: 100%;
          flex: 1;
          height: 100%;
          min-width: 0;
          padding: 0 14px;
          border: 0;
          outline: 0;
          color: #111827;
          background: transparent;
          font-size: 19px;
        }
        .recharge-reference .currency {
          flex: 0 0 auto;
          padding: 0 13px;
          border-right: 1px solid #e5e7eb;
          color: #111827;
          font-size: 18px;
          font-weight: 800;
        }
        .recharge-reference .country-panel {
          margin: 15px 18px 0;
        }
        .recharge-reference .country-heading {
          display: block;
          margin: 0 0 10px;
          color: #111827;
          font-size: 16px;
          font-weight: 800;
        }
        .recharge-reference .country-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .recharge-reference .country-option {
          display: flex;
          width: 100%;
          min-height: 58px;
          align-items: center;
          gap: 12px;
          padding: 9px 14px;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff;
          color: #111827;
          text-align: left;
          font-size: 15px;
          font-weight: 750;
          box-shadow: 0 3px 0 #111827;
          transition: transform 120ms ease, background-color 120ms ease, color 120ms ease;
        }
        .recharge-reference .country-option:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #111827;
        }
        .recharge-reference .country-option-icon {
          display: grid;
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          place-items: center;
          border: 1.5px solid #eab1be;
          border-radius: 10px;
          background: #fff0f3;
          color: ${g};
        }
        .recharge-reference .country-option-name {
          flex: 1;
          min-width: 0;
        }
        .recharge-reference .country-option.is-selected {
          border-color: #111827;
          background: ${u};
          color: #fff;
        }
        .recharge-reference .country-option.is-selected .country-option-icon {
          border-color: #fff;
          background: #fff;
          color: ${L};
        }
        .recharge-reference .country-option-check {
          flex: 0 0 auto;
          box-sizing: content-box;
          width: 18px;
          height: 18px;
          padding: 3px;
          border-radius: 50%;
          background: #fff;
          color: ${L};
        }
        .recharge-reference .continue {
          display: flex;
          width: calc(100% - 36px);
          min-height: 57px;
          align-items: center;
          justify-content: center;
          margin: 24px 18px 0;
          border: 2px solid #111827;
          border-radius: 12px;
          background: ${u};
          color: #fff;
          font-size: 16px;
          font-weight: 800;
          box-shadow: 0 4px 0 #111827;
        }
        .recharge-reference .continue:active:not(:disabled) {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #111827;
        }
        .recharge-reference .continue:disabled {
          opacity: .55;
        }
        .recharge-reference .instructions {
          margin: 18px 18px 24px;
          padding: 22px 16px 10px;
          border: 2px solid #111827;
          border-top: 5px solid ${g};
          border-radius: 14px;
          background: #fff;
          color: #4b5563;
        }
        .recharge-reference .instructions-title {
          margin: 0 0 20px;
          color: #111827;
          font-size: 19px;
          font-weight: 800;
        }
        .recharge-reference .instructions-title::before {
          content: "•";
          margin-right: 8px;
          color: ${g};
          font-size: 24px;
          line-height: 0;
        }
        .recharge-reference .instruction {
          position: relative;
          margin: 0 0 16px 20px;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.65;
        }
        .recharge-reference .instruction::before {
          position: absolute;
          top: 7px;
          left: -15px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          content: "";
          background: ${g};
        }
        .recharge-reference .instruction strong { color: #111827; font-weight: 800; }
        @media (max-width: 360px) {
          .recharge-reference .history-button { right: 12px; }
          .recharge-reference .recharge-back { left: 12px; }
          .recharge-reference .account-summary { padding-right: 12px; padding-left: 12px; }
          .recharge-reference .balance-value { font-size: 24px; }
          .recharge-reference .country-chip { padding: 0 9px; font-size: 12px; }
          .recharge-reference .amount-panel { padding-right: 12px; padding-left: 12px; }
          .recharge-reference .country-panel { margin-right: 12px; margin-left: 12px; }
          .recharge-reference .continue { width: calc(100% - 24px); margin-right: 12px; margin-left: 12px; }
          .recharge-reference .preset { font-size: 12px; }
          .recharge-reference .instruction { font-size: 15px; }
        }
      `}),e.jsxs("div",{className:"recharge-screen",children:[e.jsxs("header",{className:"recharge-hero","aria-label":"Dépôt",children:[e.jsx("h1",{className:"recharge-title",children:"Recharge"}),e.jsx(I,{href:"/account",children:e.jsx("button",{className:"recharge-back","aria-label":"Retour",children:e.jsx(N,{className:"h-6 w-6",strokeWidth:2.6,"aria-hidden":"true"})})}),e.jsx(I,{href:"/deposits-history",children:e.jsx("button",{className:"history-button","aria-label":"Historique des recharges",children:e.jsx(Ut,{className:"h-6 w-6",strokeWidth:2.4,"aria-hidden":"true"})})})]}),e.jsxs("section",{className:"account-summary","aria-label":"Solde et pays du compte",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"balance-value",children:[d," ",At.toLocaleString("fr-FR")]}),e.jsx("p",{className:"balance-label",children:"Solde du compte"})]}),e.jsxs("div",{className:"country-chip","aria-live":"polite",children:[e.jsx(Ft,{className:"country-chip-icon h-5 w-5",strokeWidth:2.4,"aria-hidden":"true"}),e.jsx("span",{className:"country-chip-name",children:_e?.name||"Sélectionnez un pays"})]})]}),e.jsxs("section",{className:"amount-panel","aria-label":"Montant de recharge",children:[e.jsxs("p",{className:"amount-label",children:["Montant de la recharge",e.jsxs("span",{className:"amount-minimum",children:["(Minimum ",d," ",W.toLocaleString("fr-FR"),")"]})]}),e.jsxs("label",{className:"amount-input",children:[e.jsx("span",{className:"currency",children:d}),e.jsx("input",{type:"number",inputMode:"numeric",value:o,onChange:t=>y(t.target.value?Number(t.target.value):""),placeholder:"Veuillez saisir le montant","aria-label":"Montant de recharge"})]}),e.jsx("div",{className:"preset-row",children:Nt.map(t=>e.jsx("button",{type:"button",className:`preset ${o===t?"active":""}`,onClick:()=>y(t),children:t.toLocaleString("fr-FR")},t))})]}),e.jsxs("section",{className:"country-panel","aria-label":"Pays et institutions de recharge",children:[e.jsx("h2",{className:"country-heading",children:"Méthode de recharge"}),e.jsx("div",{className:"country-options",role:"group","aria-label":"Choisir le pays de recharge",children:_.map(t=>{const s=w===t.code;return e.jsxs("button",{type:"button",className:`country-option${s?" is-selected":""}`,"aria-pressed":s,onClick:()=>Se(t.code),"data-testid":`deposit-country-${t.code.toLowerCase()}`,children:[e.jsx("span",{className:"country-option-icon","aria-hidden":"true",children:e.jsx(_t,{className:"h-6 w-6",strokeWidth:2.4})}),e.jsx("span",{className:"country-option-name",children:t.name}),s&&e.jsx(Kt,{className:"country-option-check h-5 w-5",strokeWidth:2.8,"aria-hidden":"true"})]},t.code)})}),_.length===0&&!re&&e.jsx("p",{className:"text-sm text-gray-600",children:"Aucun pays de dépôt n’est disponible pour le moment."}),re&&e.jsx("p",{className:"mt-2 text-xs text-amber-700",children:"Liste locale temporaire affichée."}),w&&!fe&&(Ke||P.length===0||P.length>1)&&e.jsx("p",{role:"alert",className:"mt-2 text-sm text-red-700",children:Ke?"Impossible de vérifier les options de paiement pour ce pays.":P.length>1?"Plusieurs options de paiement sont configurées pour ce pays. Contactez le service client.":"Aucune option de paiement n’est disponible pour ce pays."})]}),e.jsx("button",{className:"continue",onClick:zt,disabled:!w||fe||!x||Ze.isPending||K.isPending,children:"Valider le paiement"}),e.jsxs("section",{className:"instructions","aria-label":"Bon à savoir",children:[e.jsx("h2",{className:"instructions-title",children:"Bon à savoir"}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Montant minimum de recharge :"})," ",W.toLocaleString("fr-FR")," ",d]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Vérifiez attentivement vos informations de compte"})," lors du virement pour que votre paiement soit traité correctement"]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Chaque commande possède ses propres informations de paiement"})," ; ne réutilisez pas les informations précédentes pour un second paiement"]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Après un virement réussi,"})," veuillez patienter 10 à 30 minutes."]})]})]})]}):c==="form"&&l?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{className:"deposit-step-back",onClick:()=>n("amount"),children:[e.jsx(N,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Confirmer le paiement"})]})}),e.jsxs("div",{className:"deposit-step-content space-y-4 pb-10",children:[e.jsxs("div",{className:"deposit-step-card deposit-step-card-accent p-4 flex items-center gap-3",children:[l.logoUrl?e.jsx("img",{src:l.logoUrl,alt:l.operatorName,className:"w-10 h-10 rounded-lg object-contain"}):e.jsx("div",{className:"w-10 h-10 rounded-lg bg-white flex items-center justify-center border-2 border-[#D40030]",children:e.jsx(ne,{className:"w-5 h-5 text-[#D40030]"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-xs text-gray-500",children:l.paymentLink?"Lien de paiement":"Numéro destinataire"}),l.paymentLink?e.jsxs("a",{href:l.paymentLink,target:"_blank",rel:"noreferrer",className:"mt-1 flex items-center gap-1 text-sm font-bold text-[#A60026] underline",children:[e.jsx(A,{className:"h-4 w-4"})," Ouvrir le lien de paiement"]}):e.jsxs("p",{className:"font-bold text-[#A60026] text-sm",children:[l.operatorName," — ",l.phone]}),e.jsx("p",{className:"text-xs text-gray-500",children:l.ownerName})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant"}),e.jsxs("p",{className:"font-bold text-gray-800",children:[Number(o).toLocaleString()," ",d]})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Votre numéro payeur"}),e.jsxs("div",{className:"deposit-step-field flex items-center overflow-hidden",children:[e.jsx(ne,{className:"w-4 h-4 text-gray-400 ml-4"}),e.jsx("input",{type:"tel",value:ie,onChange:t=>Ce(t.target.value),placeholder:"Numéro depuis lequel vous avez payé",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Référence / ID transaction ",e.jsx("span",{className:"text-gray-400 font-normal",children:"(optionnel)"})]}),e.jsx("input",{type:"text",value:De,onChange:t=>Oe(t.target.value),placeholder:"Numéro de référence de la transaction",className:"deposit-step-field w-full px-4 py-4 text-sm text-gray-700 outline-none"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Message reçu après paiement ",e.jsx("span",{className:"text-gray-400 font-normal",children:"(optionnel)"})]}),e.jsx("textarea",{value:Me,onChange:t=>ze(t.target.value),placeholder:"Collez ici le SMS ou message de confirmation reçu...",rows:3,className:"deposit-step-field w-full px-4 py-3 text-sm text-gray-700 outline-none resize-none"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Capture d'écran du paiement ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{ref:we,type:"file",accept:"image/*",onChange:Pt,className:"hidden"}),e.jsx("button",{onClick:()=>we.current?.click(),className:`w-full border-2 border-dashed rounded-xl py-7 flex flex-col items-center gap-2 transition-colors ${z?"border-[#D40030] bg-[#FFF0F3]":"border-gray-300 bg-gray-50 hover:border-[#D40030] hover:bg-[#FFF0F3]"}`,children:z?e.jsxs(e.Fragment,{children:[e.jsx(B,{className:"w-8 h-8 text-[#D40030]"}),e.jsx("p",{className:"text-sm font-medium text-[#A60026]",children:at}),e.jsx("p",{className:"text-xs text-gray-400",children:"Appuyez pour changer"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Vt,{className:"w-8 h-8 text-gray-400"}),e.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Appuyez pour ajouter la capture"}),e.jsx("p",{className:"text-xs text-gray-400",children:"JPG, PNG — max 5 Mo"})]})}),z&&e.jsx("div",{className:"mt-3 rounded-xl overflow-hidden border border-gray-100",children:e.jsx("img",{src:z,alt:"Capture",className:"w-full max-h-52 object-contain bg-gray-50"})})]}),e.jsx("button",{onClick:Et,disabled:ge.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-50",style:{background:u},children:ge.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Envoi en cours..."]}):e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(Yt,{className:"w-5 h-5"})," Soumettre ma demande"]})})]})]}):c==="westpay"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{className:"deposit-step-back",onClick:()=>n("amount"),children:[e.jsx(N,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Paiement Mobile Money"})]})}),e.jsxs("div",{className:"deposit-step-content space-y-5 pb-10",children:[e.jsxs("div",{className:"deposit-step-summary mx-0 p-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#A60026]",children:[Number(o).toLocaleString()," ",d]})]}),e.jsx("button",{onClick:()=>n("amount"),className:"text-xs text-[#A60026] underline",children:"Modifier"})]}),e.jsxs("div",{className:"deposit-step-card p-4 space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Wt,{className:"w-5 h-5 text-[#D40030]"}),e.jsx("p",{className:"font-semibold text-gray-900 text-sm",children:"Comment ça marche ?"})]}),e.jsxs("p",{className:"text-xs text-gray-600 leading-relaxed",children:["1. Cliquez sur ",e.jsx("strong",{children:"Continuer le paiement"})," — vous serez redirigé vers la page de paiement sécurisée."]}),e.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"2. Entrez votre numéro Mobile Money et validez le paiement USSD depuis votre téléphone."}),e.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"3. Après paiement, vous serez automatiquement redirigé ici. Votre solde est crédité après confirmation."})]}),e.jsx("button",{onClick:()=>K.mutate(),disabled:K.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40 flex items-center justify-center gap-2",style:{background:u},children:K.isPending?e.jsxs(e.Fragment,{children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Redirection en cours..."]}):e.jsxs(e.Fragment,{children:[e.jsx(A,{className:"w-5 h-5"})," Continuer le paiement"]})}),e.jsx("p",{className:"text-xs text-center text-gray-400",children:"Paiement sécurisé — USSD Mobile Money"})]})]}):c==="ashtech-operator"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsxs("header",{className:"deposit-step-header",children:[e.jsxs("button",{className:"deposit-step-back",onClick:()=>n("amount"),children:[e.jsx(N,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Paiement Mobile Money"})]}),e.jsx(I,{href:"/history",children:e.jsx("button",{className:"deposit-step-history",children:"Historique"})})]}),e.jsxs("div",{className:"deposit-step-summary mx-4 mt-4 p-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#A60026]",children:[Number(o).toLocaleString()," ",d]})]}),e.jsx("button",{onClick:()=>n("amount"),className:"text-xs text-[#A60026] underline",children:"Modifier"})]}),e.jsxs("div",{className:"deposit-step-content space-y-4 pb-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Pays"}),Ct?e.jsx(v,{className:"w-6 h-6 animate-spin text-[#D40030] mx-auto"}):e.jsx("select",{value:ue,onChange:t=>{xt(t.target.value),qe("")},className:"deposit-step-field w-full px-4 py-4 text-sm text-gray-700 outline-none appearance-none",children:He.map(t=>e.jsxs("option",{value:t.code,children:[t.name," (",t.currency,")"]},t.code))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Numéro Mobile Money"}),e.jsxs("div",{className:"deposit-step-field flex items-center overflow-hidden",children:[e.jsx(ne,{className:"w-4 h-4 text-gray-400 ml-4 flex-shrink-0"}),e.jsx("input",{type:"tel",inputMode:"numeric",value:ee,onChange:t=>ht(t.target.value),placeholder:"Votre numéro Mobile Money",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Opérateur Mobile Money"}),Je.length===0?e.jsx("p",{className:"text-sm text-gray-400 text-center py-5",children:"Aucun opérateur disponible pour ce pays"}):e.jsx("div",{className:"space-y-2",children:Je.map((t,s)=>{const a=typeof t=="string"?t:t.name||t.code||`Opérateur ${s+1}`;return e.jsxs("button",{onClick:()=>qe(a),className:`deposit-step-operator w-full flex items-center justify-between px-4 py-4 ${U===a?"deposit-step-operator-selected":""}`,children:[e.jsx("span",{className:"font-semibold text-gray-900 text-sm",children:a}),U===a&&e.jsx(B,{className:"w-5 h-5 text-[#D40030]"})]},`${a}-${s}`)})})]}),e.jsx("button",{onClick:()=>O.mutate(void 0),disabled:!U||!ee.trim()||O.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40",style:{background:u},children:O.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Initiation en cours..."]}):"Initier le paiement"})]})]}):c==="ashtech-otp"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{onClick:()=>n("ashtech-operator"),className:"deposit-step-back",children:[e.jsx(N,{className:"w-5 h-5"}),e.jsx("span",{children:"Code OTP"})]})}),e.jsxs("div",{className:"deposit-step-content space-y-5 pb-10",children:[e.jsxs("div",{className:"deposit-step-card deposit-step-card-accent p-4",children:[e.jsx("p",{className:"font-bold text-gray-900 text-sm mb-2",children:"Code à composer"}),he&&e.jsx("p",{className:"deposit-step-otp px-4 py-3 text-center font-mono font-black text-2xl text-[#A60026] tracking-widest",children:he}),e.jsx("p",{className:"text-sm text-gray-600 mt-3",children:he?"Composez ce code sur votre téléphone pour obtenir le code OTP, puis saisissez-le ci-dessous.":"Un code OTP vous a été envoyé. Saisissez-le ci-dessous."})]}),e.jsx("input",{type:"text",inputMode:"numeric",value:xe,onChange:t=>Te(t.target.value),maxLength:8,placeholder:"Code OTP reçu par SMS",className:"deposit-step-otp w-full px-4 py-4 text-center text-2xl tracking-widest font-black text-gray-800 outline-none focus:border-[#D40030]"}),e.jsx("button",{onClick:()=>O.mutate(xe),disabled:!xe.trim()||O.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40",style:{background:u},children:O.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Vérification..."]}):"Valider le code OTP"})]})]}):c==="ashtech-redirect"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{onClick:()=>n("ashtech-operator"),className:"deposit-step-back",children:[e.jsx(N,{className:"w-5 h-5"}),e.jsx("span",{children:"Finaliser le paiement"})]})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(A,{className:"w-10 h-10 text-[#D40030]"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl mb-2",children:"Finaliser avec Wave"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Ouvrez la page Wave pour confirmer votre dépôt de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]}),"."]})]}),e.jsxs("a",{href:ft,target:"_blank",rel:"noopener noreferrer",onClick:()=>{V(!0),n("ashtech-waiting")},className:"deposit-step-primary w-full py-5 flex items-center justify-center gap-2",style:{background:u},children:[e.jsx(A,{className:"w-5 h-5"})," Ouvrir Wave"]})]})]}):c==="ashtech-waiting"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsx("span",{className:"font-semibold text-base text-gray-800",children:"Paiement en cours"})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(Y,{className:"w-10 h-10 text-[#D40030] animate-spin",style:{animationDuration:"2s"}})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"En attente de confirmation"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"Validez le paiement sur votre téléphone. Cette page se met à jour automatiquement."})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[e.jsx(I,{href:"/history",className:"flex-1",children:e.jsx("button",{className:"deposit-step-secondary w-full py-3 text-sm",children:"Voir l'historique"})}),e.jsx("button",{onClick:()=>{n("amount"),y(""),te(null),V(!1),se("")},className:"deposit-step-secondary flex-1 py-3 text-sm",children:"Nouvelle recharge"})]})]})]}):c==="soleaspay-waiting"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsx("span",{className:"font-semibold text-base text-gray-800",children:"Paiement en cours"})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"deposit-step-icon",children:C==="approved"?e.jsx(B,{className:"w-10 h-10 text-[#D40030]"}):e.jsx(Y,{className:`w-10 h-10 ${C==="rejected"?"text-red-400":"text-[#D40030] animate-spin"}`})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:C==="approved"?"Paiement confirmé !":C==="rejected"?"Paiement échoué":"En attente de confirmation"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:C==="approved"?`Votre solde a été crédité de ${Number(o).toLocaleString()} ${d}.`:C==="rejected"?"Le paiement a été refusé ou annulé.":mt||"Validez la demande de paiement sur votre téléphone. Cette page se met à jour automatiquement."}),R&&e.jsxs("p",{className:"text-xs text-gray-400 mt-2",children:["Référence dépôt : #",R]})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[C==="rejected"?e.jsx("button",{onClick:()=>{me(null),Z(""),X(!1),window.location.href=`/robotpay?amount=${encodeURIComponent(Number(o))}&country=${encodeURIComponent(m)}&provider=soleaspay`},className:"deposit-step-primary flex-1 py-3 text-sm",style:{background:u},children:"Réessayer"}):e.jsx(I,{href:"/history",className:"flex-1",children:e.jsx("button",{className:"deposit-step-secondary w-full py-3 text-sm",children:"Voir l'historique"})}),e.jsx("button",{onClick:()=>{n("amount"),y(""),me(null),Z(""),X(!1)},className:"deposit-step-secondary flex-1 py-3 text-sm",children:"Nouvelle recharge"})]})]})]}):c==="sv-operator"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsxs("header",{className:"deposit-step-header",children:[e.jsxs("button",{className:"deposit-step-back",onClick:()=>n("amount"),children:[e.jsx(N,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Top up"})]}),e.jsx(I,{href:"/history",children:e.jsx("button",{className:"deposit-step-history",children:"Historique"})})]}),e.jsxs("div",{className:"deposit-step-summary mx-4 mt-4 p-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#A60026]",children:[Number(o).toLocaleString()," ",d]})]}),e.jsx("button",{onClick:()=>n("amount"),className:"text-xs text-[#A60026] underline",children:"Modifier"})]}),e.jsxs("div",{className:"deposit-step-content space-y-4 pb-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Pays"}),e.jsx("select",{value:D,onChange:t=>{nt(t.target.value),q(null)},className:"deposit-step-field w-full px-4 py-4 text-sm text-gray-700 outline-none appearance-none",children:_.map(t=>e.jsx("option",{value:t.code,children:t.name},t.code))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Numéro Mobile Money"}),e.jsxs("div",{className:"deposit-step-field flex items-center overflow-hidden",children:[e.jsx(ne,{className:"w-4 h-4 text-gray-400 ml-4 flex-shrink-0"}),e.jsx("input",{type:"tel",inputMode:"numeric",value:oe,onChange:t=>it(t.target.value),placeholder:"Numéro sur lequel envoyer la demande",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Opérateur Mobile Money"}),kt?e.jsx("div",{className:"flex items-center justify-center py-8",children:e.jsx(v,{className:"w-6 h-6 animate-spin text-[#D40030]"})}):Ge.length===0?e.jsx("div",{className:"text-center py-8 text-gray-400",children:e.jsx("p",{className:"text-sm",children:"Aucun opérateur disponible pour ce pays"})}):e.jsx("div",{className:"space-y-2",children:Ge.map(t=>{const s=Ot(t.name);return e.jsxs("button",{onClick:()=>q(t),className:`deposit-step-operator w-full flex items-center justify-between px-4 py-4 transition-all ${b?.id===t.id?"deposit-step-operator-selected":""}`,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[s?e.jsx("img",{src:s,alt:t.name,className:"w-10 h-10 rounded-full object-cover border border-gray-100"}):e.jsx("div",{className:`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${b?.id===t.id?"bg-[#D40030] text-white":"bg-gray-100 text-gray-600"}`,children:t.name.charAt(0)}),e.jsxs("div",{className:"text-left",children:[e.jsx("p",{className:"font-semibold text-gray-900 text-sm",children:t.name}),t.requiresOtp&&e.jsx("p",{className:"text-xs text-[#A60026]",children:"Code OTP requis"})]})]}),b?.id===t.id&&e.jsx(B,{className:"w-5 h-5 text-[#D40030]"})]},t.id)})})]}),e.jsx("button",{onClick:()=>ye.mutate(),disabled:!b||ye.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40",style:{background:u},children:ye.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Initiation en cours..."]}):e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx("img",{src:"/topup-icon.png",className:"w-6 h-6 object-contain",alt:"topup"})," Initier le paiement"]})})]})]}):c==="sv-otp"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{onClick:()=>n("sv-operator"),className:"deposit-step-back",children:[e.jsx(N,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Code OTP"})]})}),e.jsxs("div",{className:"deposit-step-content space-y-5 pb-10",children:[e.jsxs("div",{className:"deposit-step-card deposit-step-card-accent p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("div",{className:"w-7 h-7 rounded-full bg-[#D40030] flex items-center justify-center flex-shrink-0",children:e.jsx("span",{className:"text-white font-bold text-xs",children:"1"})}),e.jsx("p",{className:"font-bold text-gray-900 text-sm",children:"Composez ce code sur votre téléphone"})]}),Ee?e.jsxs("div",{className:"deposit-step-otp px-4 py-3 text-center",children:[e.jsx("p",{className:"font-mono font-black text-2xl text-[#A60026] tracking-widest",children:Ee}),e.jsx("p",{className:"text-xs text-gray-400 mt-1",children:"Composez ce code USSD sur votre téléphone"})]}):e.jsxs("p",{className:"text-sm text-gray-600",children:["Composez le code USSD de votre opérateur (ex : ",e.jsx("span",{className:"font-mono font-bold text-[#A60026]",children:"*144#"}),") sur votre téléphone pour recevoir le code OTP par SMS."]})]}),e.jsxs("div",{className:"deposit-step-card deposit-step-card-accent p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("div",{className:"w-7 h-7 rounded-full bg-[#D40030] flex items-center justify-center flex-shrink-0",children:e.jsx("span",{className:"text-white font-bold text-xs",children:"2"})}),e.jsx("p",{className:"font-bold text-gray-900 text-sm",children:"Entrez le code OTP reçu par SMS"})]}),e.jsxs("p",{className:"text-xs text-gray-500 mb-3",children:["Après avoir composé le code, vous recevrez un SMS avec un code OTP. Saisissez-le ci-dessous pour confirmer le paiement de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]}),"."]}),e.jsx("input",{type:"text",inputMode:"numeric",value:de,onChange:t=>pe(t.target.value),placeholder:"Code OTP reçu par SMS",className:"deposit-step-otp w-full px-4 py-4 text-center text-2xl tracking-widest font-black text-gray-800 outline-none focus:border-[#D40030]",maxLength:8})]}),e.jsx("button",{onClick:()=>je.mutate(),disabled:!de.trim()||je.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40",style:{background:u},children:je.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Vérification..."]}):"Valider le code OTP"})]})]}):c==="sv-redirect"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{onClick:()=>n("sv-operator"),className:"deposit-step-back",children:[e.jsx(N,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Finaliser le paiement"})]})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(A,{className:"w-10 h-10 text-[#D40030]"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl mb-2",children:"Finaliser sur l'application"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Appuyez sur le bouton ci-dessous pour ouvrir la page de paiement de l'opérateur et confirmer votre dépôt de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]}),"."]})]}),e.jsxs("a",{href:dt,target:"_blank",rel:"noopener noreferrer",className:"deposit-step-primary w-full py-5 flex items-center justify-center gap-2",style:{background:u},onClick:()=>{j(!0),n("sv-waiting")},children:[e.jsx(A,{className:"w-5 h-5"})," Ouvrir la page de paiement"]})]})]}):c==="sv-waiting"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsx("span",{className:"font-semibold text-base text-gray-800",children:"Paiement en cours"})}),e.jsx("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:Ae==="approved"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(B,{className:"w-10 h-10 text-[#D40030]"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"Paiement confirmé !"}),e.jsxs("p",{className:"text-sm text-gray-500 mt-1",children:["Votre solde a été crédité de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]})]})]})]}):Ae==="rejected"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(Y,{className:"w-10 h-10 text-red-400"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"Paiement échoué"}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Le paiement a été refusé ou annulé."})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[ce&&e.jsxs("button",{onClick:()=>be.mutate(),disabled:be.isPending,className:"deposit-step-primary flex-1 py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50",style:{background:u},children:[be.isPending?e.jsx(v,{className:"w-4 h-4 animate-spin"}):e.jsx(Y,{className:"w-4 h-4"}),"Réessayer"]}),e.jsx("button",{onClick:()=>{n("amount"),y(""),q(null),H(null),J(""),j(!1),T("")},className:"deposit-step-secondary flex-1 py-3 text-sm",children:"Nouvelle recharge"})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(Y,{className:"w-10 h-10 text-[#D40030] animate-spin",style:{animationDuration:"2s"}})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"En attente de confirmation"}),e.jsxs("p",{className:"text-sm text-gray-500 mt-2",children:["Une demande de paiement de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]})," a été envoyée sur votre téléphone.",e.jsx("br",{}),"Acceptez-la sur votre téléphone. Cette page se met à jour automatiquement."]})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[e.jsx(I,{href:"/history",className:"flex-1",children:e.jsx("button",{className:"deposit-step-secondary w-full py-3 text-sm",children:"Voir l'historique"})}),e.jsx("button",{onClick:()=>{n("amount"),y(""),q(null),H(null),J(""),j(!1),T("")},className:"deposit-step-secondary flex-1 py-3 text-sm",children:"Nouvelle recharge"})]})]})})]}):null}export{hs as default};

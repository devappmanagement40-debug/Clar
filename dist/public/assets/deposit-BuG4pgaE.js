import{e as nt,a as $t,b as Ut,N as qt,r,c as L,j as e,L as I,f as k,F as Vt}from"./index-BQQllbY8.js";import{u as z}from"./useMutation-BBRL6X-O.js";import{C as _t}from"./country-selector-9oUk7a0Q.js";import{b as Wt}from"./countries-DAZFxsmo.js";import{w as Kt,s as h}from"./wave-payment-link-CLmsyqTR.js";import{r as Gt,b as Yt,D as Qt}from"./platform-settings-DMS0Jhov.js";import{C as Bt}from"./coins-BF8Ohn1m.js";import{C as j}from"./chevron-left-Q4XgkEdG.js";import{C as Ht,I as Jt,Z as Zt}from"./zap-B3z32oky.js";import{G as Xt}from"./gift-Dpuej1FK.js";import{W as es}from"./wallet-B7J-Dxnm.js";import{C as ts}from"./credit-card-vId3amKO.js";import{C as ss}from"./chevron-down-BT7qNCZy.js";import{P as ne,E as T}from"./phone-BPyv--Gf.js";import{L as v}from"./loader-circle-BPRXCXK7.js";import{R as G}from"./refresh-cw-Dl-1bypS.js";import"./x-VxduSZCe.js";import"./search-H0RfirWV.js";const Y=nt("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);const rs=nt("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),N="#1947b8",ie="#12358f",u=`linear-gradient(112deg, ${N} 0%, ${ie} 100%)`,at="soleaspay-pending-deposit",as=`
  .deposit-step-shell {
    min-height: 100dvh;
    max-width: 512px;
    margin: 0 auto;
    overflow: hidden;
    background: #f6f8ff;
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
    background: #f6f8ff;
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
    color: ${ie};
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
    border-color: ${N};
    background: #edf2ff;
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
    background: ${N} !important;
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
    background: #edf2ff;
  }
  .deposit-step-shell .deposit-step-icon svg {
    color: ${N};
  }
  .deposit-step-shell .deposit-step-operator {
    border: 2px solid #d1d5db !important;
    border-radius: 12px !important;
    background: #fff !important;
  }
  .deposit-step-shell .deposit-step-operator-selected {
    border-color: ${N} !important;
    background: #edf2ff !important;
  }
  .deposit-step-shell .deposit-step-otp {
    border: 2px solid #111827 !important;
    border-radius: 12px !important;
    background: #fff !important;
  }
  .deposit-step-shell [class*="text-[#D40030]"],
  .deposit-step-shell [class*="text-[#A60026]"],
  .deposit-step-shell [class*="border-[#D40030]"],
  .deposit-step-shell [class*="hover:border-[#D40030]"],
  .deposit-step-shell [class*="focus:border-[#D40030]"] {
    color: #1947b8 !important;
    border-color: #1947b8 !important;
  }
  .deposit-step-shell [class*="bg-[#D40030]"] {
    background-color: #1947b8 !important;
  }
  .deposit-step-shell [class*="bg-[#FFF0F3]"],
  .deposit-step-shell [class*="hover:bg-[#FFF0F3]"] {
    background-color: #edf2ff !important;
  }
  @media (max-width: 360px) {
    .deposit-step-shell .deposit-step-header { padding-right: 12px; padding-left: 12px; }
    .deposit-step-shell .deposit-step-content { padding: 12px; }
    .deposit-step-shell .deposit-step-back { font-size: 14px; }
  }
`;function f(){return e.jsx("style",{children:as})}function Os(){const{user:m,refreshUser:Q}=$t(),{toast:i}=Ut(),F=qt(),ke=r.useRef(null),[c,n]=r.useState("amount"),[l,it]=r.useState(null),[x,Ce]=r.useState(""),[ns,is]=r.useState(null),[o,g]=r.useState(""),[w,Pe]=r.useState(""),[Ie,ze]=r.useState(!1),[oe,Me]=r.useState(m?.phone||""),[M,De]=r.useState(""),[ot,Ee]=r.useState(""),[Oe,Ae]=r.useState(""),[Le,Te]=r.useState(""),[D,ct]=r.useState(m?.country||""),[ce,lt]=r.useState(""),[b,R]=r.useState(null),[B,H]=r.useState(null),[le,J]=r.useState(""),[dt,de]=r.useState(""),[pe,me]=r.useState(""),[Fe,pt]=r.useState(""),[os,mt]=r.useState(""),[xt,ut]=r.useState(""),[Re,$]=r.useState(""),[$e,y]=r.useState(!1),[U,xe]=r.useState(null),[C,Z]=r.useState(""),[ht,ft]=r.useState(""),[Ue,X]=r.useState(!1),[ue,gt]=r.useState(m?.country||""),[ee,bt]=r.useState(""),[q,qe]=r.useState(""),[V,te]=r.useState(null),[he,Ve]=r.useState(""),[fe,_e]=r.useState(""),[cs,We]=r.useState(""),[yt,jt]=r.useState(""),[ls,se]=r.useState(""),[Ke,_]=r.useState(!1),p=w,{data:Ge,isError:re}=L({queryKey:["/api/countries"]}),Ye=Wt(Ge,re),E=Ye.find(t=>t.code===p&&t.isActive),d=E?.currency||"FCFA",{data:vt,isFetching:ge}=L({queryKey:["/api/settings"],...Vt}),{data:Nt,isLoading:be,isError:Qe}=L({queryKey:["/api/deposit/methods",p],queryFn:async()=>{const t=await fetch(`/api/deposit/methods/${encodeURIComponent(p)}`,{credentials:"include"}),s=await t.json();if(!t.ok)throw new Error(s.message||"Impossible de charger les moyens de dépôt");return s},enabled:!!p}),P=Nt?.methods||[],Be=new Set(P.map(t=>t.provider)),wt=P.map(t=>t.provider).join(",");r.useEffect(()=>{P.length===1?Ce(P[0].provider):Ce("")},[p,wt]);const O=Gt(vt?.minDeposit,Qt),St=Yt,He=Be.has("ashtech"),Je={CI:0,NE:1},W=Ye.filter(t=>t.isActive).sort((t,s)=>(Je[t.code.toUpperCase()]??2)-(Je[s.code.toUpperCase()]??2));r.useEffect(()=>{if(w)return;const t=String(m?.country||"").toUpperCase(),s=W.find(a=>a.code.toUpperCase()===t);s&&Pe(s.code)},[w,Ge,re,m?.country]);const kt=He?[p.toUpperCase()]:[],{data:ds=[],isLoading:ps}=L({queryKey:["/api/payment-numbers",p],queryFn:async()=>{const t=await fetch(`/api/payment-numbers?country=${p}`,{credentials:"include"});if(!t.ok)throw new Error("Impossible de charger les numéros de paiement");return t.json()},enabled:!!p}),{data:Ct,isLoading:Pt}=L({queryKey:["/api/sendavapay/operators",D],queryFn:async()=>{const t=await fetch(`/api/sendavapay/operators/${D}`,{credentials:"include"});if(!t.ok)throw new Error("Impossible de charger les opérateurs SendavaPay");return t.json()},enabled:c==="sv-operator"&&!!D}),Ze=(Ct?.data||[]).filter(t=>t.status==="online"),{data:It=[],isLoading:zt}=L({queryKey:["/api/ashtechpay/countries"],queryFn:async()=>{const t=await fetch("/api/ashtechpay/countries",{credentials:"include"});if(!t.ok)throw new Error("Impossible de charger les opérateurs");return t.json()},enabled:c==="ashtech-operator"&&He}),Xe=It.filter(t=>W.some(s=>s.code.toUpperCase()===t.code.toUpperCase())&&kt.includes(t.code.toUpperCase())),et=Xe.find(t=>t.code===ue)?.operators||[];r.useEffect(()=>{if(c!=="sv-waiting"||!B||!$e)return;const t=setInterval(async()=>{try{const a=await(await fetch(`/api/deposits/${B}/sendavapay-status`,{credentials:"include"})).json();$(a.status),a.status==="approved"?(clearInterval(t),y(!1),i({title:"Paiement confirmé !",description:"Votre solde a été crédité."}),Q(),F.invalidateQueries({queryKey:["/api/deposits/history"]}),n("amount"),g(""),R(null),H(null),J(""),de(""),me(""),$("")):a.status==="rejected"&&(clearInterval(t),y(!1),i({title:"Paiement échoué",description:"Le paiement a été refusé ou annulé.",variant:"destructive"}),n("sv-operator"))}catch{}},5e3);return()=>clearInterval(t)},[c,B,$e]),r.useEffect(()=>{if(c!=="ashtech-waiting"||!V||!Ke)return;const t=setInterval(async()=>{try{const a=await(await fetch(`/api/deposits/${V}/ashtechpay-status`,{credentials:"include"})).json();se(a.status),a.status==="approved"?(clearInterval(t),_(!1),i({title:"Paiement confirmé !",description:"Votre solde a été crédité."}),Q(),F.invalidateQueries({queryKey:["/api/deposits/history"]}),n("amount"),g(""),te(null),se("")):a.status==="rejected"&&(clearInterval(t),_(!1),i({title:"Paiement échoué",description:"Le paiement a été refusé ou annulé.",variant:"destructive"}),n("ashtech-operator"))}catch{}},5e3);return()=>clearInterval(t)},[c,V,Ke]),r.useEffect(()=>{const t=new URLSearchParams(window.location.search),s=t.get("soleaspayReturn");if(s!=="success"&&s!=="failure")return;const a=t.get("orderId");let S=!1;try{const ae=sessionStorage.getItem(at),we=ae?JSON.parse(ae):null,Se=Number(we?.depositId),Rt=typeof we?.orderId=="string"?we.orderId:"";Number.isInteger(Se)&&Se>0&&(!a||Rt===a)&&(xe(Se),Z("pending"),ft(s==="success"?"Retour du paiement reçu. Vérification en cours...":"Retour du paiement reçu. Vérification de l'état final..."),X(!0),n("soleaspay-waiting"),S=!0)}catch(ae){console.warn("[soleaspay] Could not resume pending deposit:",ae)}S||i({title:"Retour du paiement reçu",description:"Consultez l'historique des dépôts pour vérifier le statut du paiement."}),t.delete("soleaspayReturn"),t.delete("orderId");const rt=t.toString();window.history.replaceState({},"",`${window.location.pathname}${rt?`?${rt}`:""}${window.location.hash}`)},[i]),r.useEffect(()=>{if(c!=="soleaspay-waiting"||!U||!Ue)return;const t=setInterval(async()=>{try{const s=await fetch(`/api/deposits/${U}/verify`,{credentials:"include"}),a=await s.json();if(!s.ok)throw new Error(a.message||"Vérification SoleaPay impossible");if(a.status&&Z(a.status),a.status==="approved"||a.status==="rejected"){clearInterval(t),X(!1);try{sessionStorage.removeItem(at)}catch{}a.status==="approved"&&(i({title:"Paiement confirmé !",description:"Votre solde a été crédité."}),Q(),F.invalidateQueries({queryKey:["/api/deposits/history"]}))}}catch{}},5e3);return()=>clearInterval(t)},[c,U,Ue]);const Mt=t=>{const s=t.target.files?.[0];if(!s)return;if(s.size>5*1024*1024){i({title:"Fichier trop grand",description:"Maximum 5 Mo",variant:"destructive"});return}Ee(s.name);const a=new FileReader;a.onload=S=>De(S.target?.result),a.readAsDataURL(s)},ye=z({mutationFn:async()=>{if(!l)throw new Error("Aucun numéro sélectionné");const t=await k("POST","/api/deposits",{amount:Number(o),accountName:m?.fullName||"",accountNumber:oe,paymentMethod:l.operatorName,country:p,paymentNumberId:l.id,channelName:l.paymentLink?`${l.operatorName} - Lien de paiement`:`${l.operatorName} - ${l.phone}`,screenshot:M||null,paymentMessage:Oe||null,reference:Le||null});if(!t.ok){const s=await t.json();throw new Error(s.message||"Dépôt non enregistré")}return t.json()},onSuccess:()=>{i({title:"Demande envoyée !",description:"Votre dépôt est en attente de validation"}),F.invalidateQueries({queryKey:["/api/deposits/history"]}),Q(),n("amount"),it(null),g(""),Me(m?.phone||""),De(""),Ee(""),Ae(""),Te("")},onError:t=>i({title:"Dépôt non enregistré",description:h(t.message,"Impossible d’enregistrer le dépôt."),variant:"destructive"})}),[xs,Dt]=r.useState(null),[us,Et]=r.useState("");r.useEffect(()=>{const t=new URLSearchParams(window.location.search),s=t.get("wp_status"),a=t.get("wp_depositId");s&&(Et(s),a&&Dt(parseInt(a)),window.history.replaceState({},"","/deposit"),s==="success"&&(i({title:"Paiement en cours de confirmation",description:"Votre dépôt sera crédité dès confirmation."}),F.invalidateQueries({queryKey:["/api/deposits/history"]})))},[]);const K=z({mutationFn:async()=>{const t=await k("POST","/api/deposits",{amount:Number(o),accountName:m?.fullName||"",accountNumber:m?.phone||"",paymentMethod:"WestPay",country:p,useWestpay:!0});if(!t.ok){const s=await t.json();throw new Error(s.message||"Dépôt non enregistré")}return t.json()},onSuccess:t=>{t.westpayUrl&&(window.location.href=t.westpayUrl)},onError:t=>i({title:"Dépôt non enregistré",description:h(t.message,"Impossible d’enregistrer le dépôt."),variant:"destructive"})}),tt=z({mutationFn:async()=>{const t=await k("POST","/api/deposits",{amount:Number(o),accountName:m?.fullName||"",accountNumber:m?.phone||"",paymentMethod:"InPay",country:p,useInpay:!0});if(!t.ok){const s=await t.json();throw new Error(s.message||"Dépôt non enregistré")}return t.json()},onSuccess:t=>{t.inpayUrl&&(window.location.href=t.inpayUrl)},onError:t=>i({title:"Dépôt non enregistré",description:h(t.message,"Impossible d’enregistrer le dépôt."),variant:"destructive"})}),A=z({mutationFn:async t=>{if(!q||!ee.trim())throw new Error("Sélectionnez un opérateur et saisissez votre numéro");const s=await k("POST","/api/ashtechpay/collect",{amount:Number(o),country:ue,operator:q,phone:ee.trim(),depositId:V||void 0,otp:t||void 0});if(!s.ok){const a=await s.json();throw new Error(a.message||"Dépôt non enregistré")}return s.json()},onSuccess:t=>{te(t.depositId),We(h(t.message,"")),_e(t.ussdCode||""),t.waveUrl?(jt(t.waveUrl),n("ashtech-redirect")):t.requiresOtp?n("ashtech-otp"):(_(!0),se(t.status||"pending"),n("ashtech-waiting"))},onError:t=>{if(t.data?.requiresOtp){te(t.data.depositId||V),_e(t.data.ussdCode||""),We(h(t.message,"Composez le code indiqué puis saisissez le code OTP.")),Ve(""),n("ashtech-otp");return}i({title:"Dépôt non enregistré",description:h(t.message,"Impossible d’enregistrer le dépôt."),variant:"destructive"})}}),je=z({mutationFn:async()=>{if(!b)throw new Error("Sélectionnez un opérateur");const t=await k("POST","/api/sendavapay/create",{amount:Number(o),country:D,operatorId:b.id,operatorName:b.name,payerPhone:ce});if(!t.ok){const S=await t.json();throw new Error(S.message||"Création du paiement impossible")}const s=await t.json();H(s.depositId),J(s.paymentToken);const a=await k("POST","/api/sendavapay/initiate",{paymentToken:s.paymentToken,payerCountry:D,operatorId:b.id,depositId:s.depositId,payerPhone:ce});if(!a.ok){const S=await a.json();throw new Error(S.message||"Initiation du paiement impossible")}return a.json()},onSuccess:t=>{const s=b?.name?.toLowerCase().includes("wave");t.requiresRedirect&&t.redirectUrl&&s?(ut(t.redirectUrl),n("sv-redirect")):t.requiresRedirect&&!s?(y(!0),n("sv-waiting")):t.requiresOtp&&t.otpToken?(de(t.otpToken),pt(t.ussdCode||""),mt(h(t.message,"")),n("sv-otp")):t.success?(y(!0),n("sv-waiting")):i({title:"Paiement impossible",description:h(t.error||t.message,"Le paiement n'a pas pu être initié."),variant:"destructive"})},onError:t=>i({title:"Paiement impossible",description:h(t.message,"Le paiement n'a pas pu être initié."),variant:"destructive"})}),ve=z({mutationFn:async()=>{if(!le)throw new Error("Token de paiement manquant");const t=await k("POST","/api/sendavapay/retry",{paymentToken:le,depositId:B});if(!t.ok){const s=await t.json();throw new Error(s.message||"Nouvelle tentative impossible")}return t.json()},onSuccess:()=>{me(""),de(""),$(""),y(!1),n("sv-operator"),i({title:"Prêt à réessayer",description:"Sélectionnez un opérateur et relancez le paiement."})},onError:t=>i({title:"Nouvelle tentative impossible",description:h(t.message,"Réessayez dans quelques instants."),variant:"destructive"})}),Ne=z({mutationFn:async()=>{const t=await k("POST","/api/sendavapay/submit-otp",{otpToken:dt,otp:pe});if(!t.ok){const s=await t.json();throw new Error(s.message||"Validation du code OTP impossible")}return t.json()},onSuccess:()=>{y(!0),n("sv-waiting")},onError:t=>i({title:"Validation du code OTP impossible",description:h(t.message,"Vérifiez le code puis réessayez."),variant:"destructive"})}),Ot=()=>{if(!o||Number(o)<O){i({title:"Montant invalide",description:`Le minimum est de ${O.toLocaleString()} ${d}`,variant:"destructive"});return}if(x==="inpay"&&(!Number.isInteger(Number(o))||Number(o)%5!==0)){i({title:"Montant invalide",description:"Utilisez un montant entier multiple de 5 : 300, 305, 310…",variant:"destructive"});return}At()},At=()=>{if(!w){i({title:"Pays requis",description:"Sélectionnez le pays du paiement.",variant:"destructive"});return}if(!x||!Be.has(x)){i({title:"Moyen de dépôt requis",description:be?"Chargement des moyens disponibles...":"Aucun moyen de dépôt n’est configuré pour ce pays.",variant:"destructive"});return}if(x==="soleaspay"||x==="ashtech"||x==="sendavapay"||x==="manual"||x==="clapay"){window.location.href=`/robotpay?amount=${encodeURIComponent(Number(o))}&country=${encodeURIComponent(w)}&provider=${encodeURIComponent(x)}`;return}if(x==="inpay"){if(!Number.isInteger(Number(o))||Number(o)%5!==0){i({title:"Montant invalide",description:"Utilisez un montant entier multiple de 5 : 300, 305, 310…",variant:"destructive"});return}tt.mutate();return}if(x==="westpay"){K.mutate();return}},Lt=t=>{const s=t.toLowerCase();return s.includes("tmoney")||s.includes("t-money")?"/operators/tmoney.png":s.includes("moov")?p.toUpperCase()==="TG"?"/operators/moov-money-togo.webp":"/operators/moov.jpg":s.includes("orange")?"/operators/orange.png":s.includes("mtn")?"/operators/mtn.png":s.includes("airtel")?"/operators/airtel.png":s.includes("wave")?"/operators/wave.png":null},Tt=()=>{if(!oe.trim()){i({title:"Numéro requis",description:"Entrez le numéro depuis lequel vous avez payé",variant:"destructive"});return}if(!M){i({title:"Capture requise",description:"Veuillez joindre la capture d'écran du paiement",variant:"destructive"});return}ye.mutate()};if(!m)return null;const st=Number.parseFloat(m.depositBalance||"0"),Ft=Math.round(Number.isFinite(st)?st:0);return c==="amount"?e.jsxs("main",{className:"recharge-reference min-h-screen bg-white",children:[e.jsx("style",{children:`
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
          background: #edf2ff;
          color: ${ie};
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
          color: ${ie};
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
          background: #f6f8ff;
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
          color: ${N};
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
        .recharge-reference .preset:disabled {
          cursor: not-allowed;
          opacity: 0.42;
          box-shadow: none;
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
          border-top: 5px solid ${N};
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
          color: ${N};
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
          background: ${N};
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
        .recharge-reference {
          background: #f7f6f2;
          color: #18233b;
          font-family: "DM Sans", "Avenir Next", system-ui, sans-serif;
        }
        .recharge-reference .recharge-screen {
          max-width: 512px;
          padding-bottom: max(18px, env(safe-area-inset-bottom));
          background: #f7f6f2;
        }
        .recharge-reference .recharge-hero {
          height: 64px;
          background: #12358f;
          border: 0;
          color: #fff;
        }
        .recharge-reference .recharge-title { color: #fff; font-size: 19px; font-weight: 750; }
        .recharge-reference .history-button,
        .recharge-reference .recharge-back {
          top: 11px;
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 50%;
          background: rgb(255 255 255 / 13%);
          color: #fff;
          box-shadow: none;
        }
        .recharge-reference .history-button:active,
        .recharge-reference .recharge-back:active {
          background: rgb(255 255 255 / 22%);
          color: #fff;
          box-shadow: none;
        }
        .recharge-reference .deposit-intro {
          position: relative;
          display: flex;
          min-height: 118px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin: 18px 18px 0;
          padding: 23px 19px 35px;
          overflow: hidden;
          border-radius: 22px 22px 12px 12px;
          background: linear-gradient(125deg, #1947b8 0%, #12358f 100%);
          color: #fff;
        }
        .recharge-reference .deposit-intro-copy {
          position: relative;
          z-index: 1;
          margin: 0;
          max-width: 270px;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.45;
        }
        .recharge-reference .deposit-intro-icon {
          flex: 0 0 auto;
          width: 42px;
          height: 42px;
          margin-top: 1px;
          color: #dce7ff;
          opacity: .92;
        }
        .recharge-reference .account-summary {
          position: relative;
          z-index: 2;
          min-height: 106px;
          justify-content: center;
          margin: -7px 18px 0;
          padding: 18px 16px;
          border: 0;
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 8px 24px rgb(27 46 89 / 7%);
          text-align: center;
        }
        .recharge-reference .balance-value {
          display: inline;
          color: #c58220;
          font-size: 23px;
          font-weight: 800;
          letter-spacing: -.03em;
        }
        .recharge-reference .balance-label {
          display: inline;
          margin: 0 7px 0 0;
          color: #777b83;
          font-size: 16px;
        }
        .recharge-reference .country-chip { display: none; }
        .recharge-reference .amount-panel {
          margin: 22px 18px 0;
          padding: 17px 16px 16px;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 5px 20px rgb(27 46 89 / 4%);
        }
        .recharge-reference .amount-label {
          display: flex;
          align-items: center;
          margin: 0 0 12px;
          padding-bottom: 11px;
          border-bottom: 1px solid #e8e8e6;
          color: #252a32;
          font-size: 16px;
          font-weight: 750;
        }
        .recharge-reference .amount-heading-icon { flex: none; width: 20px; height: 20px; margin-right: 9px; color: #1947b8; }
        .recharge-reference .preset-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 7px;
          margin: 0 0 10px;
          overflow: visible;
        }
        .recharge-reference .preset {
          min-width: 0;
          min-height: 48px;
          border: 1px solid #d5d7db;
          border-radius: 10px;
          background: #fff;
          color: #30343b;
          font-size: 15px;
          font-weight: 600;
          box-shadow: none;
        }
        .recharge-reference .preset.active {
          border-color: #1947b8;
          background: #1947b8;
          color: #fff;
          box-shadow: 0 3px 9px rgb(25 71 184 / 20%);
        }
        .recharge-reference .amount-input {
          height: 52px;
          border: 1px solid #d5d7db;
          border-radius: 10px;
          background: #fff;
        }
        .recharge-reference .amount-input:focus-within {
          border-color: #1947b8;
          box-shadow: 0 0 0 3px rgb(25 71 184 / 12%);
        }
        .recharge-reference .amount-input input { font-size: 16px; }
        .recharge-reference .currency {
          padding: 0 13px;
          border: 0;
          color: #4c5361;
          font-size: 15px;
          font-weight: 700;
        }
        .recharge-reference .country-panel {
          margin: 16px 18px 0;
          padding: 16px;
          border-radius: 17px;
          background: #fff;
          box-shadow: 0 5px 20px rgb(27 46 89 / 4%);
        }
        .recharge-reference .country-heading {
          margin: 0 0 10px;
          color: #292e37;
          font-size: 15px;
          font-weight: 750;
        }
        .recharge-reference .country-options {
          display: block;
        }
        .recharge-reference .country-select {
          display: flex;
          width: 100%;
          min-height: 52px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 14px;
          border: 1px solid #d5d7db;
          border-radius: 10px;
          outline: 0;
          background: #fff;
          color: #454a53;
          font: inherit;
          font-size: 15px;
          text-align: left;
          cursor: pointer;
          transition: border-color .16s ease, box-shadow .16s ease;
        }
        .recharge-reference .country-select:focus-visible {
          border-color: #1947b8;
          box-shadow: 0 0 0 3px rgb(25 71 184 / 12%);
        }
        .recharge-reference .country-select-prefix {
          margin-left: auto;
          color: #1947b8;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }
        .recharge-reference .country-select svg { flex: none; color: #6b7280; }
        .recharge-reference .continue {
          width: calc(100% - 36px);
          min-height: 58px;
          margin: 17px 18px 0;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(112deg, #1947b8 0%, #12358f 100%);
          color: #fff;
          font-size: 16px;
          font-weight: 750;
          box-shadow: 0 5px 13px rgb(18 53 143 / 20%);
        }
        .recharge-reference .continue:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: 0 2px 6px rgb(18 53 143 / 20%);
        }
        .recharge-reference .continue:disabled { opacity: .5; }
        .recharge-reference .instructions {
          margin: 17px 18px 20px;
          padding: 16px 15px 5px;
          border: 0;
          border-radius: 17px;
          background: #fff;
          color: #444a54;
          box-shadow: 0 5px 20px rgb(27 46 89 / 4%);
        }
        .recharge-reference .instructions-title {
          margin: 0 0 12px;
          font-size: 16px;
          font-weight: 800;
        }
        .recharge-reference .instructions-title::before {
          content: "!";
          display: inline-grid;
          width: 19px;
          height: 19px;
          place-items: center;
          margin-right: 8px;
          border-radius: 50%;
          background: #1947b8;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
        }
        .recharge-reference .instruction {
          margin: 0 0 12px 0;
          padding-left: 0;
          font-size: 14px;
          line-height: 1.55;
        }
        .recharge-reference .instruction::before { display: none; }
        .recharge-reference .instruction strong { color: #303640; }
        @media (max-width: 360px) {
          .recharge-reference .deposit-intro,
          .recharge-reference .account-summary,
          .recharge-reference .amount-panel,
          .recharge-reference .country-panel,
          .recharge-reference .instructions { margin-right: 12px; margin-left: 12px; }
          .recharge-reference .continue { width: calc(100% - 24px); margin-right: 12px; margin-left: 12px; }
          .recharge-reference .preset { font-size: 13px; }
        }
      `}),e.jsxs("div",{className:"recharge-screen",children:[e.jsxs("header",{className:"recharge-hero","aria-label":"Dépôt",children:[e.jsxs("h1",{className:"recharge-title",children:[e.jsx(Bt,{className:"inline-block h-5 w-5 align-[-3px]","aria-hidden":"true"}),e.jsx("span",{className:"ml-2",children:"Recharger"})]}),e.jsx(I,{href:"/account",className:"recharge-back","aria-label":"Retour",children:e.jsx(j,{className:"h-6 w-6",strokeWidth:2.6,"aria-hidden":"true"})}),e.jsx(I,{href:"/deposits-history",className:"history-button","aria-label":"Historique des dépôts",children:e.jsx(Ht,{className:"h-6 w-6",strokeWidth:2.4,"aria-hidden":"true"})})]}),e.jsxs("section",{className:"deposit-intro","aria-label":"Minimum de dépôt",children:[e.jsxs("p",{className:"deposit-intro-copy",children:["Recharge minimum : ",ge?"Actualisation…":`${O.toLocaleString("fr-FR")} ${d}`]}),e.jsx(Xt,{className:"deposit-intro-icon",strokeWidth:1.8,"aria-hidden":"true"})]}),e.jsxs("section",{className:"account-summary","aria-label":"Solde et pays du compte",children:[e.jsxs("div",{children:[e.jsx("p",{className:"balance-label",children:"Solde du compte :"}),e.jsxs("p",{className:"balance-value",children:[Ft.toLocaleString("fr-FR")," ",d]})]}),e.jsxs("div",{className:"country-chip","aria-live":"polite",children:[e.jsx(es,{className:"country-chip-icon h-5 w-5",strokeWidth:2.4,"aria-hidden":"true"}),e.jsx("span",{className:"country-chip-name",children:E?.name||"Sélectionnez un pays"})]})]}),e.jsxs("section",{className:"amount-panel","aria-label":"Montant de recharge",children:[e.jsxs("p",{className:"amount-label",children:[e.jsx(ts,{className:"amount-heading-icon",strokeWidth:2.2,"aria-hidden":"true"}),e.jsx("span",{children:"Sélectionner le montant de recharge"})]}),e.jsx("div",{className:"preset-row",children:St.map(t=>e.jsx("button",{type:"button",className:`preset ${o===t?"active":""}`,disabled:t<O,"aria-label":`${t.toLocaleString("fr-FR")} ${d}${t<O?" - inférieur au minimum":""}`,onClick:()=>g(t),children:t.toLocaleString("fr-FR")},t))}),e.jsxs("label",{className:"amount-input",children:[e.jsx("span",{className:"currency",children:d}),e.jsx("input",{type:"number",inputMode:"numeric",value:o,onChange:t=>g(t.target.value?Number(t.target.value):""),placeholder:"Veuillez saisir le montant","aria-label":"Montant de recharge"})]})]}),e.jsxs("section",{className:"country-panel","aria-label":"Pays et institutions de recharge",children:[e.jsx("h2",{className:"country-heading",children:"Pays du paiement"}),e.jsx("div",{className:"country-options",children:e.jsxs("button",{type:"button",className:"country-select",onClick:()=>ze(!0),"aria-label":`Pays du paiement : ${E?.name||"sélectionner un pays"}`,"aria-haspopup":"dialog","aria-expanded":Ie,"data-testid":"button-select-deposit-country",children:[e.jsx("span",{children:E?.name||"Sélectionnez un pays"}),E?.phonePrefix&&e.jsxs("span",{className:"country-select-prefix",children:["+",E.phonePrefix]}),e.jsx(ss,{className:"h-4 w-4","aria-hidden":"true"})]})}),W.length===0&&!re&&e.jsx("p",{className:"text-sm text-gray-600",children:"Aucun pays de dépôt n’est disponible pour le moment."}),re&&e.jsx("p",{className:"mt-2 text-xs text-amber-700",children:"Liste locale temporaire affichée."}),w&&!be&&(Qe||P.length===0||P.length>1)&&e.jsx("p",{role:"alert",className:"mt-2 text-sm text-red-700",children:Qe?"Impossible de vérifier les options de paiement pour ce pays.":P.length>1?"Plusieurs options de paiement sont configurées pour ce pays. Contactez le service client.":"Aucune option de paiement n’est disponible pour ce pays."})]}),e.jsx("button",{className:"continue",onClick:Ot,disabled:!w||ge||be||!x||tt.isPending||K.isPending,children:"Recharger"}),e.jsxs("section",{className:"instructions","aria-label":"Bon à savoir",children:[e.jsx("h2",{className:"instructions-title",children:"Rappel important"}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Montant minimum de recharge :"})," ",ge?"Actualisation…":`${O.toLocaleString("fr-FR")} ${d}`]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Vérifiez attentivement vos informations de compte"})," lors du virement pour que votre paiement soit traité correctement"]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Chaque commande possède ses propres informations de paiement"})," ; ne réutilisez pas les informations précédentes pour un second paiement"]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Après un virement réussi,"})," veuillez patienter 10 à 30 minutes."]})]}),e.jsx(_t,{open:Ie,onClose:()=>ze(!1),onSelect:Pe,selectedCountryCode:w,allowedCountryCodes:W.map(t=>t.code)})]})]}):c==="form"&&l?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{className:"deposit-step-back",onClick:()=>n("amount"),children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Confirmer le paiement"})]})}),e.jsxs("div",{className:"deposit-step-content space-y-4 pb-10",children:[e.jsxs("div",{className:"deposit-step-card deposit-step-card-accent p-4 flex items-center gap-3",children:[l.logoUrl?e.jsx("img",{src:l.logoUrl,alt:l.operatorName,className:"w-10 h-10 rounded-lg object-contain"}):e.jsx("div",{className:"w-10 h-10 rounded-lg bg-white flex items-center justify-center border-2 border-[#D40030]",children:e.jsx(ne,{className:"w-5 h-5 text-[#D40030]"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-xs text-gray-500",children:l.paymentLink?"Lien de paiement":"Numéro destinataire"}),l.paymentLink?e.jsxs("a",{href:Kt(l.paymentLink,Number(o),p)||l.paymentLink,target:"_blank",rel:"noreferrer",className:"mt-1 flex items-center gap-1 text-sm font-bold text-[#A60026] underline",children:[e.jsx(T,{className:"h-4 w-4"})," Ouvrir le lien de paiement"]}):e.jsxs("p",{className:"font-bold text-[#A60026] text-sm",children:[l.operatorName," — ",l.phone]}),e.jsx("p",{className:"text-xs text-gray-500",children:l.ownerName})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant"}),e.jsxs("p",{className:"font-bold text-gray-800",children:[Number(o).toLocaleString()," ",d]})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Votre numéro payeur"}),e.jsxs("div",{className:"deposit-step-field flex items-center overflow-hidden",children:[e.jsx(ne,{className:"w-4 h-4 text-gray-400 ml-4"}),e.jsx("input",{type:"tel",value:oe,onChange:t=>Me(t.target.value),placeholder:"Numéro depuis lequel vous avez payé",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Référence / ID transaction ",e.jsx("span",{className:"text-gray-400 font-normal",children:"(optionnel)"})]}),e.jsx("input",{type:"text",value:Le,onChange:t=>Te(t.target.value),placeholder:"Numéro de référence de la transaction",className:"deposit-step-field w-full px-4 py-4 text-sm text-gray-700 outline-none"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Message reçu après paiement ",e.jsx("span",{className:"text-gray-400 font-normal",children:"(optionnel)"})]}),e.jsx("textarea",{value:Oe,onChange:t=>Ae(t.target.value),placeholder:"Collez ici le SMS ou message de confirmation reçu...",rows:3,className:"deposit-step-field w-full px-4 py-3 text-sm text-gray-700 outline-none resize-none"})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:["Capture d'écran du paiement ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{ref:ke,type:"file",accept:"image/*",onChange:Mt,className:"hidden"}),e.jsx("button",{onClick:()=>ke.current?.click(),className:`w-full border-2 border-dashed rounded-xl py-7 flex flex-col items-center gap-2 transition-colors ${M?"border-[#D40030] bg-[#FFF0F3]":"border-gray-300 bg-gray-50 hover:border-[#D40030] hover:bg-[#FFF0F3]"}`,children:M?e.jsxs(e.Fragment,{children:[e.jsx(Y,{className:"w-8 h-8 text-[#D40030]"}),e.jsx("p",{className:"text-sm font-medium text-[#A60026]",children:ot}),e.jsx("p",{className:"text-xs text-gray-400",children:"Appuyez pour changer"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Jt,{className:"w-8 h-8 text-gray-400"}),e.jsx("p",{className:"text-sm font-medium text-gray-600",children:"Appuyez pour ajouter la capture"}),e.jsx("p",{className:"text-xs text-gray-400",children:"JPG, PNG — max 5 Mo"})]})}),M&&e.jsx("div",{className:"mt-3 rounded-xl overflow-hidden border border-gray-100",children:e.jsx("img",{src:M,alt:"Capture",className:"w-full max-h-52 object-contain bg-gray-50"})})]}),e.jsx("button",{onClick:Tt,disabled:ye.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-50",style:{background:u},children:ye.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Envoi en cours..."]}):e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(rs,{className:"w-5 h-5"})," Soumettre ma demande"]})})]})]}):c==="westpay"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{className:"deposit-step-back",onClick:()=>n("amount"),children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Paiement Mobile Money"})]})}),e.jsxs("div",{className:"deposit-step-content space-y-5 pb-10",children:[e.jsxs("div",{className:"deposit-step-summary mx-0 p-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#A60026]",children:[Number(o).toLocaleString()," ",d]})]}),e.jsx("button",{onClick:()=>n("amount"),className:"text-xs text-[#A60026] underline",children:"Modifier"})]}),e.jsxs("div",{className:"deposit-step-card p-4 space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Zt,{className:"w-5 h-5 text-[#D40030]"}),e.jsx("p",{className:"font-semibold text-gray-900 text-sm",children:"Comment ça marche ?"})]}),e.jsxs("p",{className:"text-xs text-gray-600 leading-relaxed",children:["1. Cliquez sur ",e.jsx("strong",{children:"Continuer le paiement"})," — vous serez redirigé vers la page de paiement sécurisée."]}),e.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"2. Entrez votre numéro Mobile Money et validez le paiement USSD depuis votre téléphone."}),e.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"3. Après paiement, vous serez automatiquement redirigé ici. Votre solde est crédité après confirmation."})]}),e.jsx("button",{onClick:()=>K.mutate(),disabled:K.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40 flex items-center justify-center gap-2",style:{background:u},children:K.isPending?e.jsxs(e.Fragment,{children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Redirection en cours..."]}):e.jsxs(e.Fragment,{children:[e.jsx(T,{className:"w-5 h-5"})," Continuer le paiement"]})}),e.jsx("p",{className:"text-xs text-center text-gray-400",children:"Paiement sécurisé — USSD Mobile Money"})]})]}):c==="ashtech-operator"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsxs("header",{className:"deposit-step-header",children:[e.jsxs("button",{className:"deposit-step-back",onClick:()=>n("amount"),children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Paiement Mobile Money"})]}),e.jsx(I,{href:"/history",children:e.jsx("button",{className:"deposit-step-history",children:"Historique"})})]}),e.jsxs("div",{className:"deposit-step-summary mx-4 mt-4 p-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#A60026]",children:[Number(o).toLocaleString()," ",d]})]}),e.jsx("button",{onClick:()=>n("amount"),className:"text-xs text-[#A60026] underline",children:"Modifier"})]}),e.jsxs("div",{className:"deposit-step-content space-y-4 pb-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Pays"}),zt?e.jsx(v,{className:"w-6 h-6 animate-spin text-[#D40030] mx-auto"}):e.jsx("select",{value:ue,onChange:t=>{gt(t.target.value),qe("")},className:"deposit-step-field w-full px-4 py-4 text-sm text-gray-700 outline-none appearance-none",children:Xe.map(t=>e.jsxs("option",{value:t.code,children:[t.name," (",t.currency,")"]},t.code))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Numéro Mobile Money"}),e.jsxs("div",{className:"deposit-step-field flex items-center overflow-hidden",children:[e.jsx(ne,{className:"w-4 h-4 text-gray-400 ml-4 flex-shrink-0"}),e.jsx("input",{type:"tel",inputMode:"numeric",value:ee,onChange:t=>bt(t.target.value),placeholder:"Votre numéro Mobile Money",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Opérateur Mobile Money"}),et.length===0?e.jsx("p",{className:"text-sm text-gray-400 text-center py-5",children:"Aucun opérateur disponible pour ce pays"}):e.jsx("div",{className:"space-y-2",children:et.map((t,s)=>{const a=typeof t=="string"?t:t.name||t.code||`Opérateur ${s+1}`;return e.jsxs("button",{onClick:()=>qe(a),className:`deposit-step-operator w-full flex items-center justify-between px-4 py-4 ${q===a?"deposit-step-operator-selected":""}`,children:[e.jsx("span",{className:"font-semibold text-gray-900 text-sm",children:a}),q===a&&e.jsx(Y,{className:"w-5 h-5 text-[#D40030]"})]},`${a}-${s}`)})})]}),e.jsx("button",{onClick:()=>A.mutate(void 0),disabled:!q||!ee.trim()||A.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40",style:{background:u},children:A.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Initiation en cours..."]}):"Initier le paiement"})]})]}):c==="ashtech-otp"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{onClick:()=>n("ashtech-operator"),className:"deposit-step-back",children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{children:"Code OTP"})]})}),e.jsxs("div",{className:"deposit-step-content space-y-5 pb-10",children:[e.jsxs("div",{className:"deposit-step-card deposit-step-card-accent p-4",children:[e.jsx("p",{className:"font-bold text-gray-900 text-sm mb-2",children:"Code à composer"}),fe&&e.jsx("p",{className:"deposit-step-otp px-4 py-3 text-center font-mono font-black text-2xl text-[#A60026] tracking-widest",children:fe}),e.jsx("p",{className:"text-sm text-gray-600 mt-3",children:fe?"Composez ce code sur votre téléphone pour obtenir le code OTP, puis saisissez-le ci-dessous.":"Un code OTP vous a été envoyé. Saisissez-le ci-dessous."})]}),e.jsx("input",{type:"text",inputMode:"numeric",value:he,onChange:t=>Ve(t.target.value),maxLength:8,placeholder:"Code OTP reçu par SMS",className:"deposit-step-otp w-full px-4 py-4 text-center text-2xl tracking-widest font-black text-gray-800 outline-none focus:border-[#D40030]"}),e.jsx("button",{onClick:()=>A.mutate(he),disabled:!he.trim()||A.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40",style:{background:u},children:A.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Vérification..."]}):"Valider le code OTP"})]})]}):c==="ashtech-redirect"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{onClick:()=>n("ashtech-operator"),className:"deposit-step-back",children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{children:"Finaliser le paiement"})]})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(T,{className:"w-10 h-10 text-[#D40030]"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl mb-2",children:"Finaliser avec Wave"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Ouvrez la page Wave pour confirmer votre dépôt de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]}),"."]})]}),e.jsxs("a",{href:yt,target:"_blank",rel:"noopener noreferrer",onClick:()=>{_(!0),n("ashtech-waiting")},className:"deposit-step-primary w-full py-5 flex items-center justify-center gap-2",style:{background:u},children:[e.jsx(T,{className:"w-5 h-5"})," Ouvrir Wave"]})]})]}):c==="ashtech-waiting"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsx("span",{className:"font-semibold text-base text-gray-800",children:"Paiement en cours"})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(G,{className:"w-10 h-10 text-[#D40030] animate-spin",style:{animationDuration:"2s"}})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"En attente de confirmation"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"Validez le paiement sur votre téléphone. Cette page se met à jour automatiquement."})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[e.jsx(I,{href:"/history",className:"flex-1",children:e.jsx("button",{className:"deposit-step-secondary w-full py-3 text-sm",children:"Voir l'historique"})}),e.jsx("button",{onClick:()=>{n("amount"),g(""),te(null),_(!1),se("")},className:"deposit-step-secondary flex-1 py-3 text-sm",children:"Nouvelle recharge"})]})]})]}):c==="soleaspay-waiting"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsx("span",{className:"font-semibold text-base text-gray-800",children:"Paiement en cours"})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"deposit-step-icon",children:C==="approved"?e.jsx(Y,{className:"w-10 h-10 text-[#D40030]"}):e.jsx(G,{className:`w-10 h-10 ${C==="rejected"?"text-red-400":"text-[#D40030] animate-spin"}`})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:C==="approved"?"Paiement confirmé !":C==="rejected"?"Paiement échoué":"En attente de confirmation"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:C==="approved"?`Votre solde a été crédité de ${Number(o).toLocaleString()} ${d}.`:C==="rejected"?"Le paiement a été refusé ou annulé.":ht||"Validez la demande de paiement sur votre téléphone. Cette page se met à jour automatiquement."}),U&&e.jsxs("p",{className:"text-xs text-gray-400 mt-2",children:["Référence dépôt : #",U]})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[C==="rejected"?e.jsx("button",{onClick:()=>{xe(null),Z(""),X(!1),window.location.href=`/robotpay?amount=${encodeURIComponent(Number(o))}&country=${encodeURIComponent(p)}&provider=soleaspay`},className:"deposit-step-primary flex-1 py-3 text-sm",style:{background:u},children:"Réessayer"}):e.jsx(I,{href:"/history",className:"flex-1",children:e.jsx("button",{className:"deposit-step-secondary w-full py-3 text-sm",children:"Voir l'historique"})}),e.jsx("button",{onClick:()=>{n("amount"),g(""),xe(null),Z(""),X(!1)},className:"deposit-step-secondary flex-1 py-3 text-sm",children:"Nouvelle recharge"})]})]})]}):c==="sv-operator"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsxs("header",{className:"deposit-step-header",children:[e.jsxs("button",{className:"deposit-step-back",onClick:()=>n("amount"),children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Top up"})]}),e.jsx(I,{href:"/history",children:e.jsx("button",{className:"deposit-step-history",children:"Historique"})})]}),e.jsxs("div",{className:"deposit-step-summary mx-4 mt-4 p-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Montant à déposer"}),e.jsxs("p",{className:"text-xl font-bold text-[#A60026]",children:[Number(o).toLocaleString()," ",d]})]}),e.jsx("button",{onClick:()=>n("amount"),className:"text-xs text-[#A60026] underline",children:"Modifier"})]}),e.jsxs("div",{className:"deposit-step-content space-y-4 pb-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Pays"}),e.jsx("select",{value:D,onChange:t=>{ct(t.target.value),R(null)},className:"deposit-step-field w-full px-4 py-4 text-sm text-gray-700 outline-none appearance-none",children:W.map(t=>e.jsx("option",{value:t.code,children:t.name},t.code))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Numéro Mobile Money"}),e.jsxs("div",{className:"deposit-step-field flex items-center overflow-hidden",children:[e.jsx(ne,{className:"w-4 h-4 text-gray-400 ml-4 flex-shrink-0"}),e.jsx("input",{type:"tel",inputMode:"numeric",value:ce,onChange:t=>lt(t.target.value),placeholder:"Numéro sur lequel envoyer la demande",className:"flex-1 px-3 py-4 text-sm text-gray-700 outline-none bg-transparent"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Opérateur Mobile Money"}),Pt?e.jsx("div",{className:"flex items-center justify-center py-8",children:e.jsx(v,{className:"w-6 h-6 animate-spin text-[#D40030]"})}):Ze.length===0?e.jsx("div",{className:"text-center py-8 text-gray-400",children:e.jsx("p",{className:"text-sm",children:"Aucun opérateur disponible pour ce pays"})}):e.jsx("div",{className:"space-y-2",children:Ze.map(t=>{const s=Lt(t.name);return e.jsxs("button",{onClick:()=>R(t),className:`deposit-step-operator w-full flex items-center justify-between px-4 py-4 transition-all ${b?.id===t.id?"deposit-step-operator-selected":""}`,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[s?e.jsx("img",{src:s,alt:t.name,className:"w-10 h-10 rounded-full object-cover border border-gray-100"}):e.jsx("div",{className:`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${b?.id===t.id?"bg-[#D40030] text-white":"bg-gray-100 text-gray-600"}`,children:t.name.charAt(0)}),e.jsxs("div",{className:"text-left",children:[e.jsx("p",{className:"font-semibold text-gray-900 text-sm",children:t.name}),t.requiresOtp&&e.jsx("p",{className:"text-xs text-[#A60026]",children:"Code OTP requis"})]})]}),b?.id===t.id&&e.jsx(Y,{className:"w-5 h-5 text-[#D40030]"})]},t.id)})})]}),e.jsx("button",{onClick:()=>je.mutate(),disabled:!b||je.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40",style:{background:u},children:je.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Initiation en cours..."]}):e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx("img",{src:"/topup-icon.png",className:"w-6 h-6 object-contain",alt:"topup"})," Initier le paiement"]})})]})]}):c==="sv-otp"?e.jsxs("div",{className:"deposit-step-shell",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{onClick:()=>n("sv-operator"),className:"deposit-step-back",children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Code OTP"})]})}),e.jsxs("div",{className:"deposit-step-content space-y-5 pb-10",children:[e.jsxs("div",{className:"deposit-step-card deposit-step-card-accent p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("div",{className:"w-7 h-7 rounded-full bg-[#D40030] flex items-center justify-center flex-shrink-0",children:e.jsx("span",{className:"text-white font-bold text-xs",children:"1"})}),e.jsx("p",{className:"font-bold text-gray-900 text-sm",children:"Composez ce code sur votre téléphone"})]}),Fe?e.jsxs("div",{className:"deposit-step-otp px-4 py-3 text-center",children:[e.jsx("p",{className:"font-mono font-black text-2xl text-[#A60026] tracking-widest",children:Fe}),e.jsx("p",{className:"text-xs text-gray-400 mt-1",children:"Composez ce code USSD sur votre téléphone"})]}):e.jsxs("p",{className:"text-sm text-gray-600",children:["Composez le code USSD de votre opérateur (ex : ",e.jsx("span",{className:"font-mono font-bold text-[#A60026]",children:"*144#"}),") sur votre téléphone pour recevoir le code OTP par SMS."]})]}),e.jsxs("div",{className:"deposit-step-card deposit-step-card-accent p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("div",{className:"w-7 h-7 rounded-full bg-[#D40030] flex items-center justify-center flex-shrink-0",children:e.jsx("span",{className:"text-white font-bold text-xs",children:"2"})}),e.jsx("p",{className:"font-bold text-gray-900 text-sm",children:"Entrez le code OTP reçu par SMS"})]}),e.jsxs("p",{className:"text-xs text-gray-500 mb-3",children:["Après avoir composé le code, vous recevrez un SMS avec un code OTP. Saisissez-le ci-dessous pour confirmer le paiement de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]}),"."]}),e.jsx("input",{type:"text",inputMode:"numeric",value:pe,onChange:t=>me(t.target.value),placeholder:"Code OTP reçu par SMS",className:"deposit-step-otp w-full px-4 py-4 text-center text-2xl tracking-widest font-black text-gray-800 outline-none focus:border-[#D40030]",maxLength:8})]}),e.jsx("button",{onClick:()=>Ne.mutate(),disabled:!pe.trim()||Ne.isPending,className:"deposit-step-primary w-full py-5 disabled:opacity-40",style:{background:u},children:Ne.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(v,{className:"w-5 h-5 animate-spin"})," Vérification..."]}):"Valider le code OTP"})]})]}):c==="sv-redirect"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsxs("button",{onClick:()=>n("sv-operator"),className:"deposit-step-back",children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold text-base",children:"Finaliser le paiement"})]})}),e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(T,{className:"w-10 h-10 text-[#D40030]"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl mb-2",children:"Finaliser sur l'application"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Appuyez sur le bouton ci-dessous pour ouvrir la page de paiement de l'opérateur et confirmer votre dépôt de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]}),"."]})]}),e.jsxs("a",{href:xt,target:"_blank",rel:"noopener noreferrer",className:"deposit-step-primary w-full py-5 flex items-center justify-center gap-2",style:{background:u},onClick:()=>{y(!0),n("sv-waiting")},children:[e.jsx(T,{className:"w-5 h-5"})," Ouvrir la page de paiement"]})]})]}):c==="sv-waiting"?e.jsxs("div",{className:"deposit-step-shell flex flex-col",children:[e.jsx(f,{}),e.jsx("header",{className:"deposit-step-header",children:e.jsx("span",{className:"font-semibold text-base text-gray-800",children:"Paiement en cours"})}),e.jsx("div",{className:"flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6",children:Re==="approved"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(Y,{className:"w-10 h-10 text-[#D40030]"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"Paiement confirmé !"}),e.jsxs("p",{className:"text-sm text-gray-500 mt-1",children:["Votre solde a été crédité de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]})]})]})]}):Re==="rejected"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(G,{className:"w-10 h-10 text-red-400"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"Paiement échoué"}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Le paiement a été refusé ou annulé."})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[le&&e.jsxs("button",{onClick:()=>ve.mutate(),disabled:ve.isPending,className:"deposit-step-primary flex-1 py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50",style:{background:u},children:[ve.isPending?e.jsx(v,{className:"w-4 h-4 animate-spin"}):e.jsx(G,{className:"w-4 h-4"}),"Réessayer"]}),e.jsx("button",{onClick:()=>{n("amount"),g(""),R(null),H(null),J(""),y(!1),$("")},className:"deposit-step-secondary flex-1 py-3 text-sm",children:"Nouvelle recharge"})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"deposit-step-icon",children:e.jsx(G,{className:"w-10 h-10 text-[#D40030] animate-spin",style:{animationDuration:"2s"}})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-900 text-xl",children:"En attente de confirmation"}),e.jsxs("p",{className:"text-sm text-gray-500 mt-2",children:["Une demande de paiement de ",e.jsxs("strong",{children:[Number(o).toLocaleString()," ",d]})," a été envoyée sur votre téléphone.",e.jsx("br",{}),"Acceptez-la sur votre téléphone. Cette page se met à jour automatiquement."]})]}),e.jsxs("div",{className:"flex gap-3 w-full",children:[e.jsx(I,{href:"/history",className:"flex-1",children:e.jsx("button",{className:"deposit-step-secondary w-full py-3 text-sm",children:"Voir l'historique"})}),e.jsx("button",{onClick:()=>{n("amount"),g(""),R(null),H(null),J(""),y(!1),$("")},className:"deposit-step-secondary flex-1 py-3 text-sm",children:"Nouvelle recharge"})]})]})})]}):null}export{Os as default};

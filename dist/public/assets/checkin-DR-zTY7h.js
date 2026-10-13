import{e as x,a as b,b as k,u as j,c as y,j as e,i as w,L as v,q as l,g as N}from"./index-q0tZmW1h.js";import{u as z}from"./useMutation-DSXdpACO.js";import{g as p}from"./countries-Bsj6dpqA.js";import{e as h}from"./ITM4W5DOSVIZHOJCQX74LIO7CA_1791819301503-Dbb9jEl5.js";import{e as C}from"./image_1791813575847-CbD6entj.js";import{C as q}from"./chevron-left-DpaVo9fx.js";const B=x("CalendarCheck",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]]);const L=x("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);function F(){const{user:t}=b(),{toast:c}=k(),[,f]=j(),{data:i,isLoading:o}=y({queryKey:["/api/daily-bonus-status"],refetchInterval:6e4}),a=z({mutationFn:async()=>{const n=await N("POST","/api/claim-daily-bonus",{});if(!n.ok){const s=await n.json();throw new Error(s.message||"Récompense indisponible")}return n.json()},onSuccess:n=>{l.invalidateQueries({queryKey:["/api/daily-bonus-status"]}),l.invalidateQueries({queryKey:["/api/user"]});const s=Number(n?.amount||0),m=p(t?.country||"")?.currency||"XOF";c({title:"Bonus reçu !",description:`${s} ${m} ajoutés à vos revenus cumulés`})},onError:n=>{c({title:"Récompense indisponible",description:n.message,variant:"destructive"})}});if(!t)return null;const r=p(t.country)?.currency||"XOF",u=i?.totalBonusClaimed||0,d=!!i?.canClaim,g=n=>`${Math.round(n).toLocaleString("fr-FR")} ${r}`;return e.jsxs("main",{className:"checkin-reference min-h-full bg-[#f4f4f4] pb-20",children:[e.jsx("style",{children:`
        .checkin-reference {
          color: #111827;
          font-family: Inter, Arial, sans-serif;
          background: #ffffff;
        }
        .checkin-reference .checkin-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100%;
          margin: 0 auto;
          overflow: hidden;
          background: #ffffff;
        }
        .checkin-reference .topbar {
          display: flex;
          min-height: 72px;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 12px;
          border-bottom: 2px solid #111827;
          background: #ffffff;
        }
        .checkin-reference .back {
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          gap: 5px;
          padding: 7px 11px 7px 7px;
          border: 2px solid #111827;
          border-radius: 11px;
          background: #fff;
          color: #111827;
          font-size: 14px;
          font-weight: 800;
          box-shadow: 0 3px 0 #111827;
        }
        .checkin-reference .back:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #111827;
        }
        .checkin-reference .back svg {
          width: 22px;
          height: 22px;
          stroke-width: 3;
        }
        .checkin-reference .brand {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #111827;
          font-size: 15px;
          font-weight: 800;
        }
        .checkin-reference .brand img {
          width: 32px;
          height: 32px;
          border: 2px solid #111827;
          border-radius: 50%;
          background: #fff;
          object-fit: contain;
        }
        .checkin-reference .topbar-badge {
          padding: 6px 7px;
          border: 2px solid #bd304c;
          border-radius: 10px;
          color: #9e263c;
          font-size: 8px;
          font-weight: 800;
        }
        .checkin-reference .hero {
          position: relative;
          height: min(54vw, 276px);
          min-height: 210px;
          overflow: hidden;
          border-bottom: 2px solid #111827;
          background: #111827;
        }
        .checkin-reference .hero-art {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .checkin-reference .hero-art::after {
          position: absolute;
          z-index: 1;
          inset: 0;
          background: linear-gradient(180deg, rgba(17, 24, 39, .06), rgba(17, 24, 39, .44));
          content: "";
          pointer-events: none;
        }
        .checkin-reference .hero-art img {
          position: relative;
          z-index: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
        }
        .checkin-reference .hero-copy {
          position: absolute;
          z-index: 3;
          right: 18px;
          bottom: 16px;
          left: 18px;
          color: #fff;
          text-align: right;
          text-shadow: 0 2px 4px rgba(0,0,0,.35);
        }
        .checkin-reference .hero-copy strong {
          display: block;
          font-size: 27px;
          font-weight: 900;
          line-height: 1;
        }
        .checkin-reference .hero-copy span {
          display: inline-block;
          max-width: 320px;
          margin-top: 5px;
          font-size: 13px;
          font-weight: 700;
        }
        .checkin-reference .earnings-card {
          position: relative;
          z-index: 4;
          margin: 14px 16px 0;
          padding: 12px;
          border: 2px solid #111827;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 4px 0 #111827;
        }
        .checkin-reference .reward-panel {
          margin: 14px 16px 0;
          padding: 16px;
          border: 2px solid #111827;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 4px 0 #111827;
        }
        .checkin-reference .reward-heading {
          margin: 0;
          color: #111827;
          font-size: 19px;
          font-weight: 900;
          line-height: 1.05;
        }
        .checkin-reference .reward-heading span {
          color: #9e263c;
        }
        .checkin-reference .reward-row {
          margin-top: 12px;
        }
        .checkin-reference .reward-copy p {
          margin: 0;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.35;
          text-align: center;
        }
        .checkin-reference .reward-copy strong {
          display: block;
          margin-top: 8px;
          color: #9e263c;
          font-size: clamp(30px, 8vw, 38px);
          font-weight: 900;
          line-height: 1;
          text-align: center;
        }
        .checkin-reference .stat {
          position: relative;
          isolation: isolate;
          min-height: 100px;
          overflow: hidden;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff;
          text-align: center;
        }
        .checkin-reference .stat::after {
          position: absolute;
          z-index: 1;
          inset: 0;
          background: rgba(255, 255, 255, .48);
          content: "";
          pointer-events: none;
        }
        .checkin-reference .stat-background {
          position: absolute;
          z-index: 0;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .62;
          pointer-events: none;
        }
        .checkin-reference .stat-content {
          position: relative;
          z-index: 2;
          display: flex;
          min-height: 100px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 6px;
        }
        .checkin-reference .stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .checkin-reference .stat-icon {
          width: 22px;
          height: 22px;
          margin-bottom: 5px;
          color: #bd304c;
          stroke-width: 2.4;
        }
        .checkin-reference .stat-value {
          margin: 0;
          color: #9e263c;
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
        }
        .checkin-reference .stat-value span {
          padding-left: 4px;
          font-size: 17px;
        }
        .checkin-reference .stat-value.secondary {
          font-size: clamp(16px, 4vw, 22px);
        }
        .checkin-reference .stat-label {
          margin: 7px 0 0;
          color: #4b5563;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
        }
        .checkin-reference .claim {
          display: flex;
          width: calc(100% - 32px);
          min-height: 58px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin: 14px 16px 0;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #bd304c;
          color: #ffffff;
          font-size: clamp(16px, 4.8vw, 19px);
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 4px 0 #111827;
        }
        .checkin-reference .claim:active:not(:disabled) {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #111827;
        }
        .checkin-reference .claim:disabled {
          background: #f2c4cf;
          color: #6b7280;
          box-shadow: 0 3px 0 #111827;
        }
        .checkin-reference .claim svg {
          width: 24px;
          height: 24px;
        }
        .checkin-reference .instructions {
          margin: 14px 16px 24px;
          padding: 16px 16px 7px;
          border: 2px solid #111827;
          border-top: 5px solid #bd304c;
          border-radius: 14px;
          background: #fff;
        }
        .checkin-reference .instructions h2 {
          margin: 0 0 15px;
          color: #111827;
          font-size: 18px;
          font-weight: 900;
        }
        .checkin-reference .instruction {
          display: flex;
          gap: 9px;
          margin: 0 0 13px;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.5;
        }
        .checkin-reference .instruction b {
          color: #bd304c;
          font-size: 16px;
        }
        @media (max-width: 360px) {
          .checkin-reference .topbar { padding-right: 12px; padding-left: 12px; }
          .checkin-reference .topbar-badge { display: none; }
          .checkin-reference .earnings-card,
          .checkin-reference .reward-panel,
          .checkin-reference .instructions { margin-right: 12px; margin-left: 12px; }
          .checkin-reference .claim { width: calc(100% - 24px); margin-right: 12px; margin-left: 12px; }
          .checkin-reference .instruction { font-size: 13px; }
        }
      `}),e.jsxs("div",{className:"checkin-screen",children:[e.jsxs("header",{className:"topbar",children:[e.jsxs("button",{className:"back",onClick:()=>f("/"),children:[e.jsx(q,{"aria-hidden":"true"}),e.jsx("span",{children:"Retour"})]}),e.jsxs("div",{className:"brand",children:[e.jsx("img",{src:w,alt:"Equinor"}),e.jsx("span",{children:"Pointage du jour"})]}),e.jsx("span",{className:"topbar-badge",children:"BONUS QUOTIDIEN"})]}),e.jsxs("section",{className:"hero","aria-label":"Bonus quotidien",children:[e.jsx("div",{className:"hero-art",children:e.jsx("img",{src:h,alt:""})}),e.jsxs("div",{className:"hero-copy",children:[e.jsx("strong",{children:"Bonus du jour"}),e.jsx("span",{children:"Validez votre présence toutes les 24 heures"})]})]}),e.jsxs("section",{className:"reward-panel","aria-label":"Récompense quotidienne",children:[e.jsx("h2",{className:"reward-heading",children:"Votre récompense quotidienne"}),e.jsx("div",{className:"reward-row",children:e.jsxs("div",{className:"reward-copy",children:[e.jsx("p",{children:"Montant attribué après validation"}),e.jsxs("strong",{children:["25 à 100 ",r]})]})})]}),e.jsx("button",{className:"claim",onClick:()=>a.mutate(),disabled:o||!d||a.isPending,"data-testid":"button-pointer",children:a.isPending?e.jsxs(e.Fragment,{children:[e.jsx(v,{className:"animate-spin"}),e.jsx("span",{children:"Validation en cours…"})]}):o?"Chargement…":d?"Valider mon pointage":i?`Disponible dans ${i.hoursRemaining} h`:"Statut indisponible"}),e.jsx("section",{className:"earnings-card","aria-label":"Bilan de vos récompenses",children:e.jsxs("div",{className:"stats",children:[e.jsxs("div",{className:"stat",children:[e.jsx("img",{className:"stat-background",src:C,alt:"","aria-hidden":"true"}),e.jsxs("div",{className:"stat-content",children:[e.jsx(L,{className:"stat-icon","aria-hidden":"true"}),e.jsx("p",{className:"stat-value secondary",children:g(u)}),e.jsx("p",{className:"stat-label",children:"Bonus cumulés"})]})]}),e.jsxs("div",{className:"stat",children:[e.jsx("img",{className:"stat-background",src:h,alt:"","aria-hidden":"true"}),e.jsxs("div",{className:"stat-content",children:[e.jsx(B,{className:"stat-icon","aria-hidden":"true"}),e.jsx("p",{className:"stat-value",children:i?.daysPointed||0}),e.jsx("p",{className:"stat-label",children:"Pointages validés"})]})]})]})}),e.jsxs("section",{className:"instructions","aria-label":"Instructions du pointage",children:[e.jsx("h2",{children:"À retenir"}),e.jsxs("p",{className:"instruction",children:[e.jsx("b",{children:"1."}),e.jsx("span",{children:"Vous pouvez valider un pointage toutes les 24 heures."})]}),e.jsxs("p",{className:"instruction",children:[e.jsx("b",{children:"2."}),e.jsxs("span",{children:["Chaque validation rapporte un bonus aléatoire de 25 à 100 ",r," ; le montant de 100 ",r," est rare."]})]}),e.jsxs("p",{className:"instruction",children:[e.jsx("b",{children:"3."}),e.jsx("span",{children:"Le bonus est ajouté à votre solde après validation."})]})]})]})]})}export{F as default};

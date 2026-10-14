import{e as te,a as re,b as le,u as oe,d as ie,r as c,c as E,j as e,L as F,f as se,q as C,g as z}from"./index-DWM8VD4G.js";import{u as S}from"./useMutation-9aPeGCyK.js";import{u as ne,C as P,t as ce}from"./zod-B033Rgpa.js";import{d as de,c as pe}from"./countries-Bsj6dpqA.js";import{e as fe}from"./illustration-8_1784762965573-C2eE_S1I.js";import{e as xe}from"./image_1791813575847-CbD6entj.js";import{C as q}from"./chevron-left-TZxHcBfn.js";import{X as R}from"./x-B3Du2Ua4.js";import{S as T}from"./search-pPvPYriq.js";import{C as j}from"./check-BMjKWKvN.js";import{P as D,T as ue}from"./trash-2-CGIx7IGh.js";import{C as W}from"./credit-card-DQti_Rtc.js";import{C as me}from"./chevron-right-Bk_6ezGB.js";import{o as he,s as I}from"./types-BPgFMYGe.js";const we=te("Wifi",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]),ge=he({accountNumber:I().min(8,"Numéro requis"),paymentMethod:I().min(2,"Moyen de paiement requis")});function be(l){const t=l.replace(/\s+/g,"");return t.length<=6?l:`${t.slice(0,2)}••••••${t.slice(-4)}`}function ye(l){const t=l.toLowerCase();return t.includes("orange")?"/operators/orange.png":t.includes("mtn")?"/operators/mtn.png":t.includes("moov")?"/operators/moov.jpg":t.includes("airtel")?"/operators/airtel.png":t.includes("wave")?"/operators/wave.png":t.includes("tmoney")||t.includes("t-money")?"/operators/tmoney.png":"/favicon.png?v=equinor"}const K=`
  .wallet-page {
    width: 100%;
    min-height: 100dvh;
    overflow-x: hidden;
    background: #ffffff;
    color: #111827;
    font-family: Arial, sans-serif;
  }
  .wallet-page *,
  .wallet-page *::before,
  .wallet-page *::after {
    box-sizing: border-box;
  }
  .wallet-shell {
    width: 100%;
    max-width: 512px;
    min-height: 100dvh;
    margin: 0 auto;
    background: #ffffff;
  }
  .wallet-topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 78px;
    padding: 17px 16px;
    border-bottom: 2px solid #111827;
    background: #ffffff;
  }
  .wallet-back,
  .wallet-top-action {
    display: grid;
    width: 42px;
    height: 42px;
    flex: none;
    place-items: center;
    border: 2px solid #111827;
    border-radius: 11px;
    background: #ffffff;
    box-shadow: 0 3px 0 #111827;
    color: #111827;
    cursor: pointer;
  }
  .wallet-top-action {
    background: #bd304c;
    border-color: #bd304c;
    box-shadow: 0 3px 0 #111827;
    color: #ffffff;
  }
  .wallet-heading {
    min-width: 0;
    flex: 1;
  }
  .wallet-eyebrow {
    display: block;
    margin-bottom: 2px;
    color: #9e263c;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .08em;
    line-height: 1.2;
    text-transform: uppercase;
  }
  .wallet-title {
    margin: 0;
    color: #171717;
    font-size: 20px;
    font-weight: 800;
    line-height: 1.25;
  }
  .wallet-content {
    padding: 16px 16px 30px;
  }
  .wallet-hero {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid #f0c5cf;
    border-radius: 20px;
    background: #fff0f3;
  }
  .wallet-hero-icon {
    display: grid;
    width: 44px;
    height: 44px;
    flex: none;
    place-items: center;
    border-radius: 15px;
    background: #bd304c;
    color: #ffffff;
  }
  .wallet-hero h2 {
    margin: 0 0 4px;
    color: #171717;
    font-size: 15px;
    font-weight: 800;
  }
  .wallet-hero p {
    margin: 0;
    color: #6b625d;
    font-size: 13px;
    line-height: 1.5;
  }
  .wallet-section {
    margin-bottom: 16px;
    overflow: hidden;
    border: 2px solid #111827;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 4px 0 #111827, 0 8px 16px rgba(17, 24, 39, .14);
  }
  .wallet-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    border-bottom: 2px solid #111827;
  }
  .wallet-section-title {
    margin: 0;
    color: #111827;
    font-size: 16px;
    font-weight: 800;
  }
  .wallet-section-caption {
    margin: 3px 0 0;
    color: #4b5563;
    font-size: 12px;
    line-height: 1.35;
  }
  .wallet-step {
    display: grid;
    width: 30px;
    height: 30px;
    flex: none;
    place-items: center;
    border: 2px solid #111827;
    border-radius: 9px;
    background: #bd304c;
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
  }
  .wallet-selector {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    border: 0;
    background: #ffffff;
    color: #171717;
    text-align: left;
    cursor: pointer;
  }
  .wallet-selector:hover,
  .wallet-selector:focus-visible {
    background: #fffaf6;
    outline: none;
  }
  .wallet-selector-copy {
    min-width: 0;
    flex: 1;
  }
  .wallet-label {
    display: block;
    margin-bottom: 5px;
    color: #857b74;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .03em;
    text-transform: uppercase;
  }
  .wallet-value {
    display: block;
    overflow: hidden;
    color: #171717;
    font-size: 14px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wallet-value.is-empty {
    color: #a69c95;
    font-weight: 500;
  }
  .wallet-selector svg {
    flex: none;
    color: #9e263c;
  }
  .wallet-field {
    padding: 15px 16px 16px;
  }
  .wallet-field + .wallet-field {
    border-top: 1px solid #f2ebe5;
  }
  .wallet-input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #d9cec5;
    padding: 3px 0 9px;
    outline: none;
    background: transparent;
    color: #171717;
    font-size: 15px;
  }
  .wallet-input:focus {
    border-color: #bd304c;
    box-shadow: 0 1px 0 #bd304c;
  }
  .wallet-input::placeholder {
    color: #b8aea7;
  }
  .wallet-error {
    margin: 6px 0 0;
    color: #9e263c;
    font-size: 12px;
  }
  .wallet-note {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin: 14px 2px 0;
    color: #756b64;
    font-size: 12px;
    line-height: 1.45;
  }
  .wallet-note svg {
    flex: none;
    margin-top: 1px;
    color: #bd304c;
  }
  .wallet-list-section {
    margin-bottom: 0;
  }
  .wallet-list {
    display: grid;
    gap: 18px;
    padding: 16px;
  }
  .wallet-card-wrap {
    display: grid;
    gap: 8px;
  }
  .wallet-card {
    position: relative;
    display: flex;
    min-height: 210px;
    aspect-ratio: 1.586 / 1;
    align-items: stretch;
    gap: 10px;
    overflow: hidden;
    border: 2px solid #17191c;
    border-radius: 19px;
    padding: 18px;
    background:
      radial-gradient(ellipse at 100% 0%, rgba(255, 255, 255, .18), transparent 43%),
      linear-gradient(128deg, #842239 0%, #a62943 42%, #bd304c 72%, #d94d69 100%);
    box-shadow: 0 4px 0 #17191c, 0 10px 20px rgba(17, 24, 39, .18);
    color: #ffffff;
    transition: box-shadow .15s ease, transform .15s ease, border-color .15s ease;
  }
  .wallet-card::before {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(67deg, transparent 0 13%, rgba(255, 255, 255, .08) 13% 23%, transparent 23% 42%, rgba(255, 255, 255, .06) 42% 55%, transparent 55%),
      linear-gradient(130deg, rgba(255, 255, 255, .05), transparent 45%);
    content: "";
    pointer-events: none;
  }
  .wallet-card::after {
    position: absolute;
    right: -70px;
    bottom: -135px;
    width: 250px;
    aspect-ratio: 1;
    border: 1px solid rgba(255, 255, 255, .12);
    border-radius: 50%;
    box-shadow: 0 0 0 18px rgba(255, 255, 255, .035), 0 0 0 38px rgba(255, 255, 255, .025);
    content: "";
    pointer-events: none;
  }
  .wallet-card > * {
    position: relative;
    z-index: 1;
  }
  .wallet-card.is-selectable {
    cursor: pointer;
  }
  .wallet-card.is-selectable:active {
    transform: scale(.99);
  }
  .wallet-card.is-default {
    box-shadow: 0 0 0 3px #ffffff, 0 4px 0 #17191c, 0 10px 20px rgba(17, 24, 39, .18);
  }
  .wallet-card-brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .wallet-card-brand-start {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 10px;
  }
  .wallet-card-icon {
    display: grid;
    width: 38px;
    height: 38px;
    flex: none;
    place-items: center;
    border: 2px solid rgba(255, 255, 255, .85);
    border-radius: 11px;
    background: #ffffff;
    padding: 4px;
    object-fit: contain;
  }
  .wallet-card-type {
    flex: none;
    border: 1px solid rgba(255, 255, 255, .58);
    border-radius: 999px;
    padding: 5px 9px;
    background: rgba(255, 255, 255, .12);
    color: #ffffff;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .12em;
  }
  .wallet-card-copy {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
  }
  .wallet-card-method {
    margin: 0;
    color: #ffffff;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
  }
  .wallet-card-number {
    margin: auto 0 20px;
    overflow: hidden;
    color: #ffffff;
    font-family: "Space Grotesk", "Arial", sans-serif;
    font-size: clamp(16px, 4.4vw, 21px);
    font-weight: 800;
    letter-spacing: .055em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wallet-card-bottomline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .wallet-card-network {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: 7px;
    color: rgba(255, 255, 255, .86);
    font-size: 11px;
    font-weight: 600;
  }
  .wallet-card-network span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wallet-card-chip {
    position: relative;
    display: block;
    width: 48px;
    height: 35px;
    flex: none;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, .65);
    border-radius: 8px;
    background:
      linear-gradient(90deg, transparent 31%, rgba(116, 72, 48, .3) 32% 34%, transparent 35% 65%, rgba(116, 72, 48, .3) 66% 68%, transparent 69%),
      linear-gradient(0deg, transparent 30%, rgba(116, 72, 48, .25) 31% 34%, transparent 35% 65%, rgba(116, 72, 48, .25) 66% 69%, transparent 70%),
      linear-gradient(135deg, #fff4df, #d9b984 58%, #f9e8c8);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .35), 0 2px 5px rgba(0, 0, 0, .16);
  }
  .wallet-card-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }
  .wallet-icon-action {
    display: inline-flex;
    min-height: 40px;
    align-items: center;
    gap: 6px;
    border: 2px solid #111827;
    border-radius: 11px;
    padding: 0 12px;
    background: #ffffff;
    color: #111827;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
  .wallet-icon-action:hover,
  .wallet-icon-action:focus-visible {
    border-color: #111827;
    background: #fff0f3;
    outline: 3px solid rgba(189, 48, 76, .22);
    outline-offset: 2px;
  }
  .wallet-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 26px 16px 28px;
    text-align: center;
  }
  .wallet-empty img {
    width: 136px;
    height: 136px;
    object-fit: contain;
    opacity: .88;
  }
  .wallet-empty p {
    margin: 10px 0 0;
    color: #111827;
    font-size: 14px;
    font-weight: 700;
  }
  .wallet-empty p + p {
    margin-top: 4px;
    color: #4b5563;
    font-size: 12px;
    font-weight: 400;
  }
  .wallet-footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    padding: 12px 16px 20px;
    border-top: 2px solid #111827;
    background: rgba(255, 255, 255, .98);
    box-shadow: 0 -6px 18px rgba(17, 24, 39, .12);
  }
  .wallet-footer-inner {
    width: 100%;
    max-width: 508px;
    margin: 0 auto;
  }
  .wallet-primary {
    display: flex;
    width: 100%;
    min-height: 62px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 2px solid #111827;
    border-radius: 11px;
    background: #bd304c;
    box-shadow: 0 4px 0 #111827, 0 7px 14px rgba(17, 24, 39, .18);
    color: #ffffff;
    font-size: 18px;
    font-weight: 800;
    cursor: pointer;
  }
  .wallet-primary:hover,
  .wallet-primary:focus-visible {
    background: #9e263c;
    outline: 3px solid rgba(189, 48, 76, .28);
    outline-offset: 2px;
  }
  .wallet-primary:disabled {
    cursor: not-allowed;
    opacity: .55;
  }
  .wallet-form-page {
    background: #ffffff;
  }
  .wallet-form-topbar {
    border-bottom: 2px solid #111827;
    background: #ffffff;
  }
  .wallet-form-topbar .wallet-back {
    border-color: #111827;
    background: #ffffff;
    color: #111827;
  }
  .wallet-form-topbar .wallet-eyebrow {
    color: #171717;
  }
  .wallet-form-topbar .wallet-title {
    color: #171717;
  }
  .wallet-form-content {
    min-height: calc(100vh - 73px);
    display: grid;
    align-content: start;
    gap: 12px;
    padding: 18px 16px calc(112px + env(safe-area-inset-bottom));
    background: transparent;
  }
  .wallet-form-page .wallet-shell,
  .wallet-scene-page .wallet-shell {
    min-height: 100vh;
    background-color: #ffffff;
    background-image:
      linear-gradient(rgba(255, 255, 255, .22), rgba(255, 255, 255, .22)),
      url("${xe}");
    background-position: top center;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }
  .wallet-scene-page .wallet-shell {
    background-position: center 190px;
  }
  .wallet-form-heading {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 0 2px 2px;
  }
  .wallet-form-step {
    display: grid;
    width: 38px;
    height: 38px;
    flex: none;
    place-items: center;
    border: 2px solid #17191c;
    border-radius: 12px;
    background: #bd304c;
    box-shadow: 0 2px 0 #17191c;
    color: #ffffff;
    font-size: 13px;
    font-weight: 800;
  }
  .wallet-form-heading h2 {
    margin: 0;
    color: #111827;
    font-size: 17px;
    font-weight: 800;
    line-height: 1.25;
  }
  .wallet-reference-row,
  .wallet-reference-address {
    overflow: hidden;
    border: 2px solid #17191c;
    border-radius: 14px;
    background: #ffffff;
    box-shadow: 0 3px 0 #17191c, 0 7px 14px rgba(17, 24, 39, .14);
  }
  .wallet-reference-row {
    display: grid;
    width: 100%;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-rows: auto auto;
    align-items: center;
    column-gap: 12px;
    row-gap: 5px;
    min-height: 78px;
    padding: 13px 15px;
    background: #ffffff;
    color: #111827;
    text-align: left;
    cursor: pointer;
  }
  .wallet-reference-row:hover,
  .wallet-reference-row:focus-visible {
    border-color: #17191c;
    background: #fffafb;
    outline: 3px solid rgba(189, 48, 76, .2);
    outline-offset: 2px;
  }
  .wallet-reference-label {
    grid-column: 1;
    color: #6b7280;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
  .wallet-reference-value {
    grid-column: 1;
    min-width: 0;
    overflow: hidden;
    color: #111827;
    font-size: 15px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wallet-reference-value.is-empty {
    color: #4b5563;
    font-weight: 500;
  }
  .wallet-reference-row svg {
    grid-column: 2;
    grid-row: 1 / span 2;
    flex: none;
    color: #bd304c;
  }
  .wallet-reference-address {
    min-height: 0;
    padding: 13px 15px 15px;
  }
  .wallet-form-address-heading {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 10px;
  }
  .wallet-form-address-step {
    display: grid;
    width: 25px;
    height: 25px;
    flex: none;
    place-items: center;
    border: 1.5px solid #17191c;
    border-radius: 8px;
    background: #fff0f3;
    color: #bd304c;
    font-size: 11px;
    font-weight: 800;
  }
  .wallet-reference-address label {
    display: block;
    margin: 0;
    color: #6b7280;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
  .wallet-reference-address .wallet-input {
    min-height: 48px;
    border: 1.5px solid #17191c;
    border-radius: 10px;
    padding: 0 12px;
    background: #ffffff;
    font-size: 15px;
    text-align: left;
  }
  .wallet-reference-address .wallet-input:focus {
    border-color: #bd304c;
    box-shadow: 0 0 0 3px rgba(189, 48, 76, .16);
  }
  .wallet-form-note {
    margin: 0;
    border: 1.5px solid #17191c;
    border-radius: 12px;
    padding: 11px 13px;
    background: #ffffff;
    box-shadow: 0 2px 0 #17191c, 0 5px 10px rgba(17, 24, 39, .1);
    color: #4b5563;
    font-size: 12px;
    line-height: 1.45;
    text-align: left;
  }
  @media (min-width: 700px) {
    .wallet-form-content {
      max-width: 480px;
      margin: 0 auto;
      padding-top: 24px;
    }
  }
  .wallet-form-page .wallet-footer {
    border-top: 0;
    background: transparent;
    box-shadow: none;
  }
  .wallet-scene-page .wallet-topbar {
    border-bottom: 2px solid #111827;
    background: #ffffff;
  }
  .wallet-scene-page .wallet-content {
    background: transparent;
  }
  .wallet-scene-add {
    position: relative;
    z-index: 1;
    padding: 28px 16px 22px;
    background: #ffffff;
  }
  .wallet-scene-add .wallet-primary {
    min-height: 62px;
    border-radius: 11px;
  }
  .wallet-scene-page .wallet-footer {
    border-top: 0;
    background: transparent;
    box-shadow: none;
  }
  .wallet-scene-page .wallet-primary {
    min-height: 62px;
    border-radius: 11px;
  }
  .wallet-scene-page:not(.is-select-mode) {
    background: #f0f0f0;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-shell {
    background-color: #f0f0f0;
    background-image: none;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-topbar {
    position: relative;
    min-height: 70px;
    border-bottom: 1px solid #dedbdd;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-eyebrow,
  .wallet-scene-page:not(.is-select-mode) .wallet-top-action {
    display: none;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-heading {
    position: absolute;
    left: 50%;
    width: max-content;
    max-width: calc(100% - 112px);
    transform: translateX(-50%);
    text-align: center;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-title {
    font-size: 18px;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-back {
    border: 0;
    box-shadow: none;
    color: #bd304c;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-content {
    padding: 12px 14px 16px;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-list-section {
    margin: 0;
    overflow: visible;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-section-header {
    display: none;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-list {
    gap: 13px;
    padding: 0;
  }
  .wallet-card.is-compact {
    min-height: 0;
    aspect-ratio: auto;
    align-items: center;
    overflow: hidden;
    border: 1.5px solid #17191c;
    border-radius: 15px;
    padding: 11px 12px;
    background: #fff;
    box-shadow: 0 3px 0 #17191c, 0 6px 14px rgba(17, 24, 39, .1);
    color: #17191c;
  }
  .wallet-card.is-compact::before,
  .wallet-card.is-compact::after {
    display: none;
  }
  .wallet-account-row {
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    gap: 10px;
  }
  .wallet-account-icon {
    display: grid;
    width: 44px;
    height: 44px;
    flex: none;
    place-items: center;
    border: 1px solid #f0c5cf;
    border-radius: 12px;
    background: #fff0f3;
    color: #bd304c;
  }
  .wallet-account-copy {
    min-width: 0;
    flex: 1;
  }
  .wallet-account-method,
  .wallet-account-name,
  .wallet-account-number {
    display: block;
    overflow: hidden;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wallet-account-method {
    color: #17191c;
    font-size: 15px;
    font-weight: 800;
    line-height: 1.25;
  }
  .wallet-account-name,
  .wallet-account-number {
    margin-top: 4px;
    color: #5f5b5d;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.3;
  }
  .wallet-account-number {
    font-variant-numeric: tabular-nums;
    letter-spacing: .025em;
  }
  .wallet-card.is-compact .wallet-card-actions {
    flex: none;
    gap: 5px;
  }
  .wallet-card.is-compact .wallet-icon-action {
    display: grid;
    width: 35px;
    min-width: 35px;
    min-height: 35px;
    place-items: center;
    border: 1px solid #dedbdd;
    border-radius: 10px;
    padding: 0;
    background: #fff;
    box-shadow: none;
    color: #6d6870;
  }
  .wallet-card.is-compact .wallet-icon-action:hover,
  .wallet-card.is-compact .wallet-icon-action:focus-visible {
    border-color: #bd304c;
    background: #fff0f3;
    color: #bd304c;
  }
  .wallet-card.is-compact .wallet-default-indicator {
    display: grid;
    width: 35px;
    height: 35px;
    flex: none;
    place-items: center;
    border: 1px solid #f0c5cf;
    border-radius: 10px;
    background: #fff0f3;
    color: #bd304c;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-scene-add {
    display: flex;
    justify-content: center;
    padding: 2px 16px calc(94px + env(safe-area-inset-bottom));
    background: #f0f0f0;
  }
  .wallet-scene-page:not(.is-select-mode) .wallet-scene-add .wallet-primary {
    width: min(100%, 260px);
    min-height: 52px;
    border-color: #bd304c;
    border-radius: 12px;
    background: #bd304c;
    box-shadow: 0 3px 0 #17191c, 0 6px 12px rgba(17, 24, 39, .12);
    font-size: 16px;
  }
  @media (min-width: 700px) {
    .wallet-footer {
      position: static;
      padding: 0 16px 24px;
      border-top: 0;
      background: #ffffff;
      box-shadow: none;
    }
  }
`;function Te(){const{user:l}=re(),{toast:t}=le(),[,O]=oe(),Q=ie(),o=new URLSearchParams(Q).get("from")==="withdrawal",[B,p]=c.useState(!1),[V,f]=c.useState(!1),[X,x]=c.useState(!1),[u,m]=c.useState(""),[i,h]=c.useState(""),[k,w]=c.useState(""),[v,g]=c.useState(""),{data:s,isLoading:G}=E({queryKey:["/api/wallets"]}),{data:H,isError:L}=E({queryKey:["/api/countries"]}),b=pe(H,L),n=ne({resolver:ce(ge),defaultValues:{accountNumber:"",paymentMethod:""}});c.useEffect(()=>{l&&!i&&h(l.country)},[l,i]);const N=S({mutationFn:async a=>{const r=await z("POST","/api/wallets",{...a,accountName:l.fullName,country:i});if(!r.ok){const d=await r.json();throw new Error(d.message||"Le portefeuille n'a pas pu être ajouté.")}return r.json()},onSuccess:()=>{C.invalidateQueries({queryKey:["/api/wallets"]}),t({title:"Portefeuille ajouté !"}),n.reset(),m(""),h(l?.country||""),p(!1)},onError:a=>{t({title:"Ajout du portefeuille impossible",description:a.message,variant:"destructive"})}}),M=S({mutationFn:async a=>{const r=await z("DELETE",`/api/wallets/${a}`,{});if(!r.ok){const d=await r.json();throw new Error(d.message||"Le portefeuille n'a pas pu être supprimé.")}return r.json()},onSuccess:()=>{C.invalidateQueries({queryKey:["/api/wallets"]}),t({title:"Portefeuille supprimé !"})},onError:a=>{t({title:"Suppression du portefeuille impossible",description:a.message,variant:"destructive"})}}),$=S({mutationFn:async a=>{const r=await z("PATCH",`/api/wallets/${a}/default`,{});if(!r.ok){const d=await r.json();throw new Error(d.message||"Le portefeuille par défaut n'a pas pu être défini.")}return r.json()},onSuccess:()=>{C.invalidateQueries({queryKey:["/api/wallets"]})},onError:a=>{t({title:"Sélection du portefeuille impossible",description:a.message,variant:"destructive"})}}),U=a=>{o&&(localStorage.setItem("selectedWalletId",a.id.toString()),O("/withdrawal"))},J=a=>{m(a),n.setValue("paymentMethod",a),w(""),f(!1)},Y=a=>{h(a),m(""),n.setValue("paymentMethod",""),g(""),x(!1)},Z=()=>{if(!i){t({title:"Pays requis",description:"Sélectionnez un pays.",variant:"destructive"});return}n.handleSubmit(a=>N.mutate(a))()};if(!l)return null;const _=b.find(a=>a.code===i&&a.isActive)?.name||i||"Sélectionner un pays",A=de(i,b),y=b.filter(a=>a.isActive).sort((a,r)=>a.name.localeCompare(r.name,"fr")),ee=o?"/withdrawal":"/account",ae=o||s===void 0||s.length>0;return B?e.jsxs("div",{className:"wallet-page wallet-form-page",children:[e.jsx("style",{children:K}),e.jsxs("div",{className:"wallet-shell",children:[e.jsxs("header",{className:"wallet-topbar wallet-form-topbar",children:[e.jsx("button",{onClick:()=>{p(!1),n.reset(),m(""),h(l.country)},className:"wallet-back","data-testid":"button-back-form","aria-label":"Retour",children:e.jsx(q,{size:21})}),e.jsxs("div",{className:"wallet-heading",children:[e.jsx("span",{className:"wallet-eyebrow",children:"Compte de retrait"}),e.jsx("h1",{className:"wallet-title",children:"Ajouter un compte"})]}),e.jsx("div",{className:"w-10","aria-hidden":"true"})]}),e.jsxs("main",{className:"wallet-content wallet-form-content",children:[e.jsxs("div",{className:"wallet-form-heading",children:[e.jsx("span",{className:"wallet-form-step","aria-hidden":"true",children:"01"}),e.jsx("div",{children:e.jsx("h2",{children:"Informations du compte"})})]}),e.jsxs("button",{type:"button",onClick:()=>x(!0),className:"wallet-reference-row","data-testid":"button-select-country",children:[e.jsx("span",{className:"wallet-reference-label",children:"Type"}),e.jsx("span",{className:`wallet-reference-value${i?"":" is-empty"}`,children:_}),e.jsx(P,{size:19})]}),e.jsxs("button",{type:"button",onClick:()=>f(!0),className:"wallet-reference-row","data-testid":"button-select-network",children:[e.jsx("span",{className:"wallet-reference-label",children:"Network"}),e.jsx("span",{className:`wallet-reference-value${u?"":" is-empty"}`,children:u||"Sélectionner un opérateur"}),e.jsx(P,{size:19})]}),e.jsxs("div",{className:"wallet-reference-address",children:[e.jsxs("div",{className:"wallet-form-address-heading",children:[e.jsx("span",{className:"wallet-form-address-step","aria-hidden":"true",children:"02"}),e.jsx("label",{htmlFor:"wallet-account-number",children:"Adresse"})]}),e.jsx("input",{id:"wallet-account-number",...n.register("accountNumber"),type:"tel",placeholder:"Saisissez le numéro",className:"wallet-input","data-testid":"input-wallet-number"}),n.formState.errors.accountNumber&&e.jsx("p",{className:"wallet-error",children:n.formState.errors.accountNumber.message})]}),e.jsx("p",{className:"wallet-form-note",children:"Le numéro sera utilisé pour recevoir vos retraits."})]}),e.jsx("footer",{className:"wallet-footer",children:e.jsx("div",{className:"wallet-footer-inner",children:e.jsx("button",{onClick:Z,disabled:N.isPending,className:"wallet-primary","data-testid":"button-confirm-wallet",children:N.isPending?e.jsxs(e.Fragment,{children:[e.jsx(F,{size:17,className:"animate-spin"}),"Enregistrement..."]}):"Confirmer"})})}),X&&e.jsx("div",{className:"country-picker-overlay",onClick:()=>{g(""),x(!1)},children:e.jsxs("section",{className:"country-picker",role:"dialog","aria-modal":"true","aria-label":"Choisir un pays",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"country-picker-header",children:[e.jsx("h2",{children:"Choisir un pays"}),e.jsx("button",{className:"country-picker-close",onClick:()=>{g(""),x(!1)},"aria-label":"Fermer",children:e.jsx(R,{"aria-hidden":"true"})})]}),e.jsxs("div",{className:"country-picker-search",children:[e.jsx(T,{"aria-hidden":"true"}),e.jsx("input",{autoFocus:!0,value:v,onChange:a=>g(a.target.value),placeholder:"Rechercher un pays","aria-label":"Rechercher un pays"})]}),e.jsxs("div",{className:"country-picker-list",children:[L&&e.jsx("p",{className:"country-picker-empty",role:"status",children:"Liste locale temporaire affichée."}),y.filter(a=>a.name.toLowerCase().includes(v.trim().toLowerCase())).map(a=>e.jsxs("button",{onClick:()=>Y(a.code),className:`country-picker-row${i===a.code?" is-selected":""}`,"data-testid":`button-country-${a.code}`,children:[e.jsx("span",{className:"country-picker-name",children:a.name}),e.jsx("span",{className:"country-picker-prefix",children:a.code}),i===a.code&&e.jsx("span",{className:"country-picker-check",children:e.jsx(j,{"aria-hidden":"true"})})]},a.code)),y.length===0&&e.jsx("p",{className:"country-picker-empty",children:"Chargement des pays..."}),y.length>0&&y.filter(a=>a.name.toLowerCase().includes(v.trim().toLowerCase())).length===0&&e.jsx("p",{className:"country-picker-empty",children:"Aucun pays trouvé"})]})]})}),V&&e.jsx("div",{className:"country-picker-overlay",onClick:()=>{w(""),f(!1)},children:e.jsxs("section",{className:"country-picker",role:"dialog","aria-modal":"true","aria-label":"Choisir un opérateur de paiement",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"country-picker-header",children:[e.jsx("h2",{children:"Choisir un opérateur"}),e.jsx("button",{className:"country-picker-close",onClick:()=>{w(""),f(!1)},"aria-label":"Fermer",children:e.jsx(R,{"aria-hidden":"true"})})]}),e.jsxs("div",{className:"country-picker-search",children:[e.jsx(T,{"aria-hidden":"true"}),e.jsx("input",{autoFocus:!0,value:k,onChange:a=>w(a.target.value),placeholder:"Rechercher","aria-label":"Rechercher un opérateur"})]}),e.jsxs("div",{className:"country-picker-list",children:[A.filter(a=>a.toLowerCase().includes(k.trim().toLowerCase())).map(a=>e.jsxs("button",{onClick:()=>J(a),className:`country-picker-row${u===a?" is-selected":""}`,"data-testid":`button-bank-${a}`,children:[e.jsx("span",{children:a}),u===a&&e.jsx("span",{className:"country-picker-check",children:e.jsx(j,{"aria-hidden":"true"})})]},a)),A.filter(a=>a.toLowerCase().includes(k.trim().toLowerCase())).length===0&&e.jsx("p",{className:"country-picker-empty",children:"Aucun opérateur trouvé"})]})]})})]})]}):e.jsxs("div",{className:`wallet-page wallet-scene-page${o?" is-select-mode":""}`,children:[e.jsx("style",{children:K}),e.jsxs("div",{className:"wallet-shell",children:[e.jsxs("header",{className:"wallet-topbar",children:[e.jsx(se,{href:ee,children:e.jsx("button",{className:"wallet-back","data-testid":"button-back","aria-label":"Retour",children:e.jsx(q,{size:19})})}),e.jsxs("div",{className:"wallet-heading",children:[e.jsx("span",{className:"wallet-eyebrow",children:o?"Retrait":"Sécurité du compte"}),e.jsx("h1",{className:"wallet-title",children:o?"Sélectionner un compte":"Liste des comptes bancaires"})]}),o?e.jsx("div",{className:"w-10","aria-hidden":"true"}):e.jsx("button",{onClick:()=>p(!0),className:"wallet-top-action","data-testid":"button-add-wallet-icon","aria-label":"Ajouter une carte",children:e.jsx(D,{size:19})})]}),e.jsx("main",{className:"wallet-content",children:ae&&e.jsx(e.Fragment,{children:e.jsxs("section",{className:"wallet-section wallet-list-section",children:[e.jsxs("div",{className:"wallet-section-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"wallet-section-title",children:"Comptes enregistrés"}),e.jsx("p",{className:"wallet-section-caption",children:s?.length?`${s.length} compte${s.length>1?"s":""} disponible${s.length>1?"s":""}`:"Aucun compte ajouté"})]}),e.jsx("span",{className:"wallet-step",children:e.jsx(W,{size:13})})]}),G?e.jsx("div",{className:"flex justify-center py-12",children:e.jsx(F,{className:"w-6 h-6 animate-spin text-[#bd304c]"})}):s&&s.length>0?e.jsx("div",{className:"wallet-list",children:s.map(a=>e.jsx("div",{className:"wallet-card-wrap",children:e.jsxs("article",{onClick:()=>o&&U(a),className:`wallet-card${o?" is-selectable":" is-compact"}${a.isDefault?" is-default":""}`,"data-testid":`wallet-card-${a.id}`,children:[o?e.jsxs("div",{className:"wallet-card-copy",children:[e.jsxs("div",{className:"wallet-card-brand",children:[e.jsxs("div",{className:"wallet-card-brand-start",children:[e.jsx("img",{className:"wallet-card-icon",src:ye(a.paymentMethod),alt:"","aria-hidden":"true"}),e.jsx("p",{className:"wallet-card-method",children:a.paymentMethod})]}),e.jsx("span",{className:"wallet-card-type",children:"RETRAIT"})]}),e.jsx("p",{className:"wallet-card-number",children:be(a.accountNumber)}),e.jsxs("div",{className:"wallet-card-bottomline",children:[e.jsxs("span",{className:"wallet-card-network",children:[e.jsx(we,{size:17,"aria-hidden":"true"}),e.jsx("span",{children:b.find(r=>r.code===a.country)?.name||a.country||"Compte de retrait"})]}),e.jsx("span",{className:"wallet-card-chip","aria-hidden":"true"})]})]}):e.jsxs("div",{className:"wallet-account-row",children:[e.jsx("span",{className:"wallet-account-icon","aria-hidden":"true",children:e.jsx(W,{size:23,strokeWidth:2})}),e.jsxs("div",{className:"wallet-account-copy",children:[e.jsx("p",{className:"wallet-account-method",children:a.paymentMethod}),e.jsx("p",{className:"wallet-account-name",children:a.accountName}),e.jsx("p",{className:"wallet-account-number",children:a.accountNumber})]}),e.jsxs("div",{className:"wallet-card-actions",children:[a.isDefault?e.jsx("span",{className:"wallet-default-indicator",role:"img","aria-label":"Compte par défaut",title:"Compte par défaut",children:e.jsx(j,{size:17,"aria-hidden":"true"})}):e.jsx("button",{onClick:()=>$.mutate(a.id),disabled:$.isPending,className:"wallet-icon-action","data-testid":`button-set-default-${a.id}`,"aria-label":"Définir comme compte par défaut",title:"Définir comme compte par défaut",children:e.jsx(j,{size:17,"aria-hidden":"true"})}),e.jsx("button",{onClick:()=>M.mutate(a.id),disabled:M.isPending,className:"wallet-icon-action","data-testid":`button-delete-wallet-${a.id}`,"aria-label":"Supprimer ce compte",title:"Supprimer ce compte",children:e.jsx(ue,{size:17,"aria-hidden":"true"})})]})]}),o&&e.jsx(me,{size:18,className:"text-white flex-shrink-0"})]})},a.id))}):e.jsxs("div",{className:"wallet-empty",children:[e.jsx("img",{src:fe,alt:""}),e.jsx("p",{children:"Aucun compte bancaire enregistré"}),e.jsx("p",{children:"Ajoutez un compte pour effectuer vos retraits."})]})]})})}),!o&&e.jsx("div",{className:"wallet-scene-add",children:e.jsxs("button",{onClick:()=>p(!0),className:"wallet-primary","data-testid":"button-add-wallet",children:[e.jsx(D,{size:18}),"Ajouter"]})})]})]})}export{Te as default};

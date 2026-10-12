import { useState } from "react";
import {
  ChevronDown,
  Code2,
  Eye,
  EyeOff,
  LockKeyhole,
  Smartphone,
} from "lucide-react";
import "./_group.css";
import "./auth-preview.css";

type AuthPreviewProps = {
  mode: "login" | "register";
  legacy?: boolean;
};

export function AuthPreview({ mode, legacy = false }: AuthPreviewProps) {
  const isRegister = mode === "register";
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const background = isRegister
    ? "/__mockup/equinor-register.jpg"
    : "/__mockup/equinor-login.jpg";

  return (
    <main
      className={`auth-preview-page ${legacy ? "auth-preview-legacy" : "auth-preview-equinor"} ${isRegister ? "auth-preview-register" : "auth-preview-login"}`}
      style={{ backgroundImage: legacy ? undefined : `url("${background}")` }}
    >
      <div className="auth-preview-screen">
        <section className="auth-preview-panel" aria-label={isRegister ? "Inscription Equinor" : "Connexion Equinor"}>
          {legacy && (
            <>
              <h1 className="auth-preview-brand">Equinor</h1>
              <img
                className="auth-preview-old-image"
                src="/__mockup/auth-chargepoint-combined.png"
                alt=""
              />
            </>
          )}
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="auth-preview-fields">
              <div className="auth-preview-field">
                <button className="auth-preview-country" type="button" aria-label="Choisir le pays">
                  <Smartphone aria-hidden="true" />
                  <span>+225</span>
                  <ChevronDown aria-hidden="true" />
                </button>
                <input type="tel" placeholder="Numéro de téléphone" aria-label="Numéro de téléphone" />
              </div>
              <div className="auth-preview-field">
                <LockKeyhole className="auth-preview-field-icon" aria-hidden="true" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Mot de passe"
                  aria-label="Mot de passe"
                />
                <button
                  className="auth-preview-eye"
                  type="button"
                  aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  onClick={() => setPasswordVisible((visible) => !visible)}
                >
                  {passwordVisible ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {isRegister && (
                <>
                  <div className="auth-preview-field">
                    <LockKeyhole className="auth-preview-field-icon" aria-hidden="true" />
                    <input
                      type={confirmationVisible ? "text" : "password"}
                      placeholder="Confirmer le mot de passe"
                      aria-label="Confirmer le mot de passe"
                    />
                    <button
                      className="auth-preview-eye"
                      type="button"
                      aria-label={confirmationVisible ? "Masquer la confirmation" : "Afficher la confirmation"}
                      onClick={() => setConfirmationVisible((visible) => !visible)}
                    >
                      {confirmationVisible ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  <div className="auth-preview-field">
                    <Code2 className="auth-preview-field-icon" aria-hidden="true" />
                    <input placeholder="Code d’invitation" aria-label="Code d’invitation" />
                  </div>
                </>
              )}
            </div>
            <button className="auth-preview-switch" type="button">
              {isRegister ? "Aller à la connexion >" : "Aller à l'inscription >"}
            </button>
            <button className="auth-preview-submit" type="submit">
              {isRegister ? "S'inscrire" : "Se connecter"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

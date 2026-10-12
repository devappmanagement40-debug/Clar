import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { FALLBACK_COUNTRIES, type ApiCountry } from "@/lib/countries";
import { CountrySelector } from "@/components/country-selector";
import { ChevronDown, Loader2, Smartphone } from "lucide-react";
import registerBackground from "@assets/0_45533_1791799295363.jpg";
import "./auth-pages.css";

const registerSchema = z.object({
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  country: z.string().min(2, "Sélectionnez un pays"),
  password: z.string().min(6, "Au moins 6 caractères"),
  confirmPassword: z.string().min(1, "Confirmez le mot de passe"),
  invitationCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const { register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const params = new URLSearchParams(searchString);
  // Referral links use /html/register?code=ABC123.
  const currentInvitationMatch = searchString.match(/[?&]code=([^&?#]+)/i);
  const refCode = currentInvitationMatch?.[1]
    || params.get("money")
    || params.get("reg")
    || params.get("code")
    || "";

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      country: "CI",
      password: "",
      confirmPassword: "",
      invitationCode: refCode,
    },
  });

  const { data: apiCountries, isLoading: countriesLoading } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
  });

  const selectedCountry = form.watch("country");

  useEffect(() => {
    if (!apiCountries || apiCountries.length === 0) return;
    const isValid = apiCountries.some(ac => ac.code === selectedCountry && ac.isActive);
    if (!isValid) {
      const first = apiCountries.find(ac => ac.isActive);
      if (first) form.setValue("country", first.code);
    }
  }, [apiCountries, selectedCountry, form]);

  const countryData = (() => {
    if (apiCountries !== undefined) {
      const c = apiCountries.find(ac => ac.code === selectedCountry && ac.isActive);
      if (c) return { phonePrefix: c.phonePrefix, name: c.name };
      return null;
    }
    const f = FALLBACK_COUNTRIES.find(fc => fc.code === selectedCountry);
    return f ? { phonePrefix: f.phonePrefix, name: f.name } : null;
  })();

  async function onSubmit(data: RegisterForm) {
    setIsLoading(true);
    try {
      await register({
        fullName: `User_${data.phone}`,
        phone: data.phone,
        country: data.country,
        password: data.password,
        invitationCode: data.invitationCode,
      });
      toast({ title: "Inscription réussie !", description: "Bienvenue sur Equinor !" });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Inscription impossible", description: error.message || "Vérifiez vos informations et réessayez.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  const displayedPrefix = countryData?.phonePrefix || (countriesLoading ? "..." : "");

  return (
    <main className="auth-reference auth-register">
      <img className="auth-background-image" src={registerBackground} alt="" aria-hidden="true" />
      <div className="auth-screen">
        <section className="auth-panel" aria-labelledby="register-title">
          <h1 id="register-title" className="auth-visually-hidden">Créer un compte Equinor</h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("country")} />

            <div className="auth-fields">
               <div className={`auth-field${form.formState.errors.phone || form.formState.errors.country ? " has-error" : ""}`}>
                 <button type="button" className="auth-prefix" onClick={() => setCountryModalOpen(true)} data-testid="button-select-country" aria-label={`Choisir le pays${countryData ? `, ${countryData.name}, indicatif +${displayedPrefix}` : ""}`} aria-haspopup="dialog" aria-expanded={countryModalOpen} aria-describedby={form.formState.errors.country ? "register-country-error" : undefined}>
                    <Smartphone aria-hidden="true" />
                  <span>+{displayedPrefix}</span>
                   <ChevronDown className="auth-country-arrow" aria-hidden="true" />
                </button>
                  <input {...form.register("phone")} type="tel" inputMode="tel" autoComplete="username" placeholder="Entrez votre numéro de téléphone" aria-label="Numéro de téléphone" aria-invalid={!!form.formState.errors.phone} aria-describedby={form.formState.errors.phone ? "register-phone-error" : undefined} data-testid="input-phone" />
              </div>
               {form.formState.errors.country && <p id="register-country-error" role="alert" className="auth-error">{form.formState.errors.country.message}</p>}
               {form.formState.errors.phone && <p id="register-phone-error" role="alert" className="auth-error">{form.formState.errors.phone.message}</p>}

               <div className={`auth-field${form.formState.errors.password ? " has-error" : ""}`}>
                 <svg className="auth-field-icon auth-solid-lock" viewBox="0 0 24 24" aria-hidden="true">
                   <path d="M7 10V7a5 5 0 0 1 10 0v3h1.25A2.75 2.75 0 0 1 21 12.75v7.5A2.75 2.75 0 0 1 18.25 23h-12.5A2.75 2.75 0 0 1 3 20.25v-7.5A2.75 2.75 0 0 1 5.75 10H7Zm2.2 0h5.6V7a2.8 2.8 0 0 0-5.6 0v3Z" />
                   <circle cx="12" cy="16" r="1.35" fill="#fff" />
                   <path d="M11.3 16h1.4l.55 2.8h-2.5l.55-2.8Z" fill="#fff" />
                 </svg>
                   <input {...form.register("password")} type="password" autoComplete="new-password" placeholder="Entrez votre mot de passe" aria-label="Mot de passe" aria-invalid={!!form.formState.errors.password} aria-describedby={form.formState.errors.password ? "register-password-error" : undefined} data-testid="input-password" />
              </div>
               {form.formState.errors.password && <p id="register-password-error" role="alert" className="auth-error">{form.formState.errors.password.message}</p>}

               <div className={`auth-field${form.formState.errors.confirmPassword ? " has-error" : ""}`}>
                 <svg className="auth-field-icon auth-solid-lock" viewBox="0 0 24 24" aria-hidden="true">
                   <path d="M7 10V7a5 5 0 0 1 10 0v3h1.25A2.75 2.75 0 0 1 21 12.75v7.5A2.75 2.75 0 0 1 18.25 23h-12.5A2.75 2.75 0 0 1 3 20.25v-7.5A2.75 2.75 0 0 1 5.75 10H7Zm2.2 0h5.6V7a2.8 2.8 0 0 0-5.6 0v3Z" />
                   <circle cx="12" cy="16" r="1.35" fill="#fff" />
                   <path d="M11.3 16h1.4l.55 2.8h-2.5l.55-2.8Z" fill="#fff" />
                 </svg>
                   <input {...form.register("confirmPassword")} type="password" autoComplete="new-password" placeholder="Saisissez à nouveau le mot de passe" aria-label="Confirmer le mot de passe" aria-invalid={!!form.formState.errors.confirmPassword} aria-describedby={form.formState.errors.confirmPassword ? "register-confirm-error" : undefined} data-testid="input-confirm-password" />
              </div>
               {form.formState.errors.confirmPassword && <p id="register-confirm-error" role="alert" className="auth-error">{form.formState.errors.confirmPassword.message}</p>}

              <div className="auth-field">
                 <svg className="auth-field-icon auth-solid-user" viewBox="0 0 24 24" aria-hidden="true">
                   <circle cx="12" cy="7" r="4" />
                   <path d="M4 21v-1.2A7.8 7.8 0 0 1 11.8 12h.4a7.8 7.8 0 0 1 7.8 7.8V21H4Z" />
                 </svg>
                  <span className="auth-invitation-prefix" aria-hidden="true">+</span>
                  <input {...form.register("invitationCode")} placeholder="Code d'invitation" aria-label="Code d'invitation" data-testid="input-invitation-code" />
              </div>
            </div>

            <button type="button" className="auth-switch" onClick={() => navigate("/login")} data-testid="link-login">Aller à la connexion &gt;</button>
            <button type="submit" disabled={isLoading} className="auth-submit" data-testid="button-register">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "S’inscrire"}
            </button>
          </form>
        </section>
      </div>

      <CountrySelector selectedCountryCode={selectedCountry} open={countryModalOpen} onClose={() => setCountryModalOpen(false)} onSelect={(code) => form.setValue("country", code, { shouldValidate: true })} />
    </main>
  );
}

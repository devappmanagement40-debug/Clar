import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { FALLBACK_COUNTRIES, type ApiCountry } from "@/lib/countries";
import { CountrySelector } from "@/components/country-selector";
import { ChevronDown, Eye, EyeOff, Loader2, LockKeyhole, Smartphone } from "lucide-react";
import loginBackground from "@assets/0_45528_1791799291731.jpg";
import "./auth-pages.css";

const loginSchema = z.object({
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  country: z.string().min(2, "Sélectionnez un pays"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      country: "NE",
      password: "",
    },
  });

  const { data: apiCountries, isLoading: countriesLoading } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
  });

  const selectedCountry = form.watch("country");

  useEffect(() => {
    // Remove credentials persisted by versions that stored login data locally.
    localStorage.removeItem("doosan_credentials");
    localStorage.removeItem("doosan_login_preferences");
  }, []);

  useEffect(() => {
    if (!apiCountries || apiCountries.length === 0) return;
    const isValid = apiCountries.some(ac => ac.code === selectedCountry && ac.isActive);
    // Keep a remembered/selected country long enough for the server to apply
    // the administrator-only cross-country login rule.
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

  async function onSubmit(data: LoginForm) {
    setIsLoading(true);
    try {
      await login(data.phone, data.country, data.password);
      navigate("/");
    } catch (error: any) {
      toast({ title: "Connexion impossible", description: error.message || "Vérifiez votre numéro et votre mot de passe.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  const displayedPrefix = countryData?.phonePrefix || (countriesLoading ? "..." : "");

  return (
    <main className="auth-reference auth-login" style={{ backgroundImage: `url("${loginBackground}")` }}>
      <div className="auth-screen">
        <section className="auth-panel" aria-labelledby="login-title">
          <h1 id="login-title" className="auth-visually-hidden">Connexion à Equinor</h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("country")} />

            <div className="auth-fields">
               <div className={`auth-field${form.formState.errors.phone || form.formState.errors.country ? " has-error" : ""}`}>
                 <button type="button" className="auth-prefix" onClick={() => setCountryModalOpen(true)} data-testid="button-select-country" aria-label={`Choisir le pays${countryData ? `, ${countryData.name}, indicatif +${displayedPrefix}` : ""}`} aria-haspopup="dialog" aria-expanded={countryModalOpen} aria-describedby={form.formState.errors.country ? "login-country-error" : undefined}>
                    <Smartphone aria-hidden="true" />
                  <span>+{displayedPrefix}</span>
                   <ChevronDown className="auth-country-arrow" aria-hidden="true" />
                </button>
                 <input {...form.register("phone")} type="tel" inputMode="tel" autoComplete="username" placeholder="Numéro de téléphone" aria-label="Numéro de téléphone" aria-invalid={!!form.formState.errors.phone} aria-describedby={form.formState.errors.phone ? "login-phone-error" : undefined} data-testid="input-phone" />
              </div>
               {form.formState.errors.country && <p id="login-country-error" role="alert" className="auth-error">{form.formState.errors.country.message}</p>}
               {form.formState.errors.phone && <p id="login-phone-error" role="alert" className="auth-error">{form.formState.errors.phone.message}</p>}

               <div className={`auth-field${form.formState.errors.password ? " has-error" : ""}`}>
                <LockKeyhole className="auth-field-icon" aria-hidden="true" />
                 <input {...form.register("password")} type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Mot de passe" aria-label="Mot de passe" aria-invalid={!!form.formState.errors.password} aria-describedby={form.formState.errors.password ? "login-password-error" : undefined} data-testid="input-password" />
                 <button type="button" className="auth-visibility" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={showPassword}>
                   {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                 </button>
              </div>
               {form.formState.errors.password && <p id="login-password-error" role="alert" className="auth-error">{form.formState.errors.password.message}</p>}
            </div>

            <button type="button" className="auth-switch" onClick={() => navigate("/register")} data-testid="link-register">Aller à l'inscription &gt;</button>
            <button type="submit" disabled={isLoading} className="auth-submit" data-testid="button-login">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Se connecter"}
            </button>
          </form>
        </section>
      </div>

      <CountrySelector selectedCountryCode={selectedCountry} open={countryModalOpen} onClose={() => setCountryModalOpen(false)} onSelect={(code) => form.setValue("country", code, { shouldValidate: true })} />
    </main>
  );
}

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
import { ChevronDown, Code2, Eye, EyeOff, Loader2, LockKeyhole, Smartphone } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      country: "NE",
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
    <main className="auth-reference auth-register" style={{ backgroundImage: `url("${registerBackground}")` }}>
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
                 <input {...form.register("phone")} type="tel" inputMode="tel" autoComplete="username" placeholder="Numéro de téléphone" aria-label="Numéro de téléphone" aria-invalid={!!form.formState.errors.phone} aria-describedby={form.formState.errors.phone ? "register-phone-error" : undefined} data-testid="input-phone" />
              </div>
               {form.formState.errors.country && <p id="register-country-error" role="alert" className="auth-error">{form.formState.errors.country.message}</p>}
               {form.formState.errors.phone && <p id="register-phone-error" role="alert" className="auth-error">{form.formState.errors.phone.message}</p>}

               <div className={`auth-field${form.formState.errors.password ? " has-error" : ""}`}>
                <LockKeyhole className="auth-field-icon" aria-hidden="true" />
                 <input {...form.register("password")} type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Mot de passe" aria-label="Mot de passe" aria-invalid={!!form.formState.errors.password} aria-describedby={form.formState.errors.password ? "register-password-error" : undefined} data-testid="input-password" />
                 <button type="button" className="auth-visibility" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={showPassword}>
                   {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                 </button>
              </div>
               {form.formState.errors.password && <p id="register-password-error" role="alert" className="auth-error">{form.formState.errors.password.message}</p>}

               <div className={`auth-field${form.formState.errors.confirmPassword ? " has-error" : ""}`}>
                <LockKeyhole className="auth-field-icon" aria-hidden="true" />
                 <input {...form.register("confirmPassword")} type={showConfirmation ? "text" : "password"} autoComplete="new-password" placeholder="Confirmer le mot de passe" aria-label="Confirmer le mot de passe" aria-invalid={!!form.formState.errors.confirmPassword} aria-describedby={form.formState.errors.confirmPassword ? "register-confirm-error" : undefined} data-testid="input-confirm-password" />
                 <button type="button" className="auth-visibility" onClick={() => setShowConfirmation((value) => !value)} aria-label={showConfirmation ? "Masquer la confirmation" : "Afficher la confirmation"} aria-pressed={showConfirmation}>
                   {showConfirmation ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                 </button>
              </div>
               {form.formState.errors.confirmPassword && <p id="register-confirm-error" role="alert" className="auth-error">{form.formState.errors.confirmPassword.message}</p>}

              <div className="auth-field">
                <Code2 className="auth-field-icon" aria-hidden="true" />
                 <input {...form.register("invitationCode")} placeholder="Code d'invitation" aria-label="Code d'invitation" data-testid="input-invitation-code" />
              </div>
            </div>

            <button type="button" className="auth-switch" onClick={() => navigate("/login")} data-testid="link-login">Aller à la connexion &gt;</button>
            <button type="submit" disabled={isLoading} className="auth-submit" data-testid="button-register">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "S'inscrire"}
            </button>
          </form>
        </section>
      </div>

      <CountrySelector selectedCountryCode={selectedCountry} open={countryModalOpen} onClose={() => setCountryModalOpen(false)} onSelect={(code) => form.setValue("country", code, { shouldValidate: true })} />
    </main>
  );
}

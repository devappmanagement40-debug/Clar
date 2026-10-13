import { useEffect, useState, type FormEvent } from "react";
import "./fortune-wheel.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { AlertTriangle, Check, CircleHelp, Plus, Save, ShieldCheck, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WheelConfig, WheelPrize } from "./types";

const blankConfig: WheelConfig = { isEnabled: false, spinsPerDay: 1, prizes: [] };
const newPrize = (): WheelPrize => ({ id: crypto.randomUUID(), label: "", amount: 0, weight: 1, isActive: true });

export default function FortuneWheelAdminEditor() {
  const [config, setConfig] = useState<WheelConfig>(blankConfig);
  const [hasEdited, setHasEdited] = useState(false);
  const configQuery = useQuery<WheelConfig>({ queryKey: ["/api/admin/fortune-wheel"] });

  useEffect(() => {
    if (configQuery.data && !hasEdited) setConfig(configQuery.data);
  }, [configQuery.data, hasEdited]);

  const saveMutation = useMutation({
    mutationFn: async (next: WheelConfig): Promise<WheelConfig> => {
      const response = await apiRequest("PUT", "/api/admin/fortune-wheel", next);
      if (!response.ok) {
        let message = "La configuration n’a pas pu être enregistrée.";
        try {
          const error = await response.json();
          message = error.message || message;
        } catch { /* Keep the French fallback message. */ }
        throw new Error(message);
      }
      return response.json();
    },
    onSuccess: (saved) => {
      setConfig(saved);
      setHasEdited(false);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/fortune-wheel"] });
      queryClient.invalidateQueries({ queryKey: ["/api/fortune-wheel"] });
    },
  });

  const updateConfig = (patch: Partial<WheelConfig>) => {
    setHasEdited(true);
    setConfig((current) => ({ ...current, ...patch }));
  };

  const updatePrize = (id: string, patch: Partial<WheelPrize>) => {
    updateConfig({ prizes: config.prizes.map((prize) => prize.id === id ? { ...prize, ...patch } : prize) });
  };

  const removePrize = (id: string) => updateConfig({ prizes: config.prizes.filter((prize) => prize.id !== id) });

  const addPrize = () => {
    if (config.prizes.length >= 20) return;
    updateConfig({ prizes: [...config.prizes, newPrize()] });
  };

  const invalidPrize = config.prizes.some((prize) =>
    !prize.label.trim()
    || !Number.isInteger(prize.amount)
    || prize.amount < 0
    || prize.amount > 100000000
    || !Number.isInteger(prize.weight)
    || prize.weight < 1
    || prize.weight > 100000
  );
  const invalidLimit = !Number.isInteger(config.spinsPerDay) || config.spinsPerDay < 1 || config.spinsPerDay > 100;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (invalidPrize || invalidLimit) return;
    saveMutation.mutate(config);
  };

  const loading = configQuery.isLoading;

  return (
    <section className="fwa-root" aria-labelledby="fwa-title">
      <div className="fwa-heading">
        <div className="fwa-heading-icon"><ShieldCheck size={21} /></div>
        <div><span className="fwa-eyebrow">GESTION DES RÉCOMPENSES</span><h2 id="fwa-title">Roue de la fortune</h2></div>
        <span className={`fwa-state ${config.isEnabled ? "is-on" : ""}`}><i />{config.isEnabled ? "Activée" : "Désactivée"}</span>
      </div>

      {loading ? (
        <div className="fwa-loading" aria-label="Chargement de la configuration"><span /><span /><span /></div>
      ) : configQuery.isError ? (
        <div className="fwa-message fwa-error" role="alert"><AlertTriangle size={18} /><span>Impossible de charger les paramètres.</span><Button variant="outline" size="sm" onClick={() => configQuery.refetch()}>Réessayer</Button></div>
      ) : (
        <form onSubmit={submit}>
          <div className="fwa-controls">
            <div className="fwa-enable">
              <div><strong>Activer la roue</strong><span>Les membres peuvent participer lorsque cette option est active.</span></div>
              <button
                type="button"
                role="switch"
                aria-checked={config.isEnabled}
                aria-label="Activer ou désactiver la roue"
                className={`fwa-switch ${config.isEnabled ? "is-on" : ""}`}
                onClick={() => updateConfig({ isEnabled: !config.isEnabled })}
              ><span /></button>
            </div>
            <div className="fwa-limit">
              <Label htmlFor="fwa-spins">Tirages par membre / jour</Label>
              <Input id="fwa-spins" type="number" min="1" max="100" step="1" value={config.spinsPerDay} onChange={(event) => updateConfig({ spinsPerDay: Math.min(100, Math.max(1, Number(event.target.value) || 1)) })} />
            </div>
          </div>

          <div className="fwa-prize-head">
            <div><span className="fwa-eyebrow">COMPOSITION</span><h3>Lots et probabilités relatives</h3></div>
            <Button type="button" variant="outline" className="fwa-add" onClick={addPrize} disabled={config.prizes.length >= 20}><Plus size={16} /> Ajouter un lot</Button>
          </div>

          {config.prizes.length ? (
            <div className="fwa-prize-table">
              <div className="fwa-table-labels"><span>LOT / LIBELLÉ</span><span>MONTANT · XOF</span><span>POIDS</span><span>STATUT</span><span /></div>
              {config.prizes.map((prize, index) => (
                <div className={`fwa-prize-row ${!prize.isActive ? "is-inactive" : ""}`} key={prize.id}>
                  <div className="fwa-prize-title"><span>{String(index + 1).padStart(2, "0")}</span><Input aria-label={`Libellé du lot ${index + 1}`} value={prize.label} placeholder="Nom de la récompense" onChange={(event) => updatePrize(prize.id, { label: event.target.value })} /></div>
                  <div className="fwa-field-with-unit"><Input aria-label={`Montant du lot ${index + 1} en XOF`} type="number" min="0" max="100000000" step="1" value={prize.amount} onChange={(event) => updatePrize(prize.id, { amount: event.target.value === "" ? 0 : Number(event.target.value) })} /><span>XOF</span></div>
                  <Input aria-label={`Poids relatif du lot ${index + 1}`} type="number" min="1" max="100000" step="1" value={prize.weight} onChange={(event) => updatePrize(prize.id, { weight: event.target.value === "" ? 0 : Number(event.target.value) })} />
                  <button type="button" className={`fwa-active-toggle ${prize.isActive ? "is-active" : ""}`} onClick={() => updatePrize(prize.id, { isActive: !prize.isActive })} aria-pressed={prize.isActive} aria-label={`${prize.isActive ? "Désactiver" : "Activer"} ${prize.label || `le lot ${index + 1}`}`}>
                    {prize.isActive ? <><Check size={14} /> Actif</> : <><X size={14} /> Inactif</>}
                  </button>
                  <Button type="button" variant="ghost" size="icon" className="fwa-delete" aria-label={`Supprimer ${prize.label || `le lot ${index + 1}`}`} onClick={() => removePrize(prize.id)}><Trash2 size={17} /></Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="fwa-empty"><CircleHelp size={22} /><div><strong>Aucun lot configuré</strong><span>Ajoutez au moins un lot avant d’activer la roue.</span></div></div>
          )}

          <div className="fwa-bottom">
            <div className="fwa-hint"><CircleHelp size={15} /><span>Le poids est relatif : un poids plus élevé augmente la chance de tirage, sans garantir le résultat.</span></div>
          <Button type="submit" className="fwa-save" disabled={saveMutation.isPending || invalidPrize || invalidLimit || loading}><Save size={16} />{saveMutation.isPending ? "Enregistrement…" : "Enregistrer les paramètres"}</Button>
          </div>
          {saveMutation.isError ? <div className="fwa-message fwa-error" role="alert"><AlertTriangle size={17} />{saveMutation.error.message}</div> : null}
          {saveMutation.isSuccess && !hasEdited ? <div className="fwa-message fwa-success" role="status"><Check size={17} />Configuration enregistrée.</div> : null}
          {invalidPrize ? <p className="fwa-validation" role="status">Chaque lot doit avoir un libellé, un montant entier compris entre 0 et 100 000 000 XOF et un poids entier compris entre 1 et 100 000.</p> : null}
          {invalidLimit ? <p className="fwa-validation" role="status">La limite doit être un nombre entier entre 1 et 100 tirages par jour.</p> : null}
        </form>
      )}
    </section>
  );
}

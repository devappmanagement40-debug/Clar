export interface WheelPrize {
  id: string;
  label: string;
  amount: number;
  weight: number;
  isActive: boolean;
}

export interface WheelConfig {
  isEnabled: boolean;
  spinsPerDay: number;
  prizes: WheelPrize[];
}

export interface WheelPageData {
  isEnabled: boolean;
  spinsPerDay: number;
  spinsUsed: number;
  spinsRemaining: number;
  prizes: WheelPrize[];
}

export interface WheelSpinResult {
  prize: { id: string; label: string; amount: number };
  balance: string;
  spinsRemaining: number;
}

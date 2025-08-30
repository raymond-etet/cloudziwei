// U本位合约计算器相关类型定义

export interface CalculationParams {
  entryPrice: number;
  stopLossPrice: number;
  stopLossAmount: number;
  leverage?: number;
}

export interface CalculationResult {
  requiredLeverage: number | null;
  requiredMargin: number | null;
  positionType: "long" | "short" | null;
  totalFee: number | null;
}

export interface CommissionRate {
  symbol: string;
  makerCommissionRate: string;
  takerCommissionRate: string;
}

export interface FundingRate {
  symbol: string;
  adjustedFundingRateCap: string;
  adjustedFundingRateFloor: string;
  fundingIntervalHours: number;
}

export interface BinanceData {
  commissionRate: CommissionRate | null;
  fundingRate: FundingRate | null;
  currentPrice: number | null;
  loading: boolean;
  error: string | null;
}

export interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  step?: string;
  min?: string;
  max?: string;
  button?: {
    text: string;
    onClick: () => void;
    className?: string;
  };
}

export interface SymbolSelectorProps {
  symbols: string[];
  value: string;
  onChange: (value: string) => void;
}

export interface CalculationResultsProps {
  requiredLeverage: number | null;
  requiredMargin: number | null;
  positionType: "long" | "short" | null;
  hasLeverage: boolean;
  totalFee?: number | null;
}

export interface DisplayInfoProps {
  symbol: string;
  commissionRate: CommissionRate | null;
  fundingRate: FundingRate | null;
  loading: boolean;
  error: string | null;
}

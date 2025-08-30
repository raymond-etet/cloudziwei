"use client";

import type { SymbolSelectorProps } from "../../types/calculator";

export function SymbolSelector({ symbols, value, onChange }: SymbolSelectorProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">交易对</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
    </div>
  );
}

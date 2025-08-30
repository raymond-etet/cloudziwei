"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from "react";
import type {
  BinanceData,
  CommissionRate,
  FundingRate,
} from "../types/calculator";

export function useBinanceData() {
  const [data, setData] = useState<BinanceData>({
    commissionRate: null,
    fundingRate: null,
    currentPrice: null,
    loading: false,
    error: null,
  });

  const fetchSymbolData = useCallback(async (symbol: string) => {
    setData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // 使用代理或者直接调用（在 Edge Runtime 中）
      const baseUrl = "https://fapi.binance.com";

      // 获取最新价格
      const priceRes = await fetch(
        `${baseUrl}/fapi/v1/ticker/price?symbol=${symbol}`
      );
      if (!priceRes.ok) {
        throw new Error(`获取价格失败: ${priceRes.status}`);
      }
      const priceData = await priceRes.json();

      // 模拟手续费率数据（因为币安API需要认证）
      const mockCommissionRate: CommissionRate = {
        symbol: symbol,
        makerCommissionRate: "0.0002", // 万2
        takerCommissionRate: "0.0004", // 万4
      };

      // 模拟资金费率数据
      const mockFundingRate: FundingRate = {
        symbol: symbol,
        adjustedFundingRateCap: "0.0075",
        adjustedFundingRateFloor: "-0.0075",
        fundingIntervalHours: 8,
      };

      setData({
        commissionRate: mockCommissionRate,
        fundingRate: mockFundingRate,
        currentPrice: parseFloat((priceData as any).price),
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("获取币安数据失败:", error);
      setData((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "获取数据失败",
      }));
    }
  }, []);

  return {
    ...data,
    fetchSymbolData,
  };
}

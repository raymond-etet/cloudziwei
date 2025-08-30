"use client";

import type { DisplayInfoProps } from "../../types/calculator";

export function DisplayInfo({
  symbol,
  commissionRate,
  fundingRate,
  loading,
  error,
}: DisplayInfoProps) {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">市场信息</h2>

        {loading && (
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner loading-sm"></span>
            <span>获取市场数据中...</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-base-content/70">交易对:</span>
              <span className="font-semibold">{symbol}</span>
            </div>

            {commissionRate && (
              <>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Maker 手续费:</span>
                  <span className="font-semibold">
                    {(parseFloat(commissionRate.makerCommissionRate) * 100).toFixed(4)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Taker 手续费:</span>
                  <span className="font-semibold">
                    {(parseFloat(commissionRate.takerCommissionRate) * 100).toFixed(4)}%
                  </span>
                </div>
              </>
            )}

            {fundingRate && (
              <>
                <div className="flex justify-between">
                  <span className="text-base-content/70">资金费率上限:</span>
                  <span className="font-semibold">
                    {(parseFloat(fundingRate.adjustedFundingRateCap) * 100).toFixed(4)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">资金费率下限:</span>
                  <span className="font-semibold">
                    {(parseFloat(fundingRate.adjustedFundingRateFloor) * 100).toFixed(4)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">资金费率周期:</span>
                  <span className="font-semibold">{fundingRate.fundingIntervalHours}小时</span>
                </div>
              </>
            )}
          </div>
        )}

        <div className="divider"></div>

        <div className="text-sm text-base-content/60">
          <p className="mb-2">💡 使用说明:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>输入开仓价、止损价和止损金额</li>
            <li>系统会自动计算建议的杠杆倍数</li>
            <li>也可以手动设置杠杆倍数查看所需保证金</li>
            <li>手续费按万2计算（开仓+平仓）</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

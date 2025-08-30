"use client";

import type { CalculationResultsProps } from "../../types/calculator";

export function CalculationResults({
  requiredLeverage,
  requiredMargin,
  positionType,
  hasLeverage,
  totalFee,
}: CalculationResultsProps) {
  const formatNumber = (num: number) => {
    return num.toFixed(4).replace(/\.?0+$/, "");
  };

  return (
    <div className="card bg-primary/10">
      <div className="card-body">
        <h2 className="card-title">计算结果</h2>

        {positionType && (
          <div className="mb-4">
            <div
              className={`badge ${
                positionType === "long" ? "badge-success" : "badge-error"
              } gap-2`}
            >
              {positionType === "long" ? "📈 做多" : "📉 做空"}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {!hasLeverage && requiredLeverage && (
            <div className="stat bg-base-100 rounded-lg">
              <div className="stat-title">建议杠杆倍数</div>
              <div className="stat-value text-primary">
                {formatNumber(requiredLeverage)}x
              </div>
              <div className="stat-desc">
                基于您的止损设置计算
              </div>
            </div>
          )}

          {requiredMargin && (
            <div className="stat bg-base-100 rounded-lg">
              <div className="stat-title">所需保证金</div>
              <div className="stat-value text-secondary">
                ${formatNumber(requiredMargin)}
              </div>
              <div className="stat-desc">
                {hasLeverage ? "基于您设置的杠杆倍数" : "基于建议杠杆倍数"}
              </div>
            </div>
          )}

          {totalFee && (
            <div className="stat bg-base-100 rounded-lg">
              <div className="stat-title">预估手续费</div>
              <div className="stat-value text-accent">
                ${formatNumber(totalFee)}
              </div>
              <div className="stat-desc">
                开仓 + 平仓手续费
              </div>
            </div>
          )}

          {!requiredLeverage && !requiredMargin && (
            <div className="alert alert-info">
              <span>请填写完整的交易参数以查看计算结果</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { UContractCalculator } from "../../../components/calculator/u-contract-calculator";

export const runtime = "edge";

export default function UContractCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-base-content">
          U本位合约计算器
        </h1>
        <p className="mt-2 text-base-content/70">精确计算您的合约交易参数</p>
      </div>

      <UContractCalculator />
    </div>
  );
}

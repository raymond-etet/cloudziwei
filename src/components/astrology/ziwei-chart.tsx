"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import type { ZiweiChart, ZiweiFormData, ChartType } from "../../types/ziwei";
import { ZiweiPalace } from "./ziwei-palace";

export const ZiweiChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ZiweiChart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<ChartType>("standard");

  const [formData, setFormData] = useState<ZiweiFormData>({
    birthday: "",
    birthTime: 0,
    gender: "male",
    name: "",
    location: "",
    birthdayType: "solar",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        birthday: formData.birthday,
        birthTime: formData.birthTime.toString(),
        gender: formData.gender,
        birthdayType: formData.birthdayType,
      });

      if (formData.name) params.append("name", formData.name);
      if (formData.location) params.append("location", formData.location);

      const response = await fetch(`/api/astrology/ziwei?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error((errorData as any).error || "排盘失败");
      }

      const data = await response.json();
      setChartData(data as ZiweiChart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "排盘过程中发生错误");
    } finally {
      setLoading(false);
    }
  };

  const timeOptions = [
    { value: 0, label: "子时 (23:00-01:00)" },
    { value: 1, label: "丑时 (01:00-03:00)" },
    { value: 2, label: "寅时 (03:00-05:00)" },
    { value: 3, label: "卯时 (05:00-07:00)" },
    { value: 4, label: "辰时 (07:00-09:00)" },
    { value: 5, label: "巳时 (09:00-11:00)" },
    { value: 6, label: "午时 (11:00-13:00)" },
    { value: 7, label: "未时 (13:00-15:00)" },
    { value: 8, label: "申时 (15:00-17:00)" },
    { value: 9, label: "酉时 (17:00-19:00)" },
    { value: 10, label: "戌时 (19:00-21:00)" },
    { value: 11, label: "亥时 (21:00-23:00)" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">🔮 紫微斗数排盘</h1>

      {/* 排盘表单 */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">排盘信息</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">姓名（可选）</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="请输入姓名"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">性别</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as "male" | "female",
                    })
                  }
                >
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">生日类型</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.birthdayType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      birthdayType: e.target.value as "solar" | "lunar",
                    })
                  }
                >
                  <option value="solar">阳历</option>
                  <option value="lunar">农历</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">生日</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">出生时辰</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.birthTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      birthTime: parseInt(e.target.value),
                    })
                  }
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">出生地（可选）</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="请输入出生地"
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "排盘中..." : "开始排盘"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="alert alert-error mb-8">
          <span>{error}</span>
        </div>
      )}

      {/* 排盘结果 */}
      {chartData && (
        <div className="space-y-8">
          {/* 基本信息 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">基本信息</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>性别:</strong> {chartData.gender}
                </div>
                <div>
                  <strong>阳历:</strong> {chartData.solarDate}
                </div>
                <div>
                  <strong>农历:</strong> {chartData.lunarDate}
                </div>
                <div>
                  <strong>八字:</strong> {chartData.chineseDate}
                </div>
                <div>
                  <strong>时辰:</strong> {chartData.time} ({chartData.timeRange}
                  )
                </div>
                <div>
                  <strong>星座:</strong> {chartData.sign}
                </div>
                <div>
                  <strong>生肖:</strong> {chartData.zodiac}
                </div>
                <div>
                  <strong>五行局:</strong> {chartData.fiveElementsClass}
                </div>
                <div>
                  <strong>命主:</strong> {chartData.soul}
                </div>
                <div>
                  <strong>身主:</strong> {chartData.body}
                </div>
                <div>
                  <strong>命宫:</strong> {chartData.earthlyBranchOfSoulPalace}
                </div>
                <div>
                  <strong>身宫:</strong> {chartData.earthlyBranchOfBodyPalace}
                </div>
              </div>
            </div>
          </div>

          {/* 星盘图 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">紫微斗数星盘</h2>

              {/* 图表类型选择 */}
              <div className="tabs tabs-boxed mb-4">
                <button
                  className={`tab ${
                    chartType === "standard" ? "tab-active" : ""
                  }`}
                  onClick={() => setChartType("standard")}
                >
                  标准盘
                </button>
                <button
                  className={`tab ${chartType === "sihua" ? "tab-active" : ""}`}
                  onClick={() => setChartType("sihua")}
                >
                  四化盘
                </button>
                <button
                  className={`tab ${chartType === "sanhe" ? "tab-active" : ""}`}
                  onClick={() => setChartType("sanhe")}
                >
                  三合盘
                </button>
              </div>

              {/* 星盘网格 */}
              <div className="ziwei-astrolabe">
                {Array.from({ length: 12 }, (_, palaceIndex) => {
                  const palace = chartData.palaces[palaceIndex];
                  if (!palace) return null;

                  return (
                    <ZiweiPalace
                      key={`palace-${palaceIndex}`}
                      palace={palace}
                      index={palaceIndex}
                      soulPalaceBranch={chartData.earthlyBranchOfSoulPalace}
                      bodyPalaceBranch={chartData.earthlyBranchOfBodyPalace}
                      chartType={chartType}
                    />
                  );
                })}

                {/* 中心区域显示基本信息 */}
                <div className="ziwei-center-area">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center rounded-lg border border-indigo-200 w-full h-full flex flex-col justify-center">
                    <div className="text-lg font-bold text-indigo-800 mb-4">
                      <span
                        className={`mr-2 ${
                          chartData.gender === "男"
                            ? "text-blue-600"
                            : "text-pink-600"
                        }`}
                      >
                        {chartData.gender === "男" ? "♂" : "♀"}
                      </span>
                      基本信息
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          五行局：
                        </span>
                        <span className="text-gray-700">
                          {chartData.fiveElementsClass}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          四柱：
                        </span>
                        <span className="text-gray-700 text-xs">
                          {chartData.chineseDate}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          阳历：
                        </span>
                        <span className="text-gray-700">
                          {chartData.solarDate}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          农历：
                        </span>
                        <span className="text-gray-700">
                          {chartData.lunarDate}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          时辰：
                        </span>
                        <span className="text-gray-700">
                          {chartData.time}({chartData.timeRange})
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          生肖：
                        </span>
                        <span className="text-gray-700">
                          {chartData.zodiac}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          星座：
                        </span>
                        <span className="text-gray-700">{chartData.sign}</span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          命主：
                        </span>
                        <span className="text-gray-700">{chartData.soul}</span>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-indigo-700 block">
                          身主：
                        </span>
                        <span className="text-gray-700">{chartData.body}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

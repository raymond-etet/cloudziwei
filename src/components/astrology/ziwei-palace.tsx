"use client";

import React from "react";
import type {
  ZiweiPalace as ZiweiPalaceType,
  ChartType,
} from "../../types/ziwei";

interface ZiweiPalaceProps {
  palace: ZiweiPalaceType;
  index: number;
  soulPalaceBranch: string;
  bodyPalaceBranch: string;
  chartType: ChartType;
}

export const ZiweiPalace: React.FC<ZiweiPalaceProps> = ({
  palace,
  index,
  soulPalaceBranch,
  bodyPalaceBranch,
  chartType,
}) => {
  // 判断是否为命宫或身宫
  const isSoulPalace = palace.earthlyBranch === soulPalaceBranch;
  const isBodyPalace = palace.earthlyBranch === bodyPalaceBranch;

  // 获取宫位样式类
  const getPalaceClass = () => {
    let baseClass = "ziwei-palace";

    if (isSoulPalace) baseClass += " soul-palace";
    if (isBodyPalace) baseClass += " body-palace";

    return baseClass;
  };

  // 根据图表类型过滤星曜
  const getFilteredStars = () => {
    switch (chartType) {
      case "sihua":
        // 四化盘只显示有四化的星曜
        return {
          majorStars: palace.majorStars.filter(
            (star) =>
              star.includes("化") ||
              star.includes("禄") ||
              star.includes("权") ||
              star.includes("科") ||
              star.includes("忌")
          ),
          minorStars: palace.minorStars.filter(
            (star) =>
              star.includes("化") ||
              star.includes("禄") ||
              star.includes("权") ||
              star.includes("科") ||
              star.includes("忌")
          ),
          adjectiveStars: palace.adjectiveStars.filter(
            (star) =>
              star.includes("化") ||
              star.includes("禄") ||
              star.includes("权") ||
              star.includes("科") ||
              star.includes("忌")
          ),
        };
      case "sanhe":
        // 三合盘显示所有星曜
        return {
          majorStars: palace.majorStars,
          minorStars: palace.minorStars,
          adjectiveStars: palace.adjectiveStars,
        };
      default:
        // 标准盘显示主要星曜
        return {
          majorStars: palace.majorStars,
          minorStars: palace.minorStars.slice(0, 3), // 限制显示数量
          adjectiveStars: palace.adjectiveStars.slice(0, 2),
        };
    }
  };

  const filteredStars = getFilteredStars();

  // 渲染星曜列表
  const renderStars = (stars: string[], className: string) => {
    if (!stars.length) return null;

    return (
      <div className={`star-group ${className}`}>
        {stars.map((star, idx) => {
          // 检测四化星曜并添加相应的 data 属性
          let sihuaType = "";
          if (star.includes("化禄")) sihuaType = "lu";
          else if (star.includes("化权")) sihuaType = "quan";
          else if (star.includes("化科")) sihuaType = "ke";
          else if (star.includes("化忌")) sihuaType = "ji";

          return (
            <span
              key={`${star}-${idx}`}
              className="star"
              data-sihua={sihuaType || undefined}
            >
              {star}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`ziwei-palace-card ${getPalaceClass()}`}
      data-palace-index={index}
    >
      {/* 上半部：星曜内容 */}
      <div className="ziwei-palace-stars">
        {/* 主星 */}
        {renderStars(filteredStars.majorStars, "ziwei-major-stars")}

        {/* 辅星 */}
        {renderStars(filteredStars.minorStars, "ziwei-minor-stars")}

        {/* 杂曜 */}
        {renderStars(filteredStars.adjectiveStars, "ziwei-adjective-stars")}

        {/* 神煞（仅在三合盘显示） */}
        {chartType === "sanhe" && (
          <>
            {palace.changsheng12.length > 0 && (
              <div className="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded mb-1 inline-block">
                <span className="font-medium">长生:</span>{" "}
                {palace.changsheng12.join(" ")}
              </div>
            )}

            {palace.boshi12.length > 0 && (
              <div className="text-xs bg-orange-100 text-orange-800 px-1 py-0.5 rounded mb-1 inline-block ml-1">
                <span className="font-medium">博士:</span>{" "}
                {palace.boshi12.join(" ")}
              </div>
            )}
          </>
        )}
      </div>

      {/* 下半部：宫位信息 */}
      <div className="ziwei-palace-footer">
        {/* 宫位名称 */}
        <div className="text-center text-sm font-bold text-gray-800 mb-1">
          {palace.name}
          {isSoulPalace && <span className="text-blue-500 ml-1">(命)</span>}
          {isBodyPalace && <span className="text-red-500 ml-1">(身)</span>}
        </div>

        {/* 年限显示 */}
        {palace.ages && palace.ages.length > 0 && (
          <div className="text-center text-xs text-gray-600 mb-1">
            {palace.ages[0]} - {palace.ages[palace.ages.length - 1]}
          </div>
        )}

        {/* 底部：天干地支 */}
        <div className="text-center">
          <span className="text-sm font-bold">
            <span className="text-gray-600">{palace.heavenlyStem}</span>
            <span className="text-gray-800">{palace.earthlyBranch}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

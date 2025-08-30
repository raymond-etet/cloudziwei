// 紫微斗数相关类型定义

export interface ZiweiPalace {
  name: string;
  isBodyPalace: boolean;
  isMainPalace: boolean;
  heavenlyStem: string;
  earthlyBranch: string;
  majorStars: string[];
  minorStars: string[];
  adjectiveStars: string[];
  changsheng12: string[];
  boshi12: string[];
  jiangqian12: string[];
  suiqian12: string[];
  decadal: unknown;
  ages: number[];
  index: number;
}

export interface ZiweiSihua {
  lu: string[];
  quan: string[];
  ke: string[];
  ji: string[];
}

export interface ZiweiInputData {
  name?: string;
  location?: string;
  birthdayType: "solar" | "lunar";
}

export interface ZiweiChart {
  // 基本信息
  gender: string;
  solarDate: string;
  lunarDate: string;
  chineseDate: string;
  time: string;
  timeRange: string;
  sign: string;
  zodiac: string;
  earthlyBranchOfSoulPalace: string;
  earthlyBranchOfBodyPalace: string;
  soul: string;
  body: string;
  fiveElementsClass: string;

  // 宫位数据
  palaces: ZiweiPalace[];

  // 四化信息
  sihua: ZiweiSihua;

  // 用户输入信息
  inputData: ZiweiInputData;
}

export type ChartType = "standard" | "sihua" | "sanhe";

export interface ZiweiFormData {
  birthday: string;
  birthTime: number;
  gender: "male" | "female";
  name?: string;
  location?: string;
  birthdayType: "solar" | "lunar";
}

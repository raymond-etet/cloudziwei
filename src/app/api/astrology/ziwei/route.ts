import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { astro } from "iztro";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

// 时辰映射表
const TIME_MAPPING = [
  "23:00-01:00", // 0: 子时
  "01:00-03:00", // 1: 丑时
  "03:00-05:00", // 2: 寅时
  "05:00-07:00", // 3: 卯时
  "07:00-09:00", // 4: 辰时
  "09:00-11:00", // 5: 巳时
  "11:00-13:00", // 6: 午时
  "13:00-15:00", // 7: 未时
  "15:00-17:00", // 8: 申时
  "17:00-19:00", // 9: 酉时
  "19:00-21:00", // 10: 戌时
  "21:00-23:00", // 11: 亥时
];

// 输入验证 schema
const ziweiSchema = z.object({
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.number().min(0).max(11),
  gender: z.enum(["male", "female"]),
  name: z.string().optional(),
  location: z.string().optional(),
  birthdayType: z.enum(["solar", "lunar"]).default("solar"),
});

export async function GET(request: NextRequest) {
  try {
    // 1. 参数验证
    const searchParams = request.nextUrl.searchParams;
    const params = {
      birthday: searchParams.get("birthday") || "",
      birthTime: parseInt(searchParams.get("birthTime") || "0"),
      gender: searchParams.get("gender") as "male" | "female",
      name: searchParams.get("name") || undefined,
      location: searchParams.get("location") || undefined,
      birthdayType: (searchParams.get("birthdayType") || "solar") as "solar" | "lunar",
    };

    const validatedParams = ziweiSchema.parse(params);

    // 2. 配置 iztro 库
    astro.config({
      yearDivide: "normal", // 正月初一分界
      algorithm: "zhongzhou", // 中州派算法
    });

    // 3. 转换性别格式
    const genderChinese = validatedParams.gender === "male" ? "男" : "女";

    // 4. 调用 iztro 进行排盘计算
    let chart;
    if (validatedParams.birthdayType === "solar") {
      chart = astro.bySolar(
        validatedParams.birthday,
        validatedParams.birthTime,
        genderChinese,
        true, // 使用真太阳时
        "zh-CN"
      );
    } else {
      chart = astro.byLunar(
        validatedParams.birthday,
        validatedParams.birthTime,
        genderChinese,
        false, // 农历不需要闰月标记
        true, // 使用真太阳时
        "zh-CN"
      );
    }

    // 5. 构建响应数据
    const responseData = {
      // 基本信息
      gender: genderChinese,
      solarDate: chart.solarDate,
      lunarDate: chart.lunarDate,
      chineseDate: chart.chineseDate,
      time: chart.time,
      timeRange: TIME_MAPPING[validatedParams.birthTime],
      sign: chart.sign,
      zodiac: chart.zodiac,
      earthlyBranchOfSoulPalace: chart.earthlyBranchOfSoulPalace,
      earthlyBranchOfBodyPalace: chart.earthlyBranchOfBodyPalace,
      soul: chart.soul,
      body: chart.body,
      fiveElementsClass: chart.fiveElementsClass,

      // 宫位数据
      palaces: chart.palaces.map((palace: any, index: number) => ({
        name: palace.name,
        isBodyPalace: palace.isBodyPalace,
        isMainPalace: palace.isMainPalace,
        heavenlyStem: palace.heavenlyStem,
        earthlyBranch: palace.earthlyBranch,
        majorStars: palace.majorStars,
        minorStars: palace.minorStars,
        adjectiveStars: palace.adjectiveStars,
        changsheng12: palace.changsheng12,
        boshi12: palace.boshi12,
        jiangqian12: palace.jiangqian12,
        suiqian12: palace.suiqian12,
        decadal: palace.decadal,
        ages: palace.ages,
        index: index,
      })),

      // 四化信息
      sihua: {
        lu: chart.sihua?.lu || [],
        quan: chart.sihua?.quan || [],
        ke: chart.sihua?.ke || [],
        ji: chart.sihua?.ji || [],
      },

      // 用户输入信息
      inputData: {
        name: validatedParams.name,
        location: validatedParams.location,
        birthdayType: validatedParams.birthdayType,
      },
    };

    // 6. 保存排盘记录到数据库（如果用户已登录）
    try {
      const context = await getCloudflareContext({ async: true });
      // TODO: 实现用户认证和数据库保存
      // 暂时跳过数据库操作，专注于排盘功能
    } catch (dbError) {
      console.error("保存排盘记录失败:", dbError);
      // 不影响排盘结果返回，只记录错误
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("紫微斗数排盘失败:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "参数验证失败", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "排盘过程中发生未知错误" }, { status: 500 });
  }
}

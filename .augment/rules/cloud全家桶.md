---
type: "manual"
---

# CloudZiwei 技术文档

## 项目概述

CloudZiwei 是一个基于 Cloudflare 全家桶的现代化 Web 应用，集成了专业的紫微斗数排盘系统和 U 本位合约计算器功能。项目采用 Next.js 15 + React 19 构建，部署在 Cloudflare Pages 上，利用边缘计算提供全球化的高性能服务。

## 技术栈

### 前端技术栈

- **框架**: Next.js 15.4.6 (App Router)
- **UI 库**: React 19.1.0
- **类型系统**: TypeScript 5.x
- **样式框架**: Tailwind CSS 4 + DaisyUI 5.0.54
- **字体**: Geist Sans & Geist Mono
- **构建工具**: Turbopack (开发环境)

### 后端技术栈

- **运行时**: Cloudflare Edge Runtime
- **数据库**: Cloudflare D1 (SQLite)
- **缓存**: Cloudflare KV Storage
- **对象存储**: Cloudflare R2 Storage
- **认证**: NextAuth.js 5.0.0-beta.29 + D1 Adapter

### 专业库依赖

- **紫微斗数**: iztro 2.5.3 (中州派算法)
- **紫微斗数钩子**: iztro-hook 1.3.3
- **农历转换**: lunar-typescript 1.8.0
- **日期处理**: date-fns 4.1.0, dayjs 1.11.17
- **密码加密**: bcryptjs 3.0.2
- **数据验证**: zod 3.24.2
- **样式工具**: classnames 2.5.1

### 开发工具

- **代码检查**: ESLint 9 + Next.js ESLint Config
- **部署工具**: @opennextjs/cloudflare 1.6.5
- **Cloudflare CLI**: Wrangler 4.33.1
- **包管理**: pnpm 10.15.0
- **环境管理**: @t3-oss/env-nextjs 0.13.8

## 项目结构

```
cloudziwei/
├── src/                          # 源代码目录
│   ├── app/                      # Next.js App Router 目录
│   │   ├── api/                  # API 路由
│   │   │   ├── astrology/        # 紫微斗数相关 API
│   │   │   ├── auth/             # 认证相关 API
│   │   │   ├── files/            # 文件处理 API
│   │   │   └── upload/           # 文件上传 API
│   │   ├── astrology/            # 紫微斗数页面
│   │   │   └── ziwei/            # 紫微斗数排盘页面
│   │   ├── auth/                 # 认证页面
│   │   │   └── signin/           # 登录页面
│   │   ├── calculator/           # 计算器页面
│   │   │   └── u-contract/       # U本位合约计算器页面
│   │   ├── auth.ts               # NextAuth.js 配置
│   │   ├── globals.css           # 全局样式
│   │   ├── layout.tsx            # 根布局组件
│   │   ├── middleware.ts         # 中间件
│   │   └── page.tsx              # 首页
│   ├── components/               # React 组件
│   │   ├── astrology/            # 紫微斗数组件
│   │   ├── auth/                 # 认证组件
│   │   ├── calculator/           # 计算器组件
│   │   ├── layout/               # 布局组件
│   │   └── providers/            # 上下文提供者
│   ├── hooks/                    # 自定义 React Hooks
│   └── types/                    # TypeScript 类型定义
├── public/                       # 静态资源
├── scripts/                      # 部署脚本
├── schema.sql                    # 数据库结构
├── package.json                  # 项目依赖配置
├── next.config.ts                # Next.js 配置
├── tsconfig.json                 # TypeScript 配置
├── wrangler.jsonc                # Cloudflare Workers 配置
├── eslint.config.mjs             # ESLint 配置
├── postcss.config.mjs            # PostCSS 配置
└── open-next.config.ts           # OpenNext Cloudflare 配置
```

## 核心功能模块

### 1. 紫微斗数排盘系统

#### 技术实现

- **核心算法**: 基于 iztro 2.5.3 库，采用中州派紫微斗数算法
- **农历支持**: 使用 lunar-typescript 进行阳历农历转换
- **数据处理**: 支持多种显示模式（标准盘、四化盘、三合盘）

#### 组件结构

- `ZiweiChart`: 主排盘组件，负责整体布局和数据展示
- `ZiweiPalace`: 宫位组件，显示单个宫位的详细信息
- API 路由: `/api/astrology/ziwei` 处理排盘计算请求

#### 数据类型

```typescript
interface ZiweiChart {
  gender: string; // 性别
  solarDate: string; // 阳历日期
  lunarDate: string; // 农历日期
  chineseDate: string; // 中文日期
  time: string; // 时辰
  palaces: ZiweiPalace[]; // 十二宫位数据
  sihua: ZiweiSihua; // 四化信息
}
```

### 2. U 本位合约计算器

#### 技术实现

- **实时数据**: 集成币安 API 获取实时价格和手续费率
- **智能计算**: 自动计算建议杠杆倍数和所需保证金
- **风险管理**: 基于止损设置的风险控制算法

#### 组件结构

- `UContractCalculator`: 主计算器组件
- `SymbolSelector`: 交易对选择器
- `InputField`: 输入字段组件
- `CalculationResults`: 计算结果展示组件
- `DisplayInfo`: 市场信息展示组件

#### 自定义 Hooks

- `useBinanceData`: 获取币安市场数据
- `useCalculations`: 处理合约计算逻辑

### 3. 认证系统

#### 技术实现

- **认证框架**: NextAuth.js 5.0.0-beta.29
- **数据库适配器**: @auth/d1-adapter 连接 Cloudflare D1
- **密码加密**: bcryptjs 进行密码哈希处理

#### 数据库结构

```sql
-- 用户表
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  emailVerified INTEGER,
  image TEXT
);

-- 会话表
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  sessionToken TEXT NOT NULL UNIQUE,
  userId TEXT NOT NULL,
  expires INTEGER NOT NULL
);
```

## 配置文件详解

### Next.js 配置 (next.config.ts)

```typescript
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
};

// 启用 Cloudflare 开发环境支持
initOpenNextCloudflareForDev();

export default nextConfig;
```

### Cloudflare Workers 配置 (wrangler.jsonc)

```jsonc
{
  "name": "cloudziwei",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-03-01",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "cloudziwei-db"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV_CACHE"
    }
  ]
}
```

### TypeScript 配置 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["./cloudflare-env.d.ts", "node"]
  }
}
```

## 部署架构

### Cloudflare 服务集成

1. **Cloudflare Pages**: 静态资源托管和全球 CDN
2. **Cloudflare Workers**: 边缘计算运行时
3. **Cloudflare D1**: 分布式 SQLite 数据库
4. **Cloudflare KV**: 高性能键值存储
5. **Cloudflare R2**: 对象存储服务

### 部署流程

```bash
# 1. 安装依赖
npm install --legacy-peer-deps

# 2. 生成类型定义
npm run cf-typegen

# 3. 构建项目
npm run build

# 4. 部署到 Cloudflare
npm run deploy

# 5. 初始化数据库
npm run setup:db
```

## 开发环境设置

### 环境要求

- Node.js 18+
- Cloudflare 账户
- Wrangler CLI

### 本地开发

```bash
# 启动开发服务器 (使用 Turbopack)
npm run dev

# 代码检查
npm run lint

# 数据库操作
npm run db:init      # 初始化数据库
npm run db:studio    # 查看数据库信息
```

### 环境变量

项目使用 @t3-oss/env-nextjs 进行环境变量管理，支持类型安全的环境变量验证。

## 性能优化

### 1. 边缘计算优化

- 利用 Cloudflare Edge Runtime 就近处理请求
- 全球 CDN 分发静态资源
- 智能缓存策略

### 2. 代码优化

- Turbopack 构建工具提升开发体验
- Tree-shaking 减少包体积
- 组件懒加载

### 3. 数据库优化

- 合理的索引设计
- 查询优化
- 连接池管理

## 安全措施

### 1. 认证安全

- NextAuth.js 提供安全的认证机制
- 密码哈希存储
- 会话管理

### 2. 数据安全

- HTTPS 强制传输
- CSP 内容安全策略
- 输入验证和清理

### 3. API 安全

- 请求频率限制
- 权限验证
- 错误处理

## 监控和维护

### 1. 性能监控

- Cloudflare Analytics
- Real User Monitoring (RUM)
- 错误追踪

### 2. 日志管理

- Wrangler 日志查看
- 错误日志收集
- 性能指标监控

### 3. 备份策略

- 定期数据库备份
- 代码版本控制
- 配置文件备份

## 扩展性设计

### 1. 模块化架构

- 组件化设计
- 功能模块分离
- 可插拔的服务

### 2. 数据库设计

- 灵活的表结构
- 支持功能扩展
- 性能优化索引

### 3. API 设计

- RESTful 接口
- 版本控制
- 向后兼容

---

本文档为 VSCode 插件 Augment 提供项目技术参考，涵盖了 CloudZiwei 项目的完整技术架构、配置信息和开发指南。

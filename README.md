# CloudZiwei 🔮

基于 Cloudflare 全家桶的紫微斗数排盘系统，集成了专业的紫微斗数排盘和 U 本位合约计算器功能。

## ✨ 特性

### 🔮 紫微斗数排盘

- **专业算法**：基于 iztro 2.5.3，采用中州派算法
- **多种显示模式**：标准盘、四化盘、三合盘
- **完整星曜系统**：主星、辅星、杂曜、神煞一应俱全
- **精美界面**：响应式设计，支持移动端

### 📊 U 本位合约计算器

- **智能计算**：自动计算建议杠杆倍数和所需保证金
- **实时数据**：集成币安 API，获取实时价格
- **风险管理**：基于止损设置的风险控制
- **多币种支持**：支持主流加密货币交易对

### 🚀 技术架构

- **Cloudflare Pages**：全球 CDN 加速，极速访问
- **Edge Runtime**：边缘计算，就近响应
- **D1 Database**：分布式 SQL 数据库
- **KV Storage**：高性能键值存储
- **R2 Storage**：对象存储服务
- **NextAuth.js**：完整的认证系统

## 🛠️ 技术栈

- **前端框架**：Next.js 15 + React 19
- **样式系统**：Tailwind CSS 4 + DaisyUI
- **类型安全**：TypeScript
- **认证系统**：NextAuth.js + D1 Adapter
- **数据库**：Cloudflare D1 (SQLite)
- **缓存存储**：Cloudflare KV
- **对象存储**：Cloudflare R2
- **部署平台**：Cloudflare Pages
- **运行时**：Edge Runtime

## 🚀 快速开始

### 前置要求

- Node.js 18+
- Cloudflare 账户
- Wrangler CLI

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 本地开发

```bash
# 启动开发服务器
npm run dev

# 生成 Cloudflare 类型定义
npm run cf-typegen
```

### 部署到 Cloudflare

详细部署指南请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

```bash
# 快速部署
npm run deploy:full

# 初始化数据库
npm run setup:db
```

## 📖 使用指南

### 紫微斗数排盘

1. 访问 `/astrology/ziwei`
2. 填写个人信息（姓名、性别、生日、时辰等）
3. 选择阳历或农历
4. 点击"开始排盘"
5. 查看详细的星盘分析结果

### U 本位合约计算器

1. 访问 `/calculator/u-contract`
2. 选择交易对（BTC、ETH 等）
3. 输入开仓价、止损价、止损金额
4. 系统自动计算建议杠杆倍数和所需保证金
5. 可手动设置杠杆倍数查看不同方案

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 🙏 致谢

- [iztro](https://github.com/SylarLong/iztro) - 专业的紫微斗数排盘库
- [Next.js](https://nextjs.org/) - React 全栈框架
- [Cloudflare](https://cloudflare.com/) - 边缘计算平台
- [NextAuth.js](https://next-auth.js.org/) - 认证解决方案
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！

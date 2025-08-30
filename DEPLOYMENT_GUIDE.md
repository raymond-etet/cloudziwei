# CloudZiwei 部署指南

## 项目概述
CloudZiwei 是一个基于 Next.js 15 + Cloudflare 全家桶的现代化 Web 应用，集成了紫微斗数排盘系统和 U 本位合约计算器功能。

## 已完成的配置

### 1. Cloudflare 资源
- ✅ D1 数据库：`cloudziwei-db` (已初始化表结构)
- ✅ KV 存储：`KV_CACHE`
- ✅ R2 存储桶：`cloudziwei-storage`
- ✅ Pages 项目：`cloudziwei`

### 2. 数据库表结构
已创建以下表：
- `users` - 用户信息
- `accounts` - 第三方账户关联
- `sessions` - 用户会话
- `verification_tokens` - 验证令牌
- `ziwei_records` - 紫微斗数排盘记录
- `calculator_records` - 计算器使用记录

## 部署步骤

### 方法 1：GitHub 集成部署（推荐）

1. **创建 GitHub 仓库**
   ```bash
   # 在 GitHub 上创建新仓库 'cloudziwei'
   # 然后更新远程地址
   git remote set-url origin https://github.com/YOUR_USERNAME/cloudziwei.git
   ```

2. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push -u origin main
   ```

3. **在 Cloudflare Pages 中连接 GitHub**
   - 访问 Cloudflare Dashboard > Pages
   - 选择 "Connect to Git"
   - 选择你的 GitHub 仓库
   - 配置构建设置：
     - 构建命令：`npm run build`
     - 构建输出目录：`.next`
     - Node.js 版本：18

4. **配置环境变量**
   在 Cloudflare Pages 项目设置中添加：
   ```
   NODE_VERSION=18
   NPM_FLAGS=--legacy-peer-deps
   ```

### 方法 2：直接使用 Wrangler 部署

```bash
# 构建项目
npm run build

# 使用 OpenNext 构建（如果在 Linux/WSL 环境）
npm run deploy

# 或者直接部署静态文件
wrangler pages deploy .next --project-name cloudziwei
```

## 环境变量配置

在 Cloudflare Pages 项目设置中配置以下环境变量：

```
# NextAuth.js 配置
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://cloudziwei.pages.dev

# 邮件服务配置
AUTH_RESEND_KEY=your-resend-api-key
AUTH_EMAIL_FROM=noreply@yourdomain.com

# 数据库绑定（自动配置）
DB=cloudziwei-db
KV_CACHE=your-kv-namespace
R2_BUCKET=cloudziwei-storage
```

## 访问地址

部署成功后，应用将在以下地址可用：
- 主域名：https://cloudziwei.pages.dev
- 自定义域名：可在 Cloudflare Pages 设置中配置

## 功能模块

1. **紫微斗数排盘**：/astrology/ziwei
2. **U本位合约计算器**：/calculator/u-contract
3. **用户认证**：/auth/signin

## 故障排除

如果遇到部署问题：

1. **构建失败**：检查 Node.js 版本和依赖安装
2. **数据库连接问题**：确认 D1 数据库绑定正确
3. **认证问题**：检查环境变量配置

## 技术支持

项目基于以下技术栈：
- Next.js 15.4.6 (App Router)
- React 19.1.0
- Cloudflare D1, KV, R2
- NextAuth.js 5.0.0-beta.29
- Tailwind CSS 4 + DaisyUI 5.0.54

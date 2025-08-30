# CloudZiwei 部署指南

本指南将帮助您将 CloudZiwei 部署到 Cloudflare Pages，并配置完整的 Cloudflare 全家桶服务。

## 前置要求

1. **Cloudflare 账户**：确保您有一个 Cloudflare 账户
2. **Wrangler CLI**：安装最新版本的 Wrangler CLI
3. **Node.js**：确保安装了 Node.js 18 或更高版本

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login
```

## 步骤 1: 创建 Cloudflare 服务

### 1.1 创建 D1 数据库

```bash
# 创建 D1 数据库
wrangler d1 create cloudziwei-db

# 记录返回的数据库 ID，更新 wrangler.jsonc 中的 database_id
```

### 1.2 创建 KV 命名空间

```bash
# 创建生产环境 KV 命名空间
wrangler kv:namespace create "KV_CACHE"

# 创建预览环境 KV 命名空间
wrangler kv:namespace create "KV_CACHE" --preview

# 记录返回的 ID，更新 wrangler.jsonc 中的 id 和 preview_id
```

### 1.3 创建 R2 存储桶

```bash
# 创建 R2 存储桶
wrangler r2 bucket create cloudziwei-storage

# 创建预览环境 R2 存储桶
wrangler r2 bucket create cloudziwei-storage-preview
```

## 步骤 2: 更新配置文件

### 2.1 更新 wrangler.jsonc

确保 `wrangler.jsonc` 中的绑定配置正确：

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "cloudziwei-db",
      "database_id": "YOUR_D1_DATABASE_ID"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV_CACHE",
      "id": "YOUR_KV_NAMESPACE_ID",
      "preview_id": "YOUR_KV_PREVIEW_ID"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2_BUCKET",
      "bucket_name": "cloudziwei-storage",
      "preview_bucket_name": "cloudziwei-storage-preview"
    }
  ]
}
```

### 2.2 初始化数据库

```bash
# 执行数据库初始化脚本
chmod +x scripts/init-db.sh
./scripts/init-db.sh

# 或者手动执行
wrangler d1 execute cloudziwei-db --file=schema.sql
```

## 步骤 3: 设置环境变量

### 3.1 生成 AUTH_SECRET

```bash
# 生成一个随机的 AUTH_SECRET
openssl rand -base64 32
```

### 3.2 设置 Cloudflare Pages 环境变量

在 Cloudflare Dashboard 中设置以下环境变量：

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 Pages 项目设置
3. 在 "Settings" > "Environment variables" 中添加：

```
AUTH_SECRET=your-generated-secret
AUTH_RESEND_KEY=your-resend-api-key
AUTH_EMAIL_FROM=noreply@yourdomain.com
NEXTJS_ENV=production
```

### 3.3 获取 Resend API Key

1. 访问 [Resend](https://resend.com)
2. 注册账户并获取 API Key
3. 将 API Key 设置为 `AUTH_RESEND_KEY` 环境变量

## 步骤 4: 部署应用

### 4.1 使用部署脚本

```bash
# 给脚本执行权限
chmod +x scripts/deploy.sh

# 执行部署
./scripts/deploy.sh
```

### 4.2 手动部署

```bash
# 安装依赖
npm install --legacy-peer-deps

# 生成类型定义
npm run cf-typegen

# 构建项目
npm run build

# 部署
npm run deploy
```

## 步骤 5: 验证部署

### 5.1 检查服务状态

```bash
# 检查 D1 数据库
wrangler d1 info cloudziwei-db

# 检查 KV 命名空间
wrangler kv:namespace list

# 检查 R2 存储桶
wrangler r2 bucket list
```

### 5.2 功能测试

1. **访问主页**：确保页面正常加载
2. **紫微斗数排盘**：测试排盘功能是否正常
3. **U本位合约计算器**：测试计算功能是否正常
4. **用户认证**：测试登录注册功能（如果已配置）

## 步骤 6: 自定义域名（可选）

### 6.1 添加自定义域名

1. 在 Cloudflare Pages 项目中点击 "Custom domains"
2. 添加您的域名
3. 按照提示配置 DNS 记录

### 6.2 配置 SSL

Cloudflare 会自动为您的域名配置 SSL 证书。

## 故障排除

### 常见问题

1. **Edge Runtime 错误**
   - 确保所有 API 路由都有 `export const runtime = "edge"`
   - 检查是否使用了不兼容的 Node.js APIs

2. **数据库连接错误**
   - 确认 D1 数据库 ID 正确
   - 检查数据库是否已初始化

3. **环境变量问题**
   - 确认所有必需的环境变量都已设置
   - 检查变量名是否正确

4. **构建失败**
   - 检查依赖是否正确安装
   - 确认 TypeScript 类型定义正确

### 调试命令

```bash
# 查看构建日志
npm run build

# 本地预览
npm run preview

# 查看 Wrangler 日志
wrangler pages deployment tail

# 检查类型定义
npm run cf-typegen
```

## 性能优化

### 1. 缓存策略

- 静态资源自动缓存
- API 响应可配置缓存头
- 使用 KV 存储缓存计算结果

### 2. 全球分发

- Cloudflare 的全球 CDN 网络
- Edge Runtime 就近执行
- 数据库全球同步

### 3. 监控和分析

- Cloudflare Analytics
- Real User Monitoring (RUM)
- 性能指标监控

## 安全配置

### 1. CSP 头设置

在 `public/_headers` 文件中配置内容安全策略。

### 2. 访问控制

- 使用 NextAuth.js 进行用户认证
- 配置适当的权限控制
- 设置 API 访问限制

### 3. 数据保护

- 敏感数据加密存储
- 使用 HTTPS 传输
- 定期备份数据

## 维护和更新

### 1. 定期更新

```bash
# 更新依赖
npm update

# 更新 Wrangler
npm install -g wrangler@latest
```

### 2. 监控

- 设置 Cloudflare 告警
- 监控应用性能
- 定期检查日志

### 3. 备份

- 定期备份 D1 数据库
- 备份重要配置文件
- 版本控制代码

---

如果您在部署过程中遇到任何问题，请参考 [Cloudflare 官方文档](https://developers.cloudflare.com/) 或提交 Issue。

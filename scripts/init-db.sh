#!/bin/bash

# CloudZiwei 数据库初始化脚本
# 用于初始化 Cloudflare D1 数据库

echo "🗄️ 初始化 Cloudflare D1 数据库..."

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI 未安装，请先安装："
    echo "npm install -g wrangler"
    exit 1
fi

# 检查是否已登录 Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo "❌ 请先登录 Cloudflare："
    echo "wrangler login"
    exit 1
fi

# 检查 schema.sql 文件是否存在
if [ ! -f "schema.sql" ]; then
    echo "❌ schema.sql 文件不存在"
    exit 1
fi

# 执行数据库 schema
echo "📋 执行数据库 schema..."
wrangler d1 execute cloudziwei-db --file=schema.sql

echo "✅ 数据库初始化完成！"
echo ""
echo "📊 数据库信息："
echo "- 数据库名称: cloudziwei-db"
echo "- 绑定名称: DB"
echo ""
echo "📋 已创建的表："
echo "- accounts (NextAuth.js 账户表)"
echo "- sessions (NextAuth.js 会话表)"
echo "- users (NextAuth.js 用户表)"
echo "- verification_tokens (NextAuth.js 验证令牌表)"
echo "- ziwei_records (紫微斗数排盘记录)"
echo "- calculator_records (计算器记录)"
echo ""
echo "🔍 查看数据库状态："
echo "wrangler d1 info cloudziwei-db"

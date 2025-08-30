#!/bin/bash

# CloudZiwei 部署脚本
# 用于部署到 Cloudflare Pages

echo "🚀 开始部署 CloudZiwei 到 Cloudflare Pages..."

# 检查是否安装了必要的工具
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

# 安装依赖
echo "📦 安装依赖..."
npm install --legacy-peer-deps

# 生成 Cloudflare 类型定义
echo "🔧 生成 Cloudflare 类型定义..."
npm run cf-typegen

# 构建项目
echo "🏗️ 构建项目..."
npm run build

# 部署到 Cloudflare Pages
echo "🌐 部署到 Cloudflare Pages..."
npm run deploy

echo "✅ 部署完成！"
echo ""
echo "📋 部署后检查清单："
echo "1. 检查 D1 数据库是否正确绑定"
echo "2. 检查 KV 存储是否正确绑定"
echo "3. 检查 R2 存储是否正确绑定"
echo "4. 检查环境变量是否正确设置"
echo "5. 测试紫微斗数排盘功能"
echo "6. 测试 U 本位合约计算器功能"
echo ""
echo "🔗 访问您的应用："
echo "https://cloudziwei.pages.dev"

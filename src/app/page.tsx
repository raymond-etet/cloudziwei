import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 头部 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">CloudZiwei</h1>
        <p className="text-xl text-gray-600 mb-8">
          基于 Cloudflare 全家桶的紫微斗数排盘系统
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span>🚀 Cloudflare Pages</span>
          <span>💾 D1 Database</span>
          <span>⚡ KV Storage</span>
          <span>📦 R2 Storage</span>
        </div>
      </div>

      {/* 功能卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Link
          href="/astrology/ziwei"
          className="group block p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
            🔮
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            紫微斗数排盘
          </h3>
          <p className="text-gray-600 mb-4">
            基于 iztro 2.5.3 的专业紫微排盘系统
          </p>
          <div className="text-sm text-blue-600 font-medium">立即体验 →</div>
        </Link>

        <Link
          href="/calculator/u-contract"
          className="group block p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
            📊
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            U本位合约计算器
          </h3>
          <p className="text-gray-600 mb-4">专业的加密货币合约计算工具</p>
          <div className="text-sm text-purple-600 font-medium">立即体验 →</div>
        </Link>

        <div className="group block p-8 bg-white rounded-xl shadow-lg border border-gray-200 opacity-75">
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">用户中心</h3>
          <p className="text-gray-600 mb-4">管理您的排盘记录和个人设置</p>
          <div className="text-sm text-gray-400 font-medium">即将推出...</div>
        </div>
      </div>

      {/* 技术特色 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          技术特色
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-gray-800 mb-2">Edge Runtime</h4>
            <p className="text-sm text-gray-600">
              全面支持 Cloudflare Edge Runtime，极速响应
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h4 className="font-bold text-gray-800 mb-2">NextAuth.js</h4>
            <p className="text-sm text-gray-600">
              完整的认证系统，支持多种登录方式
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">💾</div>
            <h4 className="font-bold text-gray-800 mb-2">D1 Database</h4>
            <p className="text-sm text-gray-600">
              Cloudflare D1 分布式数据库，全球同步
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-800 mb-2">专业算法</h4>
            <p className="text-sm text-gray-600">
              采用中州派算法，确保排盘准确性
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

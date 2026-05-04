import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  MapPin, 
  Calendar, 
  History, 
  Gift, 
  ChevronRight, 
  Heart,
  Database,
  Search,
  Plus
} from 'lucide-react';
import { fetchDashboard, fetchNews } from '../services/api';

export default function HomeScreen({ onOpenModal }: { onOpenModal?: () => void }) {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboard().then(setDashboardData).catch(console.error);
    fetchNews().then(setNewsList).catch(console.error);
  }, []);

  const calculateDaysToNext = (dateStr: string) => {
    if (!dateStr) return '未知';
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24))) + ' 天';
  };

  return (
    <div className="pb-32 bg-background min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0uiN7EtECCUvrMM2qKjYULx6Io5KYUlXxJ3Jj9cDglvgOzQkLnqNRfdLLVruFkSJtO0W8MOjW22s77XYFuxsA0kx8-zN_Ur64grgYYMImQVkdRSSM-y2pFPKop4wuEixOsR1WIYPOgKoCJyhkWvoz-xqB-cnLEuhl_JP3N07e--gLcHs8D8BCceypRRS1tARJZjoBsrEEbcEaGbIHUsI5lwvAspc6xmwo2A3rqZ6hEGgP19D84N9RF3s484siDGAnfNSlVgsLqaRSw" 
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-primary font-display font-bold text-lg tracking-tight">LifeLink</h1>
          </div>
          <button className="relative p-2 rounded-full hover:bg-surface-container transition-colors">
            <Bell className="w-6 h-6 text-secondary" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </button>
        </div>
      </header>

      <main className="px-6 mt-4 space-y-8 max-w-screen-xl mx-auto">
        {/* User Card */}
        <section className="relative overflow-hidden bg-white rounded-[28px] shadow-sm border border-gray-50">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <Heart className="w-32 h-32 text-primary" />
          </div>
          <div className="p-6">
            <div className="mb-6">
              <p className="text-secondary text-sm font-medium">您好，{dashboardData?.name || '英雄'}</p>
              <h2 className="text-on-surface font-display text-2xl font-bold">歡迎回來，Hero</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Database, value: dashboardData?.hero_points || '0', label: '捐血點數', bg: 'bg-primary/5', color: 'text-primary' },
                { icon: DropletIcon, value: dashboardData?.blood_type || '-', label: '血型', bg: 'bg-secondary-container/30', color: 'text-secondary' },
                { icon: Heart, value: dashboardData?.health_status || '-', label: '健康狀態', bg: 'bg-tertiary-container/30', color: 'text-tertiary' },
                { icon: Calendar, value: dashboardData?.next_eligible_date ? calculateDaysToNext(dashboardData.next_eligible_date) : '-', label: '下次可捐', bg: 'bg-primary-container/10', color: 'text-primary-container' },
              ].map((stat, i) => (
                <div key={i} className={`${stat.bg} p-4 rounded-2xl flex flex-col items-center text-center`}>
                  <stat.icon className={`${stat.color} w-5 h-5 mb-1`} />
                  <span className={`${stat.color} font-display font-bold text-lg`}>{stat.value}</span>
                  <span className="text-[10px] font-medium opacity-70 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Services */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h3 className="font-display font-semibold text-lg">快速服務</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: MapPin, label: '尋找地點', action: () => {} },
              { icon: Calendar, label: '預約捐血', action: onOpenModal },
              { icon: History, label: '捐血紀錄', action: () => {} },
              { icon: Gift, label: '點數兌換', action: () => {} },
            ].map((service, i) => (
              <button 
                key={i}
                onClick={service.action}
                className="group p-6 bg-white rounded-3xl shadow-sm hover:bg-primary transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center mb-3 mx-auto transition-colors">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <span className="font-semibold text-sm group-hover:text-white block text-center">{service.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h3 className="font-display font-semibold text-lg">最新消息</h3>
            </div>
            <button className="text-primary text-sm font-semibold hover:underline">查看全部</button>
          </div>
          <div className="space-y-4">
            {newsList.map((news: any, idx: number) => {
              const isUrgent = news.type === '緊急';
              return (
                <div key={news.id || idx} className={`bg-white p-4 rounded-2xl shadow-sm border-l-4 ${isUrgent ? 'border-error' : 'border-tertiary'} flex gap-4 items-center`}>
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={news.image_url || "https://lh3.googleusercontent.com/aida/ADBb0uiLhtMOMG37H-QVSqMmCFlYZW6tZB3Z4gJBtRwZD6geIWTUPJmkDKcNI_i7rAoV2Q92-BTJlF-oFY7IL3wQIna5MK21Raf8ZywRV9HEktDW-nPxuRMWVVkxodAyz_5iEr9-thWABiAoYbBJAQhGakjVRuBVecxnaGrQYAmZr81ouEA2AKBOLoqwqHC7VyIjdgOk085nKCNwM0O5_KOxD7vQYBm1vAekk_Rj_nFPKiPCwTw_KbDzwELSsAU6PQ4E3uhNXJR4Bw5Q8g"}
                      alt="News"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} text-[10px] rounded-full font-bold`}>{news.type}</span>
                      <span className="text-secondary text-xs">{new Date(news.date).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold text-on-surface line-clamp-1">{news.title}</h4>
                    <p className="text-secondary text-sm line-clamp-1">{news.content}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="relative rounded-3xl overflow-hidden h-40 group">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ugEM81UbENLuLMiC7HB3fLGl5PEYAwpUXxz04HUeodO1bXIRGGAkaz9gX-GQG8Rc1zUYZuNe3NzqWXisVWqm2nfdp_5gwITKdPwp3G5-COzrR9e9l2yRAyBUjfEmVePLX2YqCtJyIJsXeKOzpqi7YhWY49o9PudKOld2Cljth-SaWJUU8LXfN-WVZCURWpXIXYfINQoGpfd-Ph5Gtgm6EQKZ3mLN2woFK4G6QFfhhiT_h6LHsMe9_ql_GC_8kpf7QtVRBMEl3QF9w" 
            alt="Promotion"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
            <h4 className="text-white font-bold text-lg">成為他人的生命之光</h4>
            <p className="text-white/80 text-sm">立即加入 VitalFlow 常規捐血者計畫</p>
          </div>
        </section>
      </main>

      {/* FAB */}
      <button 
        onClick={onOpenModal}
        className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all z-50"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}

function DropletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

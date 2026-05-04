import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  History, 
  FileText, 
  ChevronRight, 
  Search,
  Filter,
  Droplets,
  Calendar,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { fetchAppointments, fetchDashboard } from '../services/api';

export default function HistoryScreen() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    fetchDashboard().then(setDashboardData).catch(console.error);
    fetchAppointments().then(data => {
        // filter out future appointments if needed, or backend can return all
        setHistoryData(data.filter((item: any) => item.status === '已完成'));
    }).catch(console.error);
  }, []);

  const totalVolume = historyData.reduce((acc, curr) => {
      const vol = parseInt(curr.volume) || 0;
      return acc + vol;
  }, 0);

  return (
    <div className="pb-32 bg-background min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-lg">
                {dashboardData?.name ? dashboardData.name.charAt(0) : '林'}
             </div>
             <h1 className="text-primary font-display font-bold text-lg tracking-tight">LifeLink</h1>
          </div>
          <Bell className="w-6 h-6 text-secondary" />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 pt-6 space-y-8">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">捐血紀錄</h2>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜尋日期或地點..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-surface-container-low transition-colors">
              <Filter className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: '累計次數', value: historyData.length.toString(), icon: History, color: 'text-primary' },
            { label: '累積血量', value: `${(totalVolume / 1000).toFixed(1)} L`, icon: Droplets, color: 'text-blue-600' },
            { label: '影響生命', value: `${historyData.length * 3}+`, icon: TrendingUp, color: 'text-tertiary' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center">
              <div className={`w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center mb-2`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-xl font-display font-bold text-on-surface">{stat.value}</p>
              <p className="text-xs text-secondary font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* History List */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-display font-bold text-lg">歷史清單</h3>
            <p className="text-xs text-secondary">共 {historyData.length} 次紀錄</p>
          </div>
          <div className="space-y-4">
            {historyData.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-on-surface">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span className="text-secondary text-sm">{item.location?.name || '未知地點'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold text-lg">+{item.points_awarded}</p>
                      <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">英雄點數</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                        <Droplets className="w-4 h-4 text-primary fill-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-secondary font-medium">類型</p>
                        <p className="text-sm font-bold">{item.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-secondary font-medium">捐血量</p>
                        <p className="text-sm font-bold">{item.volume}</p>
                      </div>
                    </div>
                  </div>

                  {item.report_available && (
                    <button className="w-full flex items-center justify-between p-4 bg-tertiary-container/5 rounded-2xl hover:bg-tertiary-container/10 transition-all group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-tertiary" />
                        <span className="text-sm font-bold text-tertiary">查看健康數據報告</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-tertiary/40 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Load More */}
        <button className="w-full py-4 text-secondary text-sm font-semibold hover:text-primary transition-colors">
          加載更多紀錄
        </button>
      </main>
    </div>
  );
}

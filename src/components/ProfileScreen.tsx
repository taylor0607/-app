import { useState, useEffect } from 'react';
import { 
  Settings, 
  Bell, 
  ChevronRight, 
  User, 
  ShieldCheck, 
  History, 
  Heart,
  Award,
  Stars,
  Calendar,
  Shield,
  ArrowRight
} from 'lucide-react';
import { fetchDashboard } from '../services/api';

export default function ProfileScreen() {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    fetchDashboard().then(setDashboardData).catch(console.error);
  }, []);

  const getAppointmentsCount = () => {
      if (!dashboardData?.appointments) return '0';
      return dashboardData.appointments.filter((a: any) => a.status === '已完成').length.toString();
  };

  const calculateDaysToNext = (dateStr: string) => {
    if (!dateStr) return '未知';
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24))) + ' 天';
  };

  return (
    <div className="pb-32 bg-background min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-lg">
                {dashboardData?.name ? dashboardData.name.charAt(0) : '林'}
             </div>
             <h1 className="text-primary font-display font-bold text-lg tracking-tight">LifeLink</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <Settings className="w-6 h-6 text-secondary" />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <Bell className="w-6 h-6 text-secondary" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-8 max-w-screen-xl mx-auto">
        {/* Profile Card */}
        <section className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-50 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0uiN7EtECCUvrMM2qKjYULx6Io5KYUlXxJ3Jj9cDglvgOzQkLnqNRfdLLVruFkSJtO0W8MOjW22s77XYFuxsA0kx8-zN_Ur64grgYYMImQVkdRSSM-y2pFPKop4wuEixOsR1WIYPOgKoCJyhkWvoz-xqB-cnLEuhl_JP3N07e--gLcHs8D8BCceypRRS1tARJZjoBsrEEbcEaGbIHUsI5lwvAspc6xmwo2A3rqZ6hEGgP19D84N9RF3s484siDGAnfNSlVgsLqaRSw" 
              alt="Profile background"
              className="w-full h-full object-cover rounded-bl-full"
            />
          </div>
          <div className="w-24 h-24 rounded-full bg-primary-container border-4 border-white shadow-lg flex items-center justify-center text-white text-4xl font-bold">
            {dashboardData?.name ? dashboardData.name.charAt(0) : '林'}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-2xl font-bold text-on-background">{dashboardData?.name || '林小明'}</h2>
            <p className="text-secondary text-sm font-medium">ID: {dashboardData?.id || '8829-4501-LL'}</p>
            <div className="flex flex-wrap gap-2 pt-3 justify-center md:justify-start">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">資深捐血者</span>
              <span className="bg-tertiary-container/20 text-tertiary px-3 py-1 rounded-full text-xs font-bold">{dashboardData?.level === 'Gold' ? '尊榮會員' : '一般會員'}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-4 bg-surface-container-low rounded-2xl border border-gray-100">
            <span className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">血型</span>
            <span className="text-primary font-display text-4xl font-bold">{dashboardData?.blood_type || '-'}</span>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Heart, label: '捐血次數', value: getAppointmentsCount(), color: 'text-primary', bg: 'bg-primary/5' },
            { icon: Award, label: '總累計點數', value: dashboardData?.hero_points?.toString() || '0', color: 'text-tertiary', bg: 'bg-tertiary/5' },
            { icon: Calendar, label: '下次可捐', value: dashboardData?.next_eligible_date ? calculateDaysToNext(dashboardData.next_eligible_date) : '-', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Stars, label: '目前等級', value: dashboardData?.level || 'Bronze', color: 'text-orange-500', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-50 flex flex-col items-start gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-secondary font-medium">{stat.label}</p>
                <p className="text-xl font-display font-bold text-on-surface">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Menu List & Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-bold text-lg px-2">帳戶設定</h3>
            <div className="bg-white rounded-[28px] shadow-sm overflow-hidden border border-gray-50 divide-y divide-gray-50">
              {[
                { icon: User, title: '基本資料', sub: '管理您的個人檔案與顯示名稱' },
                { icon: ShieldCheck, title: '健康資訊', sub: '查看醫療紀錄與血液相容性' },
                { icon: Shield, title: '帳戶安全', sub: '密碼、雙重驗證與登入活動紀錄' },
                { icon: History, title: '捐血紀錄歷史', sub: '過去的捐血紀錄與健康篩檢報告' },
              ].map((item, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center justify-between p-6 hover:bg-surface-container-low transition-colors group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-background">{item.title}</h4>
                      <p className="text-secondary text-sm">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg px-2">最近動態</h3>
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 space-y-4">
              <div className="flex gap-4 border-l-4 border-primary pl-4 py-1">
                <div>
                  <p className="font-semibold text-sm text-on-background">中心診所捐血</p>
                  <p className="text-xs text-secondary">昨天, 14:30</p>
                </div>
              </div>
              <div className="flex gap-4 border-l-4 border-tertiary pl-4 py-1">
                <div>
                  <p className="font-semibold text-sm text-on-background">獲得點數: +150</p>
                  <p className="text-xs text-secondary">昨天, 16:00</p>
                </div>
              </div>
              <button className="w-full py-3 bg-primary-container text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all">
                預約下次捐血
              </button>
            </div>

            {/* Invite Card */}
            <div className="bg-surface-container rounded-[24px] p-6 relative overflow-hidden group">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0ugEM81UbENLuLMiC7HB3fLGl5PEYAwpUXxz04HUeodO1bXIRGGAkaz9gX-GQG8Rc1zUYZuNe3NzqWXisVWqm2nfdp_5gwITKdPwp3G5-COzrR9e9l2yRAyBUjfEmVePLX2YqCtJyIJsXeKOzpqi7YhWY49o9PudKOld2Cljth-SaWJUU8LXfN-WVZCURWpXIXYfINQoGpfd-Ph5Gtgm6EQKZ3mLN2woFK4G6QFfhhiT_h6LHsMe9_ql_GC_8kpf7QtVRBMEl3QF9w" 
                alt="Promotion"
                className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="relative z-10">
                <h4 className="font-bold text-on-background">邀請好友</h4>
                <p className="text-sm text-secondary mt-2">每位好友完成首次捐血即可獲得紅利點數。</p>
                <button className="mt-4 text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  立即推薦 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

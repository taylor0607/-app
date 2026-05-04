import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  MapPin, 
  ChevronRight, 
  Edit3, 
  X, 
  Info,
  Calendar,
  Clock,
  Droplet
} from 'lucide-react';
import { fetchAppointments, fetchDashboard } from '../services/api';

export default function AppointmentScreen({ onOpenModal }: { onOpenModal?: () => void }) {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [upcomingAppointment, setUpcomingAppointment] = useState<any>(null);

  useEffect(() => {
    fetchDashboard().then(setDashboardData).catch(console.error);
    fetchAppointments().then(data => {
        const upcoming = data.find((item: any) => item.status === '已確認');
        setUpcomingAppointment(upcoming);
    }).catch(console.error);
  }, []);

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
            <h1 className="text-primary font-display font-bold text-xl tracking-tight">LifeLink</h1>
          </div>
          <Bell className="w-6 h-6 text-secondary" />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 pt-4 space-y-8">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">預約管理</h2>
          <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl w-fit">
            <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-white shadow-sm text-primary">即將到來</button>
            <button className="px-6 py-2 rounded-lg text-sm font-semibold text-secondary hover:bg-surface-container-high transition-all">歷史紀錄</button>
          </div>
        </div>

        {/* Appointment Card */}
        {upcomingAppointment ? (
        <section className="bg-white rounded-[24px] shadow-sm overflow-hidden border-l-8 border-primary-container">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-red-50 text-primary text-xs font-bold">{upcomingAppointment.status}</span>
                  <span className="text-secondary text-xs">編號: #{upcomingAppointment.id}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-on-surface mb-1">{upcomingAppointment.location?.name || '未知地點'}</h3>
                <p className="text-secondary text-sm flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {upcomingAppointment.location?.address || ''}
                </p>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4 text-center min-w-[100px]">
                <p className="text-primary font-bold text-lg">{new Date(upcomingAppointment.date).getMonth() + 1}月</p>
                <p className="text-on-surface font-display text-4xl font-bold leading-none">{new Date(upcomingAppointment.date).getDate()}</p>
                <p className="text-secondary text-xs mt-1">
                  {['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date(upcomingAppointment.date).getDay()]}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-primary fill-primary" />
                </div>
                <div>
                  <p className="text-secondary text-xs">類型</p>
                  <p className="text-on-surface font-semibold">{upcomingAppointment.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-secondary text-xs">時段</p>
                  <p className="text-on-surface font-semibold">
                    {new Date(upcomingAppointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-gray-100">
              <button className="flex-1 min-w-[140px] bg-primary text-white font-semibold py-4 rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                <Edit3 className="w-5 h-5" /> 修改預約
              </button>
              <button className="flex-1 min-w-[140px] bg-white border-2 border-surface-container text-secondary font-semibold py-4 rounded-2xl hover:bg-surface-container-low active:scale-95 transition-all flex items-center justify-center gap-2">
                <X className="w-5 h-5" /> 取消預約
              </button>
            </div>
          </div>
          <div className="bg-surface-container-low px-6 py-3 flex items-center justify-between">
            <p className="text-secondary text-xs">預約建立於：{new Date(upcomingAppointment.date).toLocaleDateString()}</p>
            <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
              查看詳情 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
        ) : (
          <div className="bg-white rounded-[24px] shadow-sm p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-display text-xl font-bold text-on-surface mb-2">尚無預約紀錄</h3>
            <p className="text-secondary text-sm mb-6">您目前沒有即將到來的捐血預約，立即預約以拯救生命！</p>
            <button 
              onClick={onOpenModal}
              className="bg-primary text-white font-semibold py-3 px-8 rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              立即預約
            </button>
          </div>
        )}

        {/* Info & Map Quick Link */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-100 rounded-[24px] p-6 flex items-start gap-4">
            <Info className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-green-800 mb-1">捐血前須知</h4>
              <p className="text-green-700/80 text-sm">請記得補充足夠的水分，並攜帶身分證件進行身分驗證。</p>
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center gap-4 border border-gray-100">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
               <img 
                 src="https://lh3.googleusercontent.com/aida/ADBb0uhwhGp5MWaZe1Zuqfhe2VBgF7yRfOQxG9Kh_ooblHz2MsempNVC1UD0GEqeAQcjkmyuncve3DBkLn3ANlARCLTJuqb1j2vsm2WaYzu378fZV8sD6ZRLxjvttqZZSO-heHn7atbaMx6DcY3Oe57gKBWTOqi4QcRZuJ9b8q47twC-b6PAYThzmqLL8TT6BUETPd9SgS_W2Dhj8hprmX3r5w2TYsgor6nVykXy6H4aWuCEbKkMgyv1s_QjprsDOicDdITQPj7AXaqbXQ" 
                 alt="Map guidance"
                 className="w-full h-full object-cover"
               />
            </div>
            <div>
              <h4 className="font-semibold text-on-surface">需要路線指引？</h4>
              <p className="text-secondary text-sm">在 Google 地圖中開啟</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

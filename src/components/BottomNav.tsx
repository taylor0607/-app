import { LayoutGrid, Calendar, History, User } from 'lucide-react';

export type Screen = 'home' | 'appointment' | 'history' | 'profile';

interface BottomNavProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onScreenChange }: BottomNavProps) {
  const items = [
    { id: 'home', label: '首頁', icon: LayoutGrid },
    { id: 'appointment', label: '預約', icon: Calendar },
    { id: 'history', label: '紀錄', icon: History },
    { id: 'profile', label: '個人', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-4 pb-8 bg-white/80 backdrop-blur-lg z-50 rounded-t-[32px] shadow-[0_-8px_32px_rgba(0,0,0,0.05)] border-t border-gray-100/50">
      {items.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`flex flex-col items-center justify-center gap-1.5 px-5 py-2 rounded-2xl transition-all duration-300 active:scale-90 ${
              isActive 
                ? 'text-primary bg-primary/5' 
                : 'text-secondary grayscale hover:grayscale-0'
            }`}
          >
            <item.icon className={`w-6 h-6 ${isActive ? 'fill-primary/10' : ''}`} />
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

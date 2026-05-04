import { motion } from 'motion/react';
import { ArrowRight, Droplets } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-6 py-12 hero-gradient overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[20%] left-[-15%] w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      {/* Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center mt-20"
      >
        <div className="w-32 h-32 bg-white shadow-2xl rounded-[32px] flex items-center justify-center mb-6 border border-primary/10">
          <Droplets className="w-16 h-16 text-primary fill-primary" />
        </div>
        <h1 className="font-display text-4xl font-bold text-on-background tracking-tight">LifeLink</h1>
        <div className="h-1.5 w-12 bg-primary rounded-full mt-3" />
      </motion.div>

      {/* Slogan */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center z-10 space-y-4 max-w-[280px]"
      >
        <h2 className="font-display text-2xl font-semibold leading-tight text-on-surface">
          讓捐血變簡單<br />讓愛心更便利
        </h2>
        <p className="text-secondary text-base">
          您的貢獻可以挽救生命。立即加入英雄行列。
        </p>
      </motion.div>

      {/* Bento Images (Visual Anchor) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="grid grid-cols-2 gap-4 w-full h-24 grayscale pointer-events-none mt-12 mb-12"
      >
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0uiN7EtECCUvrMM2qKjYULx6Io5KYUlXxJ3Jj9cDglvgOzQkLnqNRfdLLVruFkSJtO0W8MOjW22s77XYFuxsA0kx8-zN_Ur64grgYYMImQVkdRSSM-y2pFPKop4wuEixOsR1WIYPOgKoCJyhkWvoz-xqB-cnLEuhl_JP3N07e--gLcHs8D8BCceypRRS1tARJZjoBsrEEbcEaGbIHUsI5lwvAspc6xmwo2A3rqZ6hEGgP19D84N9RF3s484siDGAnfNSlVgsLqaRSw" 
            alt="Medical scene"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ugyrT66uWiJVoWuoi2G23_tyldcuPixXZPar7g15AqOKNeqAPDqHpHeDwZyD88Hgo-Sx2PKCULabRLjsvu2oF6MyU5aC2RG7Z0U0HOH0-BXx9YfdHuxjLa5FdcChFhzwZRf5i-Bq5fVhEc3yClr8UsYqf5USHxVhnP5Ii5gsxfr_OmR6euKuWV4MkriVP4T8Sg9hP6E6NTxNYAw4mEiHMynLxeN4MVLuAt0y6UxBIcb0atA7LqL1Lh4up2MaSUn4024wTPiq_tXCA" 
            alt="Healthcare professionals"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Actions */}
      <footer className="w-full max-w-md space-y-4 z-20">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full py-4 px-8 bg-primary-container text-white font-semibold text-lg rounded-full shadow-[0_8px_24px_rgba(227,26,57,0.2)] flex items-center justify-center gap-2"
        >
          立即開始 <ArrowRight className="w-5 h-5" />
        </motion.button>
        <button 
          className="w-full py-4 px-8 bg-transparent text-primary font-semibold text-base rounded-full border-2 border-primary/10 hover:bg-primary/5 transition-colors"
        >
          試用模式
        </button>
        <div className="pt-4 text-center">
          <p className="text-xs text-secondary/60">超過 500 家醫療中心信賴使用</p>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Droplet, Clock } from 'lucide-react';
import { fetchLocations, createAppointment } from '../services/api';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewAppointmentModal({ isOpen, onClose, onSuccess }: NewAppointmentModalProps) {
  const [locations, setLocations] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    location_id: '',
    date: '',
    time: '14:00',
    type: '全血',
    volume: '250ml'
  });

  useEffect(() => {
    if (isOpen) {
      fetchLocations().then(setLocations).catch(console.error);
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({
        ...prev,
        date: tomorrow.toISOString().split('T')[0]
      }));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location_id || !formData.date) return;
    
    setIsSubmitting(true);
    try {
      // Combine date and time
      const datetime = new Date(`${formData.date}T${formData.time}:00`).toISOString();
      
      await createAppointment({
        location_id: parseInt(formData.location_id),
        date: datetime,
        type: formData.type,
        volume: formData.volume,
        status: '已確認',
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create appointment', error);
      alert('預約失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-[32px] z-[101] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 pb-12 max-w-screen-md mx-auto relative">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl font-bold text-on-surface">預約捐血</h2>
                <button onClick={onClose} className="p-2 bg-surface-container-low rounded-full text-secondary hover:bg-surface-container-high transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> 選擇地點
                  </label>
                  <select 
                    required
                    value={formData.location_id}
                    onChange={e => setFormData({...formData, location_id: e.target.value})}
                    className="w-full p-4 bg-surface-container-low border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  >
                    <option value="" disabled>請選擇捐血站點...</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name} ({loc.address})</option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> 日期
                    </label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-4 bg-surface-container-low border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> 時段
                    </label>
                    <select 
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                      className="w-full p-4 bg-surface-container-low border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    >
                      <option value="09:00">09:00 - 10:00</option>
                      <option value="10:00">10:00 - 11:00</option>
                      <option value="14:00">14:00 - 15:00</option>
                      <option value="15:00">15:00 - 16:00</option>
                    </select>
                  </div>
                </div>

                {/* Type & Volume */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-primary" /> 捐血類型
                    </label>
                    <div className="flex gap-2">
                      {['全血', '分離術'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, type})}
                          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.type === type ? 'bg-primary text-white shadow-md' : 'bg-surface-container-low text-secondary'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-primary" /> 捐血量
                    </label>
                    <div className="flex gap-2">
                      {['250ml', '500ml'].map(vol => (
                        <button
                          key={vol}
                          type="button"
                          onClick={() => setFormData({...formData, volume: vol})}
                          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.volume === vol ? 'bg-primary text-white shadow-md' : 'bg-surface-container-low text-secondary'}`}
                        >
                          {vol}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? '處理中...' : '確認預約'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

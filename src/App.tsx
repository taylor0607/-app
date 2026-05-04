/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import AppointmentScreen from './components/AppointmentScreen';
import HistoryScreen from './components/HistoryScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav, { Screen } from './components/BottomNav';
import NewAppointmentModal from './components/NewAppointmentModal';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // A simple hack to force re-render/refetch child components upon success
  const [refreshKey, setRefreshKey] = useState(0);

  if (!hasStarted) {
    return <SplashScreen onStart={() => setHasStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {currentScreen === 'home' && <HomeScreen key={`home-${refreshKey}`} onOpenModal={() => setIsModalOpen(true)} />}
          {currentScreen === 'appointment' && <AppointmentScreen key={`appt-${refreshKey}`} onOpenModal={() => setIsModalOpen(true)} />}
          {currentScreen === 'history' && <HistoryScreen key={`hist-${refreshKey}`} />}
          {currentScreen === 'profile' && <ProfileScreen key={`prof-${refreshKey}`} />}
        </motion.div>
      </AnimatePresence>

      <BottomNav 
        currentScreen={currentScreen} 
        onScreenChange={setCurrentScreen} 
      />

      <NewAppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setRefreshKey(prev => prev + 1); // trigger refetch
          setCurrentScreen('appointment'); // auto redirect to appointment screen
        }}
      />
    </div>
  );
}

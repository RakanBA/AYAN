import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContextProvider, useAppContext } from './context/AppContext';
import { ScanScreen } from './screens/ScanScreen';
import { CameraScreen } from './screens/CameraScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { BadgeNotification } from './components/BadgeNotification';
import type { Screen } from './types';

// Screen map for clean rendering logic
const screenMap: Record<Screen, React.ComponentType> = {
  scan: ScanScreen,
  camera: CameraScreen,
  loading: LoadingScreen,
  results: ResultsScreen,
  explore: ExploreScreen,
  rewards: RewardsScreen,
  profile: ProfileScreen,
};

const ScreenRenderer: React.FC = () => {
  const { currentScreen } = useAppContext();
  const CurrentScreenComponent = screenMap[currentScreen];

  const screenVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full h-full"
      >
        <CurrentScreenComponent />
      </motion.div>
    </AnimatePresence>
  );
};


const App: React.FC = () => {
  return (
    <AppContextProvider>
      <div className="w-[390px] h-[844px] bg-background rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col">
        <main className="flex-1 overflow-hidden">
          <ScreenRenderer />
        </main>
        <BadgeNotification />
        <BottomNav />
      </div>
    </AppContextProvider>
  );
};

export default App;
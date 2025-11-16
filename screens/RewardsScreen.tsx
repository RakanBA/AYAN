
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { BADGE_MILESTONES } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

const Badge: React.FC<{ name: string; unlocked: boolean }> = ({ name, unlocked }) => {
  return (
    <motion.div
      className={`flex flex-col items-center p-4 rounded-xl text-center ${unlocked ? 'bg-accent/20' : 'bg-card'}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring' }}
    >
      <div className={`p-3 rounded-full ${unlocked ? 'bg-accent' : 'bg-secondary'}`}>
        <TrophyIcon className={`w-8 h-8 ${unlocked ? 'text-accent-foreground' : 'text-muted-foreground/30'}`} />
      </div>
      <p className={`mt-2 font-semibold ${unlocked ? 'text-accent-foreground' : 'text-muted-foreground'}`}>{name}</p>
    </motion.div>
  );
};

export const RewardsScreen: React.FC = () => {
  const { points, earnedBadges } = useAppContext();
  const { t, language } = useTranslation();

  return (
    <div className="p-6 text-foreground h-full flex flex-col">
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-bold text-primary mb-2">{t('rewards')}</h1>
        <p className="text-muted-foreground mb-6">{t('rewards_desc')}</p>
        
        <motion.div
          className="bg-card p-6 rounded-2xl text-center shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <p className="text-lg text-muted-foreground">{t('total_points')}</p>
          <p className="text-5xl font-bold text-primary">{points}</p>
        </motion.div>
        
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('badges')}</h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(BADGE_MILESTONES).map(([id, milestone]) => {
            const isUnlocked = earnedBadges.some(b => b.id === id);
            return <Badge key={id} name={milestone.name[language]} unlocked={isUnlocked} />;
          })}
        </div>
      </div>
    </div>
  );
};
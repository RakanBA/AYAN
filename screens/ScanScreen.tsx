
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { CameraIcon } from '../components/icons/CameraIcon';
import { AyanLogoIcon } from '../components/icons/AyanLogoIcon';
import { useTranslation } from '../hooks/useTranslation';

export const ScanScreen: React.FC = () => {
  const { navigate } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-foreground p-8">
      <motion.div
        className="w-48"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        <AyanLogoIcon />
      </motion.div>

      <div className="flex-grow flex items-center justify-center">
        <motion.button
          onClick={() => navigate('camera')}
          className="bg-primary text-primary-foreground rounded-full w-52 h-52 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('scan_landmark')}
        >
          <CameraIcon className="w-20 h-20" />
          <span className="mt-2 text-2xl font-semibold">{t('scan_landmark')}</span>
        </motion.button>
      </div>
      
      <p className="text-sm text-muted-foreground/50">{t('scan_prompt')}</p>
    </div>
  );
};
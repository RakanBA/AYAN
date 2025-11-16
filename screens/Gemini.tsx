
import React from 'react';
import { motion } from 'framer-motion';
import { XIcon } from '../components/icons/XIcon';
import { ScanIcon } from '../components/icons/ScanIcon';
import { ExploreIcon } from '../components/icons/ExploreIcon';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { useTranslation } from '../hooks/useTranslation';

interface GeminiGuideProps {
  onClose: () => void;
}

export const GeminiGuide: React.FC<GeminiGuideProps> = ({ onClose }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-popover border rounded-3xl p-6 max-w-sm w-full text-popover-foreground relative max-h-[85vh] overflow-y-auto text-left rtl:text-right"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={t('close')}
        >
          <XIcon className="w-6 h-6" />
        </button>
        
        <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-3">{t('guide_welcome')}</h1>
            <p className="text-muted-foreground mb-8">{t('guide_intro')}</p>
        </div>
        
        <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-secondary p-3 rounded-full mt-1 shrink-0">
                <ScanIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground">{t('guide_scan_title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('guide_scan_desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="bg-secondary p-3 rounded-full mt-1 shrink-0">
                <ExploreIcon className="w-6 h-6 text-primary" />
              </div>
               <div>
                <h2 className="font-bold text-lg text-foreground">{t('guide_explore_title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('guide_explore_desc')}</p>
              </div>
            </div>

             <div className="flex items-start gap-4">
               <div className="bg-secondary p-3 rounded-full mt-1 shrink-0">
                <TrophyIcon className="w-6 h-6 text-primary" />
              </div>
               <div>
                <h2 className="font-bold text-lg text-foreground">{t('guide_progress_title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('guide_progress_desc')}</p>
              </div>
            </div>
        </div>

        <p className="text-center text-primary mt-8 font-semibold">{t('guide_closing')}</p>

      </motion.div>
    </motion.div>
  );
};
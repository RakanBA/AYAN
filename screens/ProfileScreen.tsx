
import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GeminiGuide } from './Gemini';
import { useAppContext } from '../context/AppContext';
import { mockLandmarks } from '../data/mockLandmarks';
import type { Landmark, ScanHistoryItem } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface HistoryItemProps {
  item: {
    landmark: Landmark;
    date: string;
  };
  index: number;
}

const HistoryItemCard: React.FC<HistoryItemProps> = ({ item, index }) => {
  const { language } = useTranslation();
  
  const formattedDate = new Date(item.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="flex items-center gap-4 bg-card p-3 rounded-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <img src={item.landmark.image} alt={item.landmark.name[language]} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
      <div className="flex-1">
        <p className="font-bold text-card-foreground">{item.landmark.name[language]}</p>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </div>
    </motion.div>
  );
};


export const ProfileScreen: React.FC = () => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const { scanHistory } = useAppContext();
  const { t, language, setLanguage } = useTranslation();

  const historyWithDetails = useMemo(() => {
    return scanHistory
      .map(item => {
        const landmark = mockLandmarks.find(lm => lm.id === item.landmarkId);
        return landmark ? { landmark, date: item.date } : null;
      })
      .filter((item): item is { landmark: Landmark; date: string } => item !== null);
  }, [scanHistory]);

  return (
    <>
      <div className="p-6 text-foreground h-full flex flex-col">
        <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-primary mb-6">{t('profile')}</h1>
        </div>

        <div className="flex-grow flex flex-col gap-4">
            <div className="bg-card p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-card-foreground">{t('language')}</span>
                    <div className="flex items-center border rounded-full p-1 bg-secondary">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded-full ${language === 'en' ? 'bg-primary text-primary-foreground' : 'text-secondary-foreground'}`}>EN</button>
                        <button onClick={() => setLanguage('ar')} className={`px-3 py-1 text-sm rounded-full ${language === 'ar' ? 'bg-primary text-primary-foreground' : 'text-secondary-foreground'}`}>AR</button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-foreground mb-4">{t('scan_history')}</h2>
                {historyWithDetails.length > 0 ? (
                    <div className="overflow-y-auto space-y-3 ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3">
                        {historyWithDetails.map((item, index) => (
                           <HistoryItemCard key={`${item.landmark.id}-${item.date}`} item={item} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center bg-secondary/30 rounded-lg p-6">
                        <p className="font-semibold text-foreground">{t('no_scans_yet')}</p>
                        <p className="text-muted-foreground mt-1">{t('no_scans_desc')}</p>
                    </div>
                )}
            </div>

            <div className="flex-shrink-0 text-center py-4">
                <button
                    onClick={() => setIsGuideOpen(true)}
                    className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                >
                    {t('view_app_guide')}
                </button>
            </div>
        </div>

      </div>

      <AnimatePresence>
        {isGuideOpen && <GeminiGuide onClose={() => setIsGuideOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
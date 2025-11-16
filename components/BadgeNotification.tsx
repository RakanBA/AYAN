
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrophyIcon } from './icons/TrophyIcon';
import { XIcon } from './icons/XIcon';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';

export const BadgeNotification: React.FC = () => {
    const { lastEarnedBadge, clearLastEarnedBadge } = useAppContext();
    const { t, language } = useTranslation();

    return (
        <AnimatePresence>
            {lastEarnedBadge && (
                <motion.div
                    className="fixed top-10 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-50"
                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className="bg-popover p-4 rounded-lg border-2 border-primary shadow-2xl flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="bg-primary p-3 rounded-full">
                            <TrophyIcon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-primary">{t('badge_unlocked')}</p>
                            <p className="text-popover-foreground">{lastEarnedBadge.name[language]}</p>
                        </div>
                        <button onClick={clearLastEarnedBadge} className="text-muted-foreground hover:text-foreground">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
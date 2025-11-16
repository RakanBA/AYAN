
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { AppStateContextType, Landmark, ScanHistoryItem, MultiLangString, Language } from '../types';
import { useNavigation } from '../hooks/useNavigation';
import { LOCAL_STORAGE_POINTS_KEY, LOCAL_STORAGE_BADGES_KEY, BADGE_MILESTONES, LOCAL_STORAGE_HISTORY_KEY, LOCAL_STORAGE_LANGUAGE_KEY } from '../constants';

const AppContext = createContext<AppStateContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigation = useNavigation('scan');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [earnedBadges, setEarnedBadges] = useState<{ id: string; name: MultiLangString }[]>([]);
  const [lastEarnedBadge, setLastEarnedBadge] = useState<{ id: string; name: MultiLangString } | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [language, setLanguageState] = useState<Language>('en');

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const storedPoints = localStorage.getItem(LOCAL_STORAGE_POINTS_KEY);
      if (storedPoints) setPoints(JSON.parse(storedPoints));

      const storedBadges = localStorage.getItem(LOCAL_STORAGE_BADGES_KEY);
      if (storedBadges) setEarnedBadges(JSON.parse(storedBadges));

      const storedHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (storedHistory) setScanHistory(JSON.parse(storedHistory));
      
      const storedLanguage = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY);
      if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'ar')) {
        setLanguageState(storedLanguage);
      }

    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  // Effect to update document direction when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);


  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, lang);
    } catch (error) {
      console.error("Failed to save language to localStorage", error);
    }
  }, []);

  const addPoints = useCallback((amount: number) => {
    setPoints(prevPoints => {
      const newPoints = prevPoints + amount;
      try {
        localStorage.setItem(LOCAL_STORAGE_POINTS_KEY, JSON.stringify(newPoints));
      } catch (error) {
        console.error("Failed to save points to localStorage", error);
      }
      
      Object.entries(BADGE_MILESTONES).forEach(([id, milestone]) => {
          if (newPoints >= milestone.points && !earnedBadges.some(b => b.id === id)) {
              earnBadge(id, milestone.name);
          }
      });

      return newPoints;
    });
  }, [earnedBadges]);

  const earnBadge = useCallback((id: string, name: MultiLangString) => {
    setEarnedBadges(prevBadges => {
      if (prevBadges.some(badge => badge.id === id)) {
        return prevBadges;
      }
      const newBadges = [...prevBadges, { id, name }];
      try {
        localStorage.setItem(LOCAL_STORAGE_BADGES_KEY, JSON.stringify(newBadges));
        setLastEarnedBadge({ id, name });
      } catch (error) {
        console.error("Failed to save badges to localStorage", error);
      }
      return newBadges;
    });
  }, []);

  const addScanToHistory = useCallback((landmarkId: string) => {
    setScanHistory(prevHistory => {
      const newHistoryItem: ScanHistoryItem = { landmarkId, date: new Date().toISOString() };
      const newHistory = [newHistoryItem, ...prevHistory];
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error("Failed to save scan history to localStorage", error);
      }
      return newHistory;
    });
  }, []);

  const clearLastEarnedBadge = () => {
    setLastEarnedBadge(null);
  };

  const badges = Object.keys(BADGE_MILESTONES);

  const value: AppStateContextType = {
    ...navigation,
    capturedImage,
    setCapturedImage,
    selectedLandmark,
    setSelectedLandmark,
    points,
    addPoints,
    badges,
    earnBadge,
    earnedBadges,
    lastEarnedBadge,
    clearLastEarnedBadge,
    scanHistory,
    addScanToHistory,
    language,
    setLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppStateContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
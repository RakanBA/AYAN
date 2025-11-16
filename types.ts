
import type React from 'react';

export type Screen = 'scan' | 'camera' | 'loading' | 'results' | 'explore' | 'rewards' | 'profile';

export type Language = 'en' | 'ar';

export interface MultiLangString {
  en: string;
  ar: string;
}

export interface Landmark {
  id: string;
  name: MultiLangString;
  built?: string;
  image: string;
  region?: MultiLangString;
  category?: MultiLangString;
  description?: MultiLangString;
  history?: MultiLangString;
  location?: MultiLangString;
  lat?: number;
  lon?: number;
}

export interface NavigationContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
}

export interface ScanHistoryItem {
  landmarkId: string;
  date: string;
}

export interface AppStateContextType extends NavigationContextType {
  capturedImage: string | null;
  setCapturedImage: (image: string | null) => void;
  selectedLandmark: Landmark | null;
  setSelectedLandmark: (landmark: Landmark | null) => void;
  points: number;
  addPoints: (amount: number) => void;
  badges: string[];
  earnBadge: (id: string, name: MultiLangString) => void;
  earnedBadges: { id: string; name: MultiLangString }[];
  lastEarnedBadge: { id: string; name: MultiLangString } | null;
  clearLastEarnedBadge: () => void;
  scanHistory: ScanHistoryItem[];
  addScanToHistory: (landmarkId: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}
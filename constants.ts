
import type { MultiLangString } from "./types";

export const LOCAL_STORAGE_POINTS_KEY = 'ayan_points';
export const LOCAL_STORAGE_BADGES_KEY = 'ayan_badges';
export const LOCAL_STORAGE_HISTORY_KEY = 'ayan_scan_history';
export const LOCAL_STORAGE_LANGUAGE_KEY = 'ayan_language';

export const POINTS_PER_SCAN = 10;
export const SIMULATED_SCAN_TIME_MS = 2500;

export const SIMULATION_STEPS = [
  "Initializing scanner...",
  "Analyzing image features...",
  "Querying landmark database...",
  "Verifying location data...",
  "Finalizing match..."
];

export const BADGE_MILESTONES: { [key: string]: { name: MultiLangString, points: number } } = {
    'first-scan': { name: { en: 'First Discovery', ar: 'الاكتشاف الأول' }, points: 10 },
    'five-scans': { name: { en: 'Explorer', ar: 'مستكشف' }, points: 50 },
    'ten-scans': { name: { en: 'Adventurer', ar: 'مغامر' }, points: 100 },
    'all-landmarks': { name: { en: 'Master Cartographer', ar: 'خبير الخرائط' }, points: 120 }
};

import { useState, useCallback } from 'react';
import type { Screen, NavigationContextType } from '../types';

export const useNavigation = (initialScreen: Screen): NavigationContextType => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(initialScreen);
  const [history, setHistory] = useState<Screen[]>([]);

  const navigate = useCallback((screen: Screen) => {
    if (screen !== currentScreen) {
      setHistory(prevHistory => [...prevHistory, currentScreen]);
      setCurrentScreen(screen);
    }
  }, [currentScreen]);

  const goBack = useCallback(() => {
    if (history.length > 0) {
      const previousScreen = history[history.length - 1];
      setHistory(prevHistory => prevHistory.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  }, [history]);

  return { currentScreen, navigate, goBack };
};

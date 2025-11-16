import { useAppContext } from '../context/AppContext';
import { getTranslator } from '../lib/i18n';
import type { Language } from '../types';

export const useTranslation = () => {
  const { language, setLanguage } = useAppContext();
  const t = getTranslator(language);

  // The toggleLanguage function was aliased as setLanguage, causing a mismatch
  // with components that need to set a specific language.
  // We now return the correct setLanguage function from context.
  // The toggleLanguage function is removed as it's unused.

  return { t, language, setLanguage };
};


import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import type { Screen } from '../types';
import { ScanIcon } from './icons/ScanIcon';
import { ExploreIcon } from './icons/ExploreIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { UserIcon } from './icons/UserIcon';
import { useTranslation } from '../hooks/useTranslation';

interface NavItemProps {
  screen: Screen;
  labelKey: 'nav_scan' | 'nav_explore' | 'nav_rewards' | 'nav_profile';
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const NavItem: React.FC<NavItemProps> = ({ screen, labelKey, Icon }) => {
  const { currentScreen, navigate } = useAppContext();
  const { t } = useTranslation();
  const isActive = currentScreen === screen;
  const label = t(labelKey);

  return (
    <button
      onClick={() => navigate(screen)}
      className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive ? 'text-accent' : 'text-primary-foreground/70 hover:text-primary-foreground'}`}
      aria-label={label}
    >
      <Icon className="w-7 h-7 mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

export const BottomNav: React.FC = () => {
  return (
    <nav className="flex-shrink-0 h-20 bg-primary border-t border-primary-foreground/20 flex justify-around items-center px-4 rounded-b-5xl">
      <NavItem screen="scan" labelKey="nav_scan" Icon={ScanIcon} />
      <NavItem screen="explore" labelKey="nav_explore" Icon={ExploreIcon} />
      <NavItem screen="rewards" labelKey="nav_rewards" Icon={TrophyIcon} />
      <NavItem screen="profile" labelKey="nav_profile" Icon={UserIcon} />
    </nav>
  );
};
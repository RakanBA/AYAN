
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { mockLandmarks } from '../data/mockLandmarks';
import type { Landmark } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const LandmarkCard: React.FC<{ landmark: Landmark; onClick: () => void }> = ({ landmark, onClick }) => {
    const { language } = useTranslation();
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={onClick}
        >
            <img src={landmark.image} alt={landmark.name[language]} className="w-full h-32 object-cover" />
            <div className="p-4">
            <h3 className="font-bold text-card-foreground">{landmark.name[language]}</h3>
            <p className="text-sm text-muted-foreground">{landmark.region?.[language]}</p>
            </div>
        </motion.div>
    );
};

const SkeletonCard: React.FC = () => (
    <div className="bg-card/50 rounded-lg overflow-hidden animate-pulse">
        <div className="w-full h-32 bg-foreground/10"></div>
        <div className="p-4">
            <div className="h-5 bg-foreground/10 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-foreground/10 rounded w-1/2"></div>
        </div>
    </div>
);

const ITEMS_PER_PAGE = 6;

export const ExploreScreen: React.FC = () => {
  const { navigate, setSelectedLandmark, setCapturedImage } = useAppContext();
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const categories = useMemo(() => ['All', ...Array.from(new Set(mockLandmarks.map(lm => lm.category?.[language]).filter(Boolean))) as string[]], [language]);

  useEffect(() => {
    setSelectedCategory('All');
  }, [language]);

  const filteredAndSortedLandmarks = useMemo(() => {
    let landmarks = mockLandmarks.filter(lm =>
      lm.name[language].toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'All') {
      landmarks = landmarks.filter(lm => lm.category?.[language] === selectedCategory);
    }

    landmarks.sort((a, b) => {
      if (sortOrder === 'name-asc') return a.name[language].localeCompare(b.name[language]);
      if (sortOrder === 'name-desc') return b.name[language].localeCompare(a.name[language]);
      return 0;
    });

    return landmarks;
  }, [searchTerm, selectedCategory, sortOrder, language]);

  const paginatedLandmarks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedLandmarks.slice(0, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedLandmarks, currentPage]);

  const hasMore = paginatedLandmarks.length < filteredAndSortedLandmarks.length;

  useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortOrder]);

  const handleLandmarkClick = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
    setCapturedImage(null);
    navigate('results');
  };

  return (
    <div className="p-6 text-foreground h-full flex flex-col">
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-bold text-primary mb-4">{t('explore')}</h1>
        <input
          type="text"
          placeholder={t('search_landmarks')}
          value={searchTerm}
          onChange={e => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
          }}
          className="w-full p-3 rounded-lg bg-input border focus:ring-2 focus:ring-ring focus:outline-none"
        />
        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto py-4 -mx-6 px-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                  setCurrentPage(1);
                  setSelectedCategory(category);
              }}
              className={`px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground hover:bg-accent/90'
              }`}
            >
              {category === 'All' ? t('all_categories') : category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto -mx-6 px-6">
        <motion.div layout className="grid grid-cols-2 gap-4 mt-4">
          {loading ? (
              Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
              paginatedLandmarks.map(landmark => (
                  <LandmarkCard key={landmark.id} landmark={landmark} onClick={() => handleLandmarkClick(landmark)} />
              ))
          )}
        </motion.div>

        {hasMore && !loading && (
          <div className="flex justify-center mt-6">
              <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                  {t('load_more')}
              </button>
          </div>
        )}
      </div>
    </div>
  );
};
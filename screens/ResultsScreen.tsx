
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import type { Landmark } from '../types';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { BarChartIcon } from '../components/icons/BarChartIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { InfoIcon } from '../components/icons/InfoIcon';
import { useTranslation } from '../hooks/useTranslation';

declare var L: any;

type DetailView = 'info' | 'map' | 'stats' | 'hours';

const InfoContent: React.FC<{ landmark: Landmark }> = ({ landmark }) => {
    const { t, language } = useTranslation();
    return (
        <div className="space-y-4">
        <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{t('description')}</h3>
            <p className="text-muted-foreground leading-relaxed">
            {landmark.description?.[language] || t('info_not_available')}
            </p>
        </div>
        {landmark.history?.[language] && (
            <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{t('history')}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {landmark.history[language]}
            </p>
            </div>
        )}
        </div>
    );
};

const MapContent: React.FC<{ landmark: Landmark }> = ({ landmark }) => {
  const { t, language } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof L !== 'undefined' && mapContainerRef.current && landmark.lat && landmark.lon && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([landmark.lat, landmark.lon], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      L.marker([landmark.lat, landmark.lon]).addTo(mapRef.current)
        .bindPopup(landmark.name[language])
        .openPopup();
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [landmark.lat, landmark.lon, landmark.name, language]);

  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-2">{t('location')}</h3>
      <p className="text-muted-foreground mb-4">{landmark.location?.[language] || landmark.region?.[language] || t('region_not_available')}</p>
      {landmark.lat && landmark.lon ? (
        <div ref={mapContainerRef} className="h-48 bg-secondary rounded-lg shadow-inner z-0" />
      ) : (
        <div className="h-48 bg-secondary rounded-lg flex items-center justify-center shadow-inner">
          <p className="text-secondary-foreground text-sm font-medium">{t('map_data_not_available')}</p>
        </div>
      )}
    </div>
  );
};


const DetailContent: React.FC<{ activeDetail: DetailView; landmark: Landmark }> = ({ activeDetail, landmark }) => {
  let content: React.ReactNode;

  switch(activeDetail) {
    case 'info':
        content = <InfoContent landmark={landmark} />;
        break;
    case 'map':
      content = <MapContent landmark={landmark} />;
      break;
    case 'stats':
      content = <p>Key statistics about {landmark.name.en}.</p>;
      break;
    case 'hours':
      content = <p>Visiting hours and schedule for {landmark.name.en}.</p>;
      break;
    default:
      content = null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeDetail}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="bg-secondary/30 p-4 rounded-xl shadow-inner min-h-[150px]"
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
};

export const ResultsScreen: React.FC = () => {
  const { selectedLandmark, capturedImage, navigate, setCapturedImage } = useAppContext();
  const { t, language } = useTranslation();
  const [activeDetail, setActiveDetail] = useState<DetailView>('info');

  if (!selectedLandmark) {
    navigate('scan');
    return null;
  }

  const handleBack = () => {
    setCapturedImage(null);
    navigate('scan');
  };

  const detailItems: { id: DetailView; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; labelKey: 'info' | 'map' | 'stats' | 'hours' }[] = [
    { id: 'info', icon: InfoIcon, labelKey: 'info' },
    { id: 'map', icon: MapPinIcon, labelKey: 'map' },
    { id: 'stats', icon: BarChartIcon, labelKey: 'stats' },
    { id: 'hours', icon: ClockIcon, labelKey: 'hours' },
  ];

  return (
    <div className="h-full bg-card text-card-foreground p-6 flex flex-col">
      <motion.div className="flex-shrink-0 flex items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button onClick={handleBack} className="p-2 ltr:-ml-2 ltr:mr-2 rtl:-mr-2 rtl:ml-2">
          <ArrowLeftIcon className="w-6 h-6 rtl:rotate-180" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary">{selectedLandmark.name[language]}</h1>
          {selectedLandmark.built && (
            <p className="text-sm text-muted-foreground">{t('built_in')}: {selectedLandmark.built}</p>
          )}
        </div>
      </motion.div>

      <motion.div
        className="flex-shrink-0 w-full h-56 rounded-2xl overflow-hidden shadow-lg mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img
          src={capturedImage || selectedLandmark.image}
          alt={selectedLandmark.name[language]}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="flex-shrink-0 mb-4">
        <div className="flex justify-around">
          {detailItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDetail(item.id)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                  activeDetail === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground hover:bg-accent/90'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold">{t(item.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        <DetailContent activeDetail={activeDetail} landmark={selectedLandmark} />
      </div>
    </div>
  );
};
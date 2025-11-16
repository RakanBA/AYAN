
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { identifyLandmark } from '../lib/apiClient';
import type { Landmark } from '../types';
import { POINTS_PER_SCAN } from '../constants';
import { LoaderIcon } from '../components/icons/LoaderIcon';
import { ErrorModal } from '../components/ErrorModal';
import { useTranslation } from '../hooks/useTranslation';

export const LoadingScreen: React.FC = () => {
  const { capturedImage, navigate, setSelectedLandmark, addPoints, goBack, addScanToHistory } = useAppContext();
  const { t } = useTranslation();
  const [status, setStatus] = useState(t('initializing'));
  const [scanError, setScanError] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const performScan = async () => {
      if (!capturedImage) {
        navigate('scan');
        return;
      }

      try {
        setStatus(t('analyzing'));
        const result = await identifyLandmark(capturedImage);

        setStatus(t('match_found'));
        setSelectedLandmark(result as Landmark);
        addPoints(POINTS_PER_SCAN); 
        addScanToHistory(result.id);
        navigate('results');
      } catch (error) {
        let title = t('scan_failed');
        let description = t('error_unexpected');

        if (error instanceof Error) {
            switch (error.message) {
                case 'NOT_A_BUILDING':
                    description = t('error_not_building');
                    break;
                case 'LANDMARK_NOT_FOUND':
                    description = t('error_not_found');
                    break;
                case 'API_ERROR':
                    title = t('error_connection');
                    description = t('error_connection_desc');
                    break;
                case 'MIXED_CONTENT_ERROR':
                    title = t('error_security');
                    description = t('error_security_desc');
                    break;
            }
        }
        setScanError({ title, description });
      }
    };

    performScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturedImage]);
  
  const handleCloseErrorModal = () => {
    setScanError(null);
    navigate('scan');
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full bg-background p-8">
        {capturedImage && (
          <motion.img
            src={capturedImage}
            alt="Captured landmark"
            className="w-48 h-48 object-cover rounded-2xl shadow-lg border-2 border-primary/50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <h2 className="text-2xl font-bold text-primary mt-8">{t('identifying')}</h2>
        <p className="text-muted-foreground mt-2 text-center">{status}</p>

        <div className="mt-6">
            <LoaderIcon className="w-10 h-10 text-primary animate-spin" />
        </div>
      </div>
      <ErrorModal
        isOpen={!!scanError}
        onClose={handleCloseErrorModal}
        title={scanError?.title || ''}
        description={scanError?.description || ''}
        actions={[
            { labelKey: 'try_again', onClick: goBack, primary: true },
            { labelKey: 'cancel', onClick: handleCloseErrorModal }
        ]}
      />
    </>
  );
};
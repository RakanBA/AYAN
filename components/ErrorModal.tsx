
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

interface ActionButton {
  labelKey: 'try_again' | 'cancel';
  onClick: () => void;
  primary?: boolean;
}

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  actions: ActionButton[];
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, title, description, actions }) => {
  const { t } = useTranslation();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-popover border rounded-lg shadow-lg p-6 max-w-sm w-full text-popover-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            <div className="flex justify-end space-x-3 rtl:space-x-reverse">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                    action.primary
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-accent text-accent-foreground hover:bg-accent/90'
                  }`}
                >
                  {t(action.labelKey)}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
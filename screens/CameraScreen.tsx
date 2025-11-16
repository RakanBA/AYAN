
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { XIcon } from '../components/icons/XIcon';
import { CameraIcon } from '../components/icons/CameraIcon';
import { UploadIcon } from '../components/icons/UploadIcon';
import { useTranslation } from '../hooks/useTranslation';

export const CameraScreen: React.FC = () => {
  const { navigate, goBack, setCapturedImage } = useAppContext();
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [cameraActive, setCameraActive] = useState(false);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }, [stream]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false
        });
        setStream(mediaStream);
        setCameraActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        if (err instanceof Error) {
          if (err.name === 'NotAllowedError') {
            setError(t('camera_denied'));
          } else if (err.name === 'NotFoundError') {
            setError(t('camera_not_found'));
          } else {
            setError(t('camera_error'));
          }
        }
      }
    };

    startCamera();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const currentStream = videoRef.current.srcObject as MediaStream;
            currentStream.getTracks().forEach(track => track.stop());
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        
        stopStream();
        
        setCapturedImage(imageData);
        navigate('loading');
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        stopStream();
        setCapturedImage(imageData);
        navigate('loading');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    stopStream();
    goBack();
  };

  return (
    <div className="h-full bg-black flex flex-col relative">
      <button 
        onClick={handleClose}
        className="absolute top-6 right-6 rtl:right-auto rtl:left-6 z-20 bg-white/20 backdrop-blur-sm p-3 hover:bg-white/30 transition-colors rounded-full"
        aria-label={t('close')}
      >
        <XIcon className="w-6 h-6 text-white" />
      </button>

      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl">
              <p className="mb-4">{error}</p>
              <button
                onClick={handleUploadClick}
                className="bg-accent text-accent-foreground px-8 py-3 hover:bg-accent/90 transition-colors flex items-center gap-2 mx-auto rounded-full"
              >
                <UploadIcon className="w-5 h-5" />
                {t('upload_photo')}
              </button>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-64 h-64">
                <div className="absolute -top-4 -left-4 w-16 h-16 border-l-4 rtl:border-l-0 rtl:border-r-4 border-t-4 border-white rounded-tl-3xl rtl:rounded-tl-none rtl:rounded-tr-3xl"></div>
                <div className="absolute -top-4 -right-4 w-16 h-16 border-r-4 rtl:border-r-0 rtl:border-l-4 border-t-4 border-white rounded-tr-3xl rtl:rounded-tr-none rtl:rounded-tl-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-l-4 rtl:border-l-0 rtl:border-r-4 border-b-4 border-white rounded-bl-3xl rtl:rounded-bl-none rtl:rounded-br-3xl"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-4 rtl:border-r-0 rtl:border-l-4 border-b-4 border-white rounded-br-3xl rtl:rounded-br-none rtl:rounded-bl-3xl"></div>
              </div>
            </div>

            <div className="absolute bottom-32 left-0 right-0 text-center">
              <p className="text-white drop-shadow-lg">{t('camera_aim')}</p>
            </div>
          </>
        )}
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 pb-4 px-6">
        {cameraActive && !error && (
          <button
            onClick={handleCapture}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform border-4 border-accent"
            aria-label="Capture photo"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <CameraIcon className="w-8 h-8 text-accent" />
            </div>
          </button>
        )}
        
        {!error && (
          <button
            onClick={handleUploadClick}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 hover:bg-white/30 transition-colors flex items-center gap-2 rounded-full"
            aria-label={t('upload_photo')}
          >
            <UploadIcon className="w-5 h-5" />
            {t('upload')}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
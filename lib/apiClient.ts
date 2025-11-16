
import type { Landmark } from '../types';
import { mockLandmarks } from '../data/mockLandmarks';

// --- CONFIGURATION ---
const BUILDING_API_URL = "https://porchlike-juliette-unrumpled.ngrok-free.dev/predict_building";
const LANDMARK_API_URL = "https://porchlike-juliette-unrumpled.ngrok-free.dev/predict_landmark";
const INFO_API_URL = "https://porchlike-juliette-unrumpled.ngrok-free.dev/building_info"; // if you have it
const BUILDING_CONFIDENCE_THRESHOLD = 0.7;

/**
 * Converts a base64 data URL to a Blob.
 */
const dataURLtoBlob = (dataUrl: string): Blob => {
  const [header, base64Data] = dataUrl.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  if (!mimeMatch) throw new Error('Invalid data URL');
  const mime = mimeMatch[1];
  const binary = atob(base64Data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
};

/**
 * Identify a landmark using FastAPI backend and optionally augment with extra info.
 */
export const identifyLandmark = async (imageData: string): Promise<Landmark> => {
  // Proactive check for Mixed Content issues (HTTPS frontend calling HTTP backend)
  if (window.location.protocol === 'https:' && (BUILDING_API_URL.startsWith('http:') || LANDMARK_API_URL.startsWith('http:'))) {
    console.error('[API Client] Mixed Content Error: Cannot call an insecure HTTP API from a secure HTTPS page.');
    throw new Error('MIXED_CONTENT_ERROR');
  }

  const imageBlob = dataURLtoBlob(imageData);
  const formData = new FormData();
  formData.append('file', imageBlob, 'capture.jpg');

  try {
    // 1. Predict if it's a building
    console.log(`[API Client] Sending request to building detector: ${BUILDING_API_URL}`);
    const buildingRes = await fetch(BUILDING_API_URL, { method: 'POST', body: formData });
    console.log('[API Client] Received building response:', buildingRes);
    if (!buildingRes.ok) {
        console.error(`[API Client] Building API response not OK: ${buildingRes.status} ${buildingRes.statusText}`);
        throw new Error('API_ERROR');
    }
    const buildingResult = await buildingRes.json();
    console.log('[API Client] Building prediction data:', buildingResult);

    if (buildingResult.predicted_class !== 'Building' || buildingResult.confidence < BUILDING_CONFIDENCE_THRESHOLD) {
      console.warn('[API Client] Image is not a building or confidence is too low.');
      throw new Error('NOT_A_BUILDING');
    }

    // 2. Predict the specific landmark
    console.log(`[API Client] Sending request to landmark identifier: ${LANDMARK_API_URL}`);
    const landmarkRes = await fetch(LANDMARK_API_URL, { method: 'POST', body: formData });
    console.log('[API Client] Received landmark response:', landmarkRes);
    if (!landmarkRes.ok) {
      console.error(`[API Client] Landmark API response not OK: ${landmarkRes.status} ${landmarkRes.statusText}`);
      throw new Error('API_ERROR');
    }
    const landmarkResult = await landmarkRes.json();
    console.log('[API Client] Landmark prediction data:', landmarkResult);
    const landmarkName = landmarkResult.predicted_class as string;

    // 3. Match with local mock data using the English name
    const matchedLandmark = mockLandmarks.find(lm => lm.name.en.toLowerCase() === landmarkName.toLowerCase());
    if (!matchedLandmark) {
      console.error(`[API Client] Landmark "${landmarkName}" not found in local data.`);
      throw new Error('LANDMARK_NOT_FOUND');
    }

    // 4. Optional: Fetch extra building info from API
    try {
      console.log(`[API Client] Fetching extra info for "${landmarkName}" from ${INFO_API_URL}`);
      const infoRes = await fetch(`${INFO_API_URL}?name=${encodeURIComponent(landmarkName)}`);
      if (infoRes.ok) {
        const extraInfo = await infoRes.json();
        console.log('[API Client] Received extra info:', extraInfo);
        // Augment multi-language fields if available, otherwise fallback to existing data
        return {
          ...matchedLandmark,
          description: {
            en: extraInfo.Description_en || matchedLandmark.description?.en || '',
            ar: extraInfo.Description_ar || matchedLandmark.description?.ar || '',
          },
          history: {
            en: extraInfo.History_en || matchedLandmark.history?.en || '',
            ar: extraInfo.History_ar || matchedLandmark.history?.ar || '',
          },
          location: {
            en: extraInfo.Location_en || matchedLandmark.location?.en || '',
            ar: extraInfo.Location_ar || matchedLandmark.location?.ar || '',
          },
          lat: extraInfo.LAT || matchedLandmark.lat,
          lon: extraInfo.LON || matchedLandmark.lon,
        };
      } else {
        console.warn(`[API Client] Failed to fetch extra info, using local data only. Status: ${infoRes.status}`);
      }
    } catch (e) {
      console.warn('[API Client] Could not fetch extra building info, using local data only.', e);
    }

    return matchedLandmark;

  } catch (error) {
    if (error instanceof Error) {
        // Log specific application errors
        if (['NOT_A_BUILDING', 'LANDMARK_NOT_FOUND', 'MIXED_CONTENT_ERROR'].includes(error.message)) {
            console.error(`[API Client] Application Error: ${error.message}`);
            throw error; // Re-throw specific errors to be handled by the UI
        }
    }
    // Log generic connection/network errors
    console.error('[API Client] Connection Error:', error);
    throw new Error('API_ERROR');
  }
};
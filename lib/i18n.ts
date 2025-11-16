
import type { Language } from '../types';

const translations = {
  en: {
    // Bottom Nav
    nav_scan: 'Scan',
    nav_explore: 'Explore',
    nav_rewards: 'Rewards',
    nav_profile: 'Profile',
    // Scan Screen
    scan_landmark: 'Scan Landmark',
    scan_prompt: 'Point your camera at a landmark to identify it and earn points.',
    // Camera Screen
    camera_denied: 'Camera access denied. Please use the upload option below.',
    camera_not_found: 'No camera found. Please use the upload option below.',
    camera_error: 'Unable to access camera. Please use the upload option below.',
    upload_photo: 'Upload Photo',
    camera_aim: 'Point camera at a landmark',
    upload: 'Upload',
    close: 'Close',
    // Loading Screen
    identifying: 'Identifying...',
    initializing: 'Initializing...',
    analyzing: 'Analyzing image...',
    match_found: 'Match found!',
    // Error Modal
    scan_failed: 'Scan Failed',
    error_unexpected: 'An unexpected error occurred. Please try again.',
    error_not_building: 'We couldn\'t detect a building in your photo. Please try again with a clearer image of a landmark.',
    error_not_found: 'We detected a building, but couldn\'t match it to a known landmark in our database.',
    error_connection: 'Connection Error',
    error_connection_desc: 'Could not connect to the identification service. Please check your internet connection and try again.',
    error_security: 'Security Error',
    error_security_desc: 'The app is running on a secure (HTTPS) connection, but the API server is on an insecure (HTTP) connection. Browsers block these requests for security reasons. Please ensure your API server is also running on HTTPS.',
    try_again: 'Try Again',
    cancel: 'Cancel',
    // Results Screen
    built_in: 'Built in',
    description: 'Description',
    history: 'History',
    location: 'Location',
    info_not_available: 'Information not available for this landmark.',
    region_not_available: 'Region information not available.',
    map_data_not_available: 'Map data not available',
    info: 'Info',
    map: 'Map',
    stats: 'Stats',
    hours: 'Hours',
    // Explore Screen
    explore: 'Explore',
    search_landmarks: 'Search landmarks...',
    all_categories: 'All',
    load_more: 'Load More',
    // Rewards Screen
    rewards: 'Rewards',
    rewards_desc: 'Your collection of achievements.',
    total_points: 'Total Points',
    badges: 'Badges',
    badge_unlocked: 'Badge Unlocked!',
    // Profile Screen
    profile: 'Profile',
    scan_history: 'Scan History',
    scanned_on: 'Scanned on',
    no_scans_yet: 'No scans yet!',
    no_scans_desc: 'Your scanned landmarks will appear here.',
    view_app_guide: 'View App Guide',
    language: 'Language',
    // Gemini Guide
    guide_welcome: 'Welcome to AYAN!',
    guide_intro: 'I\'m your AI guide. Let\'s explore the wonders of heritage together. Here’s how to get started:',
    guide_scan_title: '1. How to Scan',
    guide_scan_desc: 'Tap the central \'Scan\' button, point your camera at a landmark, and capture it. I\'ll identify it for you in seconds!',
    guide_explore_title: '2. Explore & Discover',
    guide_explore_desc: 'Visit the \'Explore\' tab to browse our entire collection of landmarks. You can search, filter, and learn about each one.',
    guide_progress_title: '3. Track Your Progress',
    guide_progress_desc: 'Each scan earns you points. Check the \'Rewards\' tab to see your points total and unlock special badges for your discoveries.',
    guide_closing: 'Happy exploring!',
  },
  ar: {
    // Bottom Nav
    nav_scan: 'مسح',
    nav_explore: 'استكشف',
    nav_rewards: 'المكافآت',
    nav_profile: 'الملف الشخصي',
    // Scan Screen
    scan_landmark: 'امسح معلم',
    scan_prompt: 'وجّه كاميرتك نحو معلم للتعرف عليه وكسب النقاط.',
    // Camera Screen
    camera_denied: 'تم رفض الوصول إلى الكاميرا. يرجى استخدام خيار التحميل أدناه.',
    camera_not_found: 'لم يتم العثور على كاميرا. يرجى استخدام خيار التحميل أدناه.',
    camera_error: 'تعذر الوصول إلى الكاميرا. يرجى استخدام خيار التحميل أدناه.',
    upload_photo: 'تحميل صورة',
    camera_aim: 'وجّه الكاميرا نحو معلم',
    upload: 'تحميل',
    close: 'إغلاق',
    // Loading Screen
    identifying: 'جاري التعرّف...',
    initializing: 'جاري التهيئة...',
    analyzing: 'جاري تحليل الصورة...',
    match_found: 'تم العثور على تطابق!',
    // Error Modal
    scan_failed: 'فشل المسح',
    error_unexpected: 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.',
    error_not_building: 'لم نتمكن من اكتشاف مبنى في صورتك. يرجى المحاولة مرة أخرى بصورة أوضح للمعلم.',
    error_not_found: 'لقد اكتشفنا مبنى، لكن لم نتمكن من مطابقته مع معلم معروف في قاعدة بياناتنا.',
    error_connection: 'خطأ في الاتصال',
    error_connection_desc: 'لا يمكن الاتصال بخدمة التعريف. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
    error_security: 'خطأ أمني',
    error_security_desc: 'يعمل التطبيق على اتصال آمن (HTTPS)، لكن خادم الواجهة البرمجية على اتصال غير آمن (HTTP). تمنع المتصفحات هذه الطلبات لأسباب أمنية. يرجى التأكد من أن خادم الواجهة البرمجية يعمل أيضًا على HTTPS.',
    try_again: 'حاول مرة أخرى',
    cancel: 'إلغاء',
    // Results Screen
    built_in: 'بني في',
    description: 'الوصف',
    history: 'التاريخ',
    location: 'الموقع',
    info_not_available: 'المعلومات غير متوفرة لهذا المعلم.',
    region_not_available: 'معلومات المنطقة غير متوفرة.',
    map_data_not_available: 'بيانات الخريطة غير متوفرة',
    info: 'معلومات',
    map: 'خريطة',
    stats: 'إحصائيات',
    hours: 'ساعات العمل',
    // Explore Screen
    explore: 'استكشف',
    search_landmarks: 'ابحث عن معالم...',
    all_categories: 'الكل',
    load_more: 'تحميل المزيد',
    // Rewards Screen
    rewards: 'المكافآت',
    rewards_desc: 'مجموعتك من الإنجازات.',
    total_points: 'مجموع النقاط',
    badges: 'الشارات',
    badge_unlocked: 'تم فتح شارة!',
    // Profile Screen
    profile: 'الملف الشخصي',
    scan_history: 'سجل المسح',
    scanned_on: 'تم المسح في',
    no_scans_yet: 'لا يوجد مسح حتى الآن!',
    no_scans_desc: 'ستظهر معالمك الممسوحة هنا.',
    view_app_guide: 'عرض دليل التطبيق',
    language: 'اللغة',
    // Gemini Guide
    guide_welcome: 'أهلاً بك في آيان!',
    guide_intro: 'أنا دليلك الذكي. لنستكشف عجائب التراث معًا. إليك كيفية البدء:',
    guide_scan_title: '١. كيفية المسح',
    guide_scan_desc: 'اضغط على زر "المسح" المركزي، وجّه كاميرتك نحو معلم، والتقط صورة. سأتعرف عليه لك في ثوانٍ!',
    guide_explore_title: '٢. استكشف واكتشف',
    guide_explore_desc: 'زر علامة التبويب "استكشف" لتصفح مجموعتنا الكاملة من المعالم. يمكنك البحث والتصفية والتعرف على كل واحد منها.',
    guide_progress_title: '٣. تتبع تقدمك',
    guide_progress_desc: 'كل عملية مسح تمنحك نقاطًا. تحقق من علامة التبويب "المكافآت" لرؤية مجموع نقاطك وفتح شارات خاصة لاكتشافاتك.',
    guide_closing: 'استكشاف سعيد!',
  },
};

export const getTranslator = (lang: Language) => (key: keyof typeof translations.en) => {
  return translations[lang][key] || translations.en[key];
};

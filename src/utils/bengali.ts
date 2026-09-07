// Bengali numeral and date conversion utilities

const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

const BENGALI_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const BENGALI_DAYS = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

/**
 * Converts English digits to Bengali digits
 */
export function toBengaliNumber(num: number | string): string {
  if (num === null || num === undefined) return '';
  return String(num).replace(/[0-9]/g, (digit) => BENGALI_NUMERALS[parseInt(digit, 10)]);
}

/**
 * Formats a Date object or ISO string into a standard Bengali news date
 * e.g., "৭ সেপ্টেম্বর ২০২৬, রাত ৮:৩০"
 */
export function formatBengaliDateTime(dateInput: string | Date | undefined): string {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  const day = toBengaliNumber(date.getDate());
  const month = BENGALI_MONTHS[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());

  const hours = date.getHours();
  const minutes = toBengaliNumber(date.getMinutes().toString().padStart(2, '0'));
  
  let period = 'সকাল';
  let formattedHour = hours;
  
  if (hours >= 0 && hours < 6) {
    period = 'রাত';
    formattedHour = hours === 0 ? 12 : hours;
  } else if (hours >= 6 && hours < 12) {
    period = 'সকাল';
    formattedHour = hours;
  } else if (hours >= 12 && hours < 16) {
    period = 'দুপুর';
    formattedHour = hours === 12 ? 12 : hours - 12;
  } else if (hours >= 16 && hours < 19) {
    period = 'বিকেল';
    formattedHour = hours - 12;
  } else {
    period = 'রাত';
    formattedHour = hours - 12;
  }

  const hourBn = toBengaliNumber(formattedHour);

  return `${day} ${month} ${year}, ${period} ${hourBn}:${minutes}`;
}

export const formatBengaliDate = formatBengaliDateTime;


/**
 * Returns today's formatted date with day name for the Top Bar
 * e.g., "সোমবার, ৭ সেপ্টেম্বর ২০২৬"
 */
export function getTodayBengaliDate(): string {
  const now = new Date();
  const dayName = BENGALI_DAYS[now.getDay()];
  const day = toBengaliNumber(now.getDate());
  const month = BENGALI_MONTHS[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${day} ${month} ${year}`;
}

/**
 * Formats relative time in Bengali e.g. "১০ মিনিট আগে", "২ ঘণ্টা আগে"
 */
export function formatBengaliRelativeTime(dateInput: string | Date | undefined): string {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'এইমাত্র';
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${toBengaliNumber(diffInMinutes)} মিনিট আগে`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${toBengaliNumber(diffInHours)} ঘণ্টা আগে`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${toBengaliNumber(diffInDays)} দিন আগে`;
  }

  // Fallback to regular date
  return `${toBengaliNumber(date.getDate())} ${BENGALI_MONTHS[date.getMonth()]}`;
}

/**
 * Generates an SEO friendly URL slug from title (handles Bengali and English)
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\u0980-\u09FFa-z0-9\s-]/g, '') // Keep Bengali unicode range and alphanumeric
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || `news-${Date.now()}`;
}

/**
 * Calculates estimated read time in Bengali
 */
export function calculateReadingTime(content: string): string {
  const words = content.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${toBengaliNumber(minutes)} মিনিট পড়া`;
}

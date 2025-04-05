export interface PrayerTimings {
  Fajr: string;
  Sunrise?: string;
  Dhuhr: string;
  Asr: string;
  Sunset?: string;
  Maghrib: string;
  Isha: string;
  Imsak?: string;
  Midnight?: string;
  Firstthird?: string;
  Lastthird?: string;
}

interface Weekday {
  en: string;
  ar?: string;
}

interface Month {
  number: number;
  en: string;
  ar?: string;
  days?: number;
}

interface Designation {
  abbreviated: string;
  expanded: string;
}

interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: Month;
  year: string;
  designation: Designation;
  holidays: string[];
  adjustedHolidays: string[];
  method: string;
}

interface GregorianDate {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: Month;
  year: string;
  designation: Designation;
  lunarSighting: boolean;
}

interface DateInfo {
  readable: string;
  timestamp: string;
  hijri: HijriDate;
  gregorian: GregorianDate;
}

interface CalculationMethodParams {
  Fajr: number;
  Isha: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface CalculationMethod {
  id: number;
  name: string;
  params: CalculationMethodParams;
  location: Location;
}

interface Meta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: CalculationMethod;
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: Record<string, number>;
}

interface PrayerData {
  timings: PrayerTimings;
  date: DateInfo;
  meta: Meta;
}

export interface ApiResponse {
  code: number;
  status: string;
  data: PrayerData;
}

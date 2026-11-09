export const normalizePhone = (value: string): string => value.replace(/\D/g, "");

/**
 * Accepts Ukrainian numbers written as 0XXXXXXXXX, 80XXXXXXXXX or 380XXXXXXXXX.
 */
export const isValidPhone = (value: string): boolean => {
  const digits = normalizePhone(value);

  if (digits.length === 10) return /^0\d{9}$/.test(digits);
  if (digits.length === 11) return /^80\d{9}$/.test(digits);
  if (digits.length === 12) return /^380\d{9}$/.test(digits);

  return false;
};

/** Formats a Ukrainian number as +38 (0XX) XXX-XX-XX when possible. */
export const formatPhone = (value: string): string => {
  let digits = normalizePhone(value);

  if (digits.startsWith("380")) digits = digits.slice(2);
  if (digits.startsWith("8") && digits.length === 11) digits = digits.slice(1);
  if (!digits.startsWith("0")) return value.trim();

  digits = digits.slice(0, 10);
  const [, code = "", a = "", b = "", c = ""] = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/) ?? [];

  let out = "+38";
  if (code) out += ` (${code}`;
  if (code.length === 3) out += ")";
  if (a) out += ` ${a}`;
  if (b) out += `-${b}`;
  if (c) out += `-${c}`;

  return out;
};

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export const todayIsoDate = (): string => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
};

export const maxBookingDate = (daysAhead = 60): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

/** True when the chosen time has already passed for today's date. */
export const isPastSlot = (date: string, time: string): boolean => {
  if (!date || !time || date !== todayIsoDate()) return false;

  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  return hours * 60 + minutes <= now.getHours() * 60 + now.getMinutes();
};

export const isSunday = (date: string): boolean => {
  if (!date) return false;
  return new Date(`${date}T12:00:00`).getDay() === 0;
};

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

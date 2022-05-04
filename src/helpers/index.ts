import { AppointmentInfo } from 'types';

export const isDevelopmentMode = process.env.NODE_ENV === 'development';
const STORE_KEY = 'app-scheduler.appointments';
export const storeAppointments = (items: Array<AppointmentInfo>): void => {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(items));
  } catch (e) {}
};
export const getAppointments = (): Array<AppointmentInfo> => {
  try {
    return JSON.parse(window.localStorage.getItem(STORE_KEY) || '') || [];
  } catch (e) {}
  return [];
};

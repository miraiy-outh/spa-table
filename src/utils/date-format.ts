import { TDateISO } from "../services/types/datetime-types";

const pad = (n: number) => n.toString().padStart(2, "0");

export function formatDateFromISO(date: TDateISO) {
  var newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = pad(newDate.getMonth() + 1);
  const day = pad(newDate.getDate());
  const hours = pad(newDate.getHours());
  const minutes = pad(newDate.getMinutes());
  const seconds = pad(newDate.getSeconds());
  const gmt = newDate.toString().match(/GMT([+-]\d{4})/)?.[0];
  return [`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`, gmt];
}

export function formatDateToISO(
  date: Date
): `${string}-${string}-${string}T${string}:${string}:${string}.${string}Z` {
  const year = date.getFullYear().toString();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours() - 3);
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.017Z`;
}

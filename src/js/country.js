import { countries } from "countries-list";

export function getCountryFullName(countryCode) {
  const country = countries[countryCode];
  return country ? country.name : 'Unknown Country';
}


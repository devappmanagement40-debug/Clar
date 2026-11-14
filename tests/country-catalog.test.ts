import test from "node:test";
import assert from "node:assert/strict";
import {
  FALLBACK_API_COUNTRIES,
  FALLBACK_COUNTRIES,
  getCountryByCode,
  getCountriesForDisplay,
  formatCurrency,
} from "../client/src/lib/countries.ts";

test("Congo-Kinshasa uses CDF and the +243 phone prefix", () => {
  const fallback = FALLBACK_COUNTRIES.find((country) => country.code === "CD");
  const apiFallback = getCountryByCode("CD", FALLBACK_API_COUNTRIES);

  assert.equal(fallback?.name, "Congo-Kinshasa");
  assert.equal(fallback?.currency, "CDF");
  assert.equal(fallback?.phonePrefix, "243");
  assert.equal(apiFallback?.currency, "CDF");
  assert.equal(apiFallback?.phonePrefix, "243");
});

test("Congo-Kinshasa appears in country pickers when the countries API fails", () => {
  const countries = getCountriesForDisplay(undefined, true);
  const congo = countries.find((country) => country.code === "CD");

  assert.deepEqual(countries.map((country) => country.code), ["CD"]);
  assert.equal(congo?.isActive, true);
  assert.equal(congo?.currency, "CDF");
  assert.equal(congo?.phonePrefix, "243");
});

test("RDC amounts stay in CDF even if the countries API returns another currency", () => {
  const staleCountry = { ...FALLBACK_API_COUNTRIES[0], currency: "XOF" };

  assert.equal(getCountryByCode("cd", [staleCountry])?.currency, "CDF");
  assert.match(formatCurrency(12000, "CD", [staleCountry]), /CDF$/);
});

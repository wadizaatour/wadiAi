import { defineStore } from "pinia";

export const useCountryStore = defineStore("countryStore", {
  state: () => ({
    selectedCountries: JSON.parse(localStorage.getItem("selectedCountries") || "[]"),
    weatherData: JSON.parse(localStorage.getItem("weatherData") || "{}"),
    hourlyData: JSON.parse(localStorage.getItem("hourlyData") || "{}"),
  }),
  actions: {
    addCountry(country) {
      if (!this.selectedCountries.some((c) => c.name === country.name)) {
        this.selectedCountries.push(country);
        this.saveToLocalStorage();
      }
    },
    removeCountry(country) {
      this.selectedCountries = this.selectedCountries.filter(
        (c) => c.name !== country.name
      );
      delete this.weatherData[country.name];
      delete this.hourlyData[country.name];
      this.saveToLocalStorage();
    },
    saveWeatherData(countryName, data) {
      this.weatherData[countryName] = data;
      this.saveToLocalStorage();
    },
    saveHourlyData(countryName, data) {
      this.hourlyData[countryName] = data;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("selectedCountries", JSON.stringify(this.selectedCountries));
      localStorage.setItem("weatherData", JSON.stringify(this.weatherData));
      localStorage.setItem("hourlyData", JSON.stringify(this.hourlyData));
    },
    loadFromLocalStorage() {
      this.selectedCountries = JSON.parse(localStorage.getItem("selectedCountries") || "[]");
      this.weatherData = JSON.parse(localStorage.getItem("weatherData") || "{}");
      this.hourlyData = JSON.parse(localStorage.getItem("hourlyData") || "{}");
    },
  },
});
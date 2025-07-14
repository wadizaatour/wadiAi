<template>
  <section
    class="max-w-3xl md:max-w-5xl mx-auto p-4 sm:p-8 md:p-12 space-y-8 md:space-y-12 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-xl mt-6 mb-6"
  >
    <h1
      class="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-gray-100 drop-shadow"
    >
      Weather App
    </h1>
    <div
      class="flex flex-col space-y-3 sm:space-y-4 max-w-xs sm:max-w-md mx-auto"
    >
      <!-- Search Box -->
      <input
        v-model="locationQuery"
        @input="filterCountries"
        type="text"
        placeholder="Search for a country"
        class="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 shadow-sm"
      />
      <ul
        v-if="filteredCountries.length"
        class="border border-gray-200 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-900/90 shadow-xl"
      >
        <li
          v-for="country in filteredCountries"
          :key="country.name"
          @click="selectCountry(country)"
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-900 dark:text-gray-100"
        >
          {{ country.name }}
        </li>
      </ul>
    </div>

    <!-- Selected Countries Grid -->
    <div
      v-if="countryStore.selectedCountries.length"
      class="grid grid-cols-1 sm:grid-cols-2 gap-6"
    >
      <div
        v-for="country in countryStore.selectedCountries"
        :key="country.name"
        class="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col space-y-4 border border-gray-200 dark:border-gray-700 hover:shadow-gray-200 dark:hover:shadow-gray-800 transition-shadow duration-200"
      >
        <!-- Country Flag -->
        <div class="flex items-center gap-4">
          <img
            :src="getCountryFlag(country.name)"
            :alt="country.name"
            class="w-16 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow"
          />
          <!-- Weather Info -->
          <div class="flex-1">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">
              {{ country.name }}
            </h2>
            <div
              v-if="countryStore.weatherData[country.name]"
              class="text-left text-gray-800 dark:text-gray-200"
            >
              <p class="text-sm capitalize">
                {{ countryStore.weatherData[country.name].condition }}
              </p>
              <p class="text-sm">
                <span class="font-medium">Précipitations:</span>
                {{ countryStore.weatherData[country.name].precipitation }}%
              </p>
              <p class="text-sm">
                <span class="font-medium">Vent:</span>
                {{ countryStore.weatherData[country.name].windSpeed }} km/h
              </p>
            </div>
            <div v-else class="text-gray-400 dark:text-gray-500 text-sm italic">
              Loading weather data...
            </div>
          </div>
          <!-- Temperature -->
          <div class="text-right flex flex-col items-end">
            <p
              class="text-4xl font-extrabold text-gray-900 dark:text-gray-100 drop-shadow"
            >
              {{
                Math.round(countryStore.weatherData[country.name]?.temp || 0)
              }}°C
            </p>
          </div>
        </div>

        <!-- Local Time -->
        <div
          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium"
        >
          Local Time: {{ getLocalTime(country.name) }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCountryStore } from "~/stores/countryStore";

const locationQuery = ref("");
const filteredCountries = ref([]);

// Access the Pinia store
const countryStore = useCountryStore();

// Rehydrate the store on app load
onMounted(() => {
  countryStore.loadFromLocalStorage();
});

// List of countries with their coordinates, flags, and time zones
const countries = [
  {
    name: "Netherlands",
    lat: 52.3676,
    lon: 4.9041,
    flag: "https://flagcdn.com/w320/nl.png",
    timeZone: "Europe/Amsterdam",
  },
  {
    name: "France",
    lat: 48.8566,
    lon: 2.3522,
    flag: "https://flagcdn.com/w320/fr.png",
    timeZone: "Europe/Paris",
  },
  {
    name: "Germany",
    lat: 52.52,
    lon: 13.405,
    flag: "https://flagcdn.com/w320/de.png",
    timeZone: "Europe/Berlin",
  },
  {
    name: "United States",
    lat: 37.7749,
    lon: -122.4194,
    flag: "https://flagcdn.com/w320/us.png",
    timeZone: "America/Los_Angeles",
  },
  {
    name: "Canada",
    lat: 45.4215,
    lon: -75.6972,
    flag: "https://flagcdn.com/w320/ca.png",
    timeZone: "America/Toronto",
  },
  {
    name: "Australia",
    lat: -33.8688,
    lon: 151.2093,
    flag: "https://flagcdn.com/w320/au.png",
    timeZone: "Australia/Sydney",
  },
  {
    name: "India",
    lat: 28.6139,
    lon: 77.209,
    flag: "https://flagcdn.com/w320/in.png",
    timeZone: "Asia/Kolkata",
  },
  {
    name: "Japan",
    lat: 35.6895,
    lon: 139.6917,
    flag: "https://flagcdn.com/w320/jp.png",
    timeZone: "Asia/Tokyo",
  },
  {
    name: "Brazil",
    lat: -23.5505,
    lon: -46.6333,
    flag: "https://flagcdn.com/w320/br.png",
    timeZone: "America/Sao_Paulo",
  },
  {
    name: "South Africa",
    lat: -33.9249,
    lon: 18.4241,
    flag: "https://flagcdn.com/w320/za.png",
    timeZone: "Africa/Johannesburg",
  },
  {
    name: "Prague",
    lat: 50.0755,
    lon: 14.4378,
    flag: "https://flagcdn.com/w320/cz.png",
    timeZone: "Europe/Prague",
  },
  {
    name: "Bali",
    lat: -8.3405,
    lon: 115.092,
    flag: "https://flagcdn.com/w320/id.png",
    timeZone: "Asia/Makassar",
  },
  {
    name: "Philippines",
    lat: 12.8797,
    lon: 121.774,
    flag: "https://flagcdn.com/w320/ph.png",
    timeZone: "Asia/Manila",
  },
  {
    name: "Tunisia",
    lat: 33.8869,
    lon: 9.5375,
    flag: "https://flagcdn.com/w320/tn.png",
    timeZone: "Africa/Tunis",
  },
];

function filterCountries() {
  const query = locationQuery.value.toLowerCase();
  filteredCountries.value = countries.filter((country) =>
    country.name.toLowerCase().includes(query)
  );
}

function selectCountry(country) {
  countryStore.addCountry(country);
  fetchWeather(country);
  locationQuery.value = "";
  filteredCountries.value = [];
}

function getCountryFlag(countryName) {
  const country = countries.find((c) => c.name === countryName);
  return country ? country.flag : "https://flagcdn.com/w320/unknown.png";
}

function getLocalTime(countryName) {
  const country = countries.find((c) => c.name === countryName);
  if (!country || !country.timeZone) return "Unknown";

  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: country.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(now);
}

async function fetchWeather(country) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${country.lat}&longitude=${country.lon}&current_weather=true&hourly=temperature_2m`
    );
    const data = await response.json();

    const weatherData = {
      temp: data.current_weather.temperature,
      condition: "Temps clair avec quelques nuages",
      precipitation: data.current_weather.precipitation ?? 0,
      windSpeed: data.current_weather.windspeed,
      icon: "01d",
    };

    const hourlyData = data.hourly.temperature_2m
      .slice(0, 12)
      .map((temp, index) => ({
        time: `${index + 1}h`,
        temp: Math.round(temp),
      }));

    countryStore.saveWeatherData(country.name, weatherData);
    countryStore.saveHourlyData(country.name, hourlyData);
  } catch (error) {
    console.error(`Error fetching weather data for ${country.name}:`, error);
  }
}
</script>

<style scoped>
.hourly-graph {
  width: 100%;
  height: 300px;
}
</style>

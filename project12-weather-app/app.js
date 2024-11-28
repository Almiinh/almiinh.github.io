// Visual Crossing Weather API Key (Note: This is a public, free-tier API key)
const API_KEY = 'B5AF69RTEM9C4BC4E2HAZFK84';  // Replace with your actual Visual Crossing API key
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// Giphy API for weather-related GIFs
const GIPHY_API_KEY = 'nU6Wmzj5LeX4Lps8hr73q9xfwjGZ5LUC';  // Replace with your Giphy API key

class WeatherApp {
    constructor() {
        this.locationForm = document.getElementById('location-form');
        this.locationInput = document.getElementById('location-input');
        this.temperatureToggle = document.getElementById('temp-toggle');
        this.loadingIndicator = document.getElementById('loading');
        this.weatherContainer = document.getElementById('weather-container');

        this.weatherEmojis = {
            'clear': '☀️',
            'cloudy': '☁️',
            'partly cloudy': '⛅',
            'rain': '🌧️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'wind': '💨',
            'fog': '🌫️'
        };

        this.setupEventListeners();
        this.temperatureToggle.checked = true;
    }

    setupEventListeners() {
        this.locationForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const location = this.locationInput.value.trim();

        if (!location) return;

        this.showLoading();
        try {
            const weatherData = await this.fetchWeatherData(location);
            const processedData = this.processWeatherData(weatherData);
            this.displayWeatherData(processedData);
            await this.fetchWeatherGif(processedData.conditions);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError('Could not fetch weather data. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async fetchWeatherData(location) {
        const url = `${BASE_URL}${location}/today?key=${API_KEY}&unitGroup=metric&include=current&contentType=json`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }
        return await response.json();
    }

    processWeatherData(data) {
        const currentConditions = data.currentConditions;
        return {
            location: data.resolvedAddress,
            temperature: {
                celsius: Math.round(currentConditions.temp),
                fahrenheit: Math.round((currentConditions.temp * 9/5) + 32)
            },
            conditions: currentConditions.conditions.toLowerCase(),
            humidity: `${currentConditions.humidity}%`,
            windSpeed: `${Math.round(currentConditions.windspeed)} km/h`,
            precipitation: `${currentConditions.precip} mm`
        };
    }

    async fetchWeatherGif(conditions) {
        const weatherTerms = [
            'sunny', 'rain', 'cloud', 'snow', 'storm', 'wind'
        ];
        const matchedTerm = weatherTerms.find(term => conditions.includes(term)) || 'weather';

        try {
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${matchedTerm}&limit=1&rating=g`
            );
            const gifData = await response.json();
            const gifUrl = gifData.data[0]?.images?.downsized?.url;
            
            const weatherGifContainer = document.getElementById('weather-gif');
            weatherGifContainer.innerHTML = gifUrl 
                ? `<img src="${gifUrl}" alt="${matchedTerm} weather">`
                : '';
        } catch (error) {
            console.error('Error fetching weather GIF:', error);
        }
    }

    formatDateTime(date = new Date()) {
        const options = {
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        return date.toLocaleString(navigator.language, options);
    }

    displayWeatherData(data) {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        const isCelsius = this.temperatureToggle.checked;
        const temp = isCelsius 
            ? data.temperature.celsius 
            : data.temperature.fahrenheit;
        const unit = isCelsius ? '°C' : '°F';

        // Find the most appropriate emoji for the conditions
        const conditionsLower = data.conditions.toLowerCase();
        const emoji = Object.entries(this.weatherEmojis).reduce((found, [key, value]) => {
            return conditionsLower.includes(key) ? value : found;
        }, '🌈');  // default emoji if no match

        document.getElementById('location-name').textContent = data.location;
        document.getElementById('temperature').textContent = `${temp}${unit} ${emoji}`;
        document.getElementById('conditions').textContent = capitalizeFirstLetter(data.conditions);
        document.getElementById('humidity').textContent = `Humidity: ${data.humidity}`;
        document.getElementById('wind').textContent = `Wind: ${data.windSpeed}`;
        document.getElementById('precipitation').textContent = `Precipitation: ${data.precipitation}`;

        // Add fetch time
        const fetchTimeElement = document.getElementById('fetch-time');
        fetchTimeElement.textContent = `Fetched: ${this.formatDateTime()}`;

        this.weatherContainer.classList.remove('hidden');
        this.updateBackgroundColor(data.conditions);
    }

    updateBackgroundColor(conditions) {
        const body = document.body;
        if (conditions.includes('rain')) {
            body.style.backgroundColor = '#7fa7c4';  // Blue-gray for rainy
        } else if (conditions.includes('cloud')) {
            body.style.backgroundColor = '#b0c4de';  // Light steel blue for cloudy
        } else if (conditions.includes('snow')) {
            body.style.backgroundColor = '#f0f8ff';  // Alice blue for snowy
        } else if (conditions.includes('clear')) {
            body.style.backgroundColor = '#87ceeb';  // Sky blue for clear
        } else {
            body.style.backgroundColor = '#f4f4f4';  // Default
        }
    }

    showLoading() {
        this.loadingIndicator.classList.remove('hidden');
        this.weatherContainer.classList.add('hidden');
    }

    hideLoading() {
        this.loadingIndicator.classList.add('hidden');
    }

    showError(message) {
        this.hideLoading();
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.textContent = message;
        this.weatherContainer.appendChild(errorDiv);
    }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
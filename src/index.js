import axios from 'axios';
import './style.css';
const API_KEY = '543eee489d4496013343db46a4ce969e';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        console.log(`City entered: ${city}`);
        getWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

function getWeatherData(city) {
    console.log(`Making API request for: ${city}`);

    axios.get(`${baseURL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            console.log('API response:', response);

            const data = response.data;
            if (data) {
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `${data.main.temp} °C`;
                document.getElementById('feelsLike').textContent = `${data.main.feels_like} °C`;
                document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
                document.getElementById('humidity').textContent = `${data.main.humidity} %`;
            } else {
                console.error('Data is undefined or not returned correctly from the API.');
            }
        })
        .catch(error => {
            if (error.response) {
                console.error('Error response from API:', error.response.data);
            } else if (error.request) {
                console.error('No response received from API:', error.request);
            } else {
                console.error('Error setting up API request:', error.message);
            }
        });
}

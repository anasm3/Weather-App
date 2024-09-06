async function getWeather() {
    const city = document.getElementById('city').value;
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?city=${city}&format=json`;

    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.length > 0) {
        const lat = geocodeData[0].lat;
        const lon = geocodeData[0].lon;
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,windspeed_10m`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.hourly && weatherData.hourly.temperature_2m) {
            const temperature = weatherData.hourly.temperature_2m[0];
            const humidity = weatherData.hourly.relative_humidity_2m[0];
            const windSpeed = weatherData.hourly.windspeed_10m[0];

            document.getElementById('temperature').innerText = `${Math.round(temperature)}°C`;
            document.getElementById('feels-like').innerText = `Feels like: ${Math.round(temperature)}`;
            document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
            document.getElementById('wind-speed').innerText = `Wind speed: ${windSpeed} m/s`;

            const weatherIcon = document.getElementById('weather-icon');
            const description = document.getElementById('description');
            if (temperature > 25) {
                weatherIcon.innerHTML = `<img src="Images/sunny.png" alt="Sunny weather icon" height="80" width="80">`;
                description.innerText = 'Sunny';
            } else if (temperature > 15) {
                weatherIcon.innerHTML = `<img src="Images/Cloudy.png" alt="Cloudy weather icon" height="80" width="80">`;
                description.innerText = 'Cloudy';
            } else {
                weatherIcon.innerHTML = `<img src="Images/rainy.png" alt="Rainy weather icon" height="80" width="80">`;
                description.innerText = 'Rainy';
            }
        } else {
            alert('Weather data not available');
        }
    } else {
        alert('City not found');
    }
}

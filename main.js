const getWeather = async () => {
    const city = document.getElementById('city').value.trim();

    document.getElementById('weather-icon').style.display = 'none';
    document.getElementById('temperature').style.display = 'none';
    document.getElementById('description').style.display = 'none';
    document.querySelector('.details').style.display = 'none';
    document.getElementById('spinner').style.display = 'flex';

    if (city === '') {
        document.getElementById('spinner').style.display = 'none';
        return;
    }

    try {
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?city=${city}&format=json`;
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.length > 0) {
            const { lat, lon } = geocodeData[0];
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,windspeed_10m`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            if (weatherData.hourly && weatherData.hourly.temperature_2m) {
                const [temperature] = weatherData.hourly.temperature_2m;
                const [humidity] = weatherData.hourly.relative_humidity_2m;
                const [windSpeed] = weatherData.hourly.windspeed_10m;

                document.getElementById('temperature').innerText = `${Math.round(temperature)}°C`;
                document.getElementById('feels-like').innerText = `Feels like: ${Math.round(temperature)}°C`;
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

                weatherIcon.style.display = 'block';
                document.getElementById('temperature').style.display = 'block';
                document.getElementById('description').style.display = 'block';
                document.querySelector('.details').style.display = 'flex';
            } else {
                alert('Weather data not available');
            }
        } else {
            alert('City not found');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching the weather data');
    } finally {
        document.getElementById('spinner').style.display = 'none';
    }
};

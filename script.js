function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const result = document.getElementById('weatherResult');
  result.innerHTML = '';

  if (!city) {
    result.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const apiKey = '555ad5e5cc4cec349d5942f5ad670f24';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('City not found or API error.');
      return res.json();
    })
    .then(data => {
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      let rainHTML = '';
      if (data.rain && data.rain['1h']) {
        rainHTML = `
          <div class="weather-row"><span>🌧️ Rain (last 1h):</span> <span>${data.rain['1h']} mm</span></div>
        `;
      }

      const weatherHTML = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon" />
          <p><strong>${data.weather[0].main}</strong> – ${data.weather[0].description}</p>

          <div class="weather-info">
            <div class="weather-row"><span>🌡 Temperature:</span> <span>${data.main.temp.toFixed(1)}°C</span></div>
            <div class="weather-row"><span>🤒 Feels Like:</span> <span>${data.main.feels_like.toFixed(1)}°C</span></div>
            <div class="weather-row"><span>💧 Humidity:</span> <span>${data.main.humidity}%</span></div>
            <div class="weather-row"><span>🌬 Wind Speed:</span> <span>${data.wind.speed} m/s</span></div>
            <div class="weather-row"><span>📈 Max Temp:</span> <span>${data.main.temp_max.toFixed(1)}°C</span></div>
            <div class="weather-row"><span>📉 Min Temp:</span> <span>${data.main.temp_min.toFixed(1)}°C</span></div>
            <div class="weather-row"><span>📊 Pressure:</span> <span>${data.main.pressure} hPa</span></div>
            <div class="weather-row"><span>☁️ Cloudiness:</span> <span>${data.clouds.all}%</span></div>
            <div class="weather-row"><span>🔭 Visibility:</span> <span>${(data.visibility / 1000).toFixed(1)} km</span></div>
            ${rainHTML}
          </div>
        </div>
      `;

      result.innerHTML = weatherHTML;
    })
    .catch(error => {
      result.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    });
}

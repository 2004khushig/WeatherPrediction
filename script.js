const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '997cc0f2bcmshc62723b9d0358afp18d423jsn72db9998c512',
        'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
    }
};

async function fetchWeather(cityName) {
    document.getElementById("cityName").innerHTML = cityName; // Update cityName display
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${cityName}`; // Use the city name in the API URL

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        const result = await response.json(); // Parse the response as JSON

        // Accessing the main weather data
        const mainData = result.main;
        const windData = result.wind; // Access wind data

        // Update the HTML elements with the fetched data
        document.getElementById("temp").innerHTML = (mainData.temp - 273.15).toFixed(2) + ' °C'; // Convert Kelvin to Celsius
        document.getElementById("feels_like").innerHTML = (mainData.feels_like - 273.15).toFixed(2) + ' °C'; // Convert Kelvin to Celsius
        document.getElementById("temp_min").innerHTML = (mainData.temp_min - 273.15).toFixed(2) + ' °C'; // Convert Kelvin to Celsius
        document.getElementById("temp_max").innerHTML = (mainData.temp_max - 273.15).toFixed(2) + ' °C'; // Convert Kelvin to Celsius
        document.getElementById("pressure").innerHTML = mainData.pressure + ' hPa';
        document.getElementById("humidity").innerHTML = mainData.humidity + ' %';
        document.getElementById("sea_level").innerHTML = (mainData.sea_level || 0) + ' hPa'; // Sea level may not be present
        document.getElementById("country").innerHTML = result.sys.country;
        document.getElementById("sunrise").innerHTML = new Date(result.sys.sunrise * 1000).toLocaleTimeString(); // Convert Unix timestamp to human-readable format
        document.getElementById("sunset").innerHTML = new Date(result.sys.sunset * 1000).toLocaleTimeString(); // Convert Unix timestamp to human-readable format

        // Add visibility and wind speed to the HTML
        document.getElementById("visibility").innerHTML = (result.visibility / 1000).toFixed(2) + ' km'; // Convert meters to kilometers
        document.getElementById("wind_speed").innerHTML = windData.speed + ' m/s'; // Wind speed in m/s

        console.log(result);
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

// Call the function to fetch the weather for a specific city
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission
    const city = document.getElementById("city").value; // Get the city input value
    fetchWeather(city);
});

// Initial fetch for a default city
fetchWeather("Delhi");

const cities = ["Shanghai", "Lucknow", "Tokyo", "Bangalore", "Singapore", "Mumbai"]; // List of cities

async function fetchWeatherForCity(cityName) {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${cityName}`;
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        const result = await response.json();

        // Create a row and insert data for the current city
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row" class="text-start">${cityName}</th>
            <td>${(result.main.temp - 273.15).toFixed(2)} °C</td>
            <td>${(result.main.feels_like - 273.15).toFixed(2)} °C</td>
            <td>${(result.main.temp_min - 273.15).toFixed(2)} °C</td>
            <td>${(result.main.temp_max - 273.15).toFixed(2)} °C</td>
            <td>${result.main.pressure} hPa</td>
            <td>${result.main.humidity} %</td>
            <td>${result.sys.country}</td>
            <td>${new Date(result.sys.sunrise * 1000).toLocaleTimeString()}</td>
            <td>${new Date(result.sys.sunset * 1000).toLocaleTimeString()}</td>
        `;
        
        document.querySelector("tbody").appendChild(row); // Add row to table body
    } catch (error) {
        console.error(`Error fetching data for ${cityName}:`, error);
    }
}

// Loop through each city in the array and fetch its weather data
cities.forEach(city => fetchWeatherForCity(city));

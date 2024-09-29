document.addEventListener('DOMContentLoaded', function() {
    console.log("Hello");

    const searchButton = document.querySelector("#search-button");
    const inputButton = document.querySelector('#city-name');

    // update data function to update the web page
    const updateData = (data) => {
        const weatherImage = document.querySelector('#weather-current-image');
        const temperatureText = document.querySelector('#para-text');
        const cityText = document.querySelector('#city-text');
        const humidityText = document.querySelector('#humidity-text');
        const windSpeedText = document.querySelector('#wind-speed-text');

        const anotherContainer = document.querySelector('.another-container');
        const outputContainer = document.querySelector('.output-container-javascript');
        // taking the specific data
        const weatherImageFromData = data.weather[0].main;
        const temperatureFromData = data.main.temp;
        const cityFromData = data.name;
        const humidityFromData = data.main.humidity;
        const windSpeedFromData = data.wind.speed;

        console.log(weatherImageFromData);
        if (weatherImageFromData === "Rain") {
            weatherImage.src = "rainlyWeather.png";
        } else if (weatherImageFromData === 'Mist') {
            weatherImage.src = "mist.png";
        } else if (weatherImageFromData === 'Sunny') {
            weatherImage.src = "sunny.webp";
        } else if  (weatherImageFromData === 'Clouds') {
            weatherImage.src = "night.png";
        } else {
            weatherImage.src = 'night.png';
        }

        outputContainer.style.display = "flex";
        temperatureText.innerHTML = `<p>${temperatureFromData}&deg;</p>`;
        cityText.innerHTML = `<p>${cityFromData}</p>`;
        anotherContainer.style.display = 'flex';
        humidityText.innerHTML = `<p>${humidityFromData}&#37;</p>`;
        windSpeedText.innerHTML = `<p>${windSpeedFromData}km/hr</p>`;
    }

    // LoadData function to fetch the data from the API with error handling
    const loadData = async (userCity) => {
        const apiKey = '13df1ff22bd48a45742375375c30681c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);

            // Check if the response status is not OK
            if (!response.ok) {
                throw new Error(`City not found or an issue occurred. Status code: ${response.status}`);
            }

            const weatherData = await response.json();
            console.log('Data fetched successfully:', weatherData);
            updateData(weatherData);

        } catch (error) {
            console.error('Error fetching data:', error);
            alert(`Network Error: ${error.message}`);
        }
    }

    // Search button function invoked when the user clicks the search button
    searchButton.addEventListener('click', function() {
        const userCity = inputButton.value;
        if (userCity.trim() === '') {
            alert("City Name should not be empty");
            return;
        } else {
            console.log(`User Input city is ${userCity}`);
            // Call the loadData function
            loadData(userCity);
        }
    });
});

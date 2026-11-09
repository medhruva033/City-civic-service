export function initializeWeather() {

    const temperature = document.getElementById("temperature");
    const description = document.getElementById("weatherDescription");
    const location = document.getElementById("location");
    const weatherIcon = document.getElementById("weatherIcon");
    const refreshButton = document.getElementById("refreshWeather");

    const weatherConditions = {
        0: ["Clear sky", "sun"],
        1: ["Mainly clear", "sun"],
        2: ["Partly cloudy", "cloud-sun"],
        3: ["Overcast", "cloud"],
        45: ["Foggy", "cloud-fog"],
        48: ["Depositing rime fog", "cloud-fog"],
        51: ["Light drizzle", "cloud-drizzle"],
        53: ["Moderate drizzle", "cloud-drizzle"],
        55: ["Dense drizzle", "cloud-drizzle"],
        61: ["Slight rain", "cloud-rain"],
        63: ["Moderate rain", "cloud-rain"],
        65: ["Heavy rain", "cloud-rain"],
        71: ["Slight snowfall", "cloud-snow"],
        73: ["Moderate snowfall", "cloud-snow"],
        75: ["Heavy snowfall", "cloud-snow"],
        80: ["Rain showers", "cloud-rain"],
        81: ["Moderate showers", "cloud-rain"],
        82: ["Heavy showers", "cloud-rain"],
        95: ["Thunderstorm", "cloud-lightning"],
        96: ["Thunderstorm with hail", "cloud-lightning"],
        99: ["Heavy thunderstorm", "cloud-lightning"]
    };

    // Fetch weather
    async function getWeather(latitude, longitude, city) {

        try {

            location.textContent = "Updating...";

            const url =
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Weather service unavailable");
            }

            const data = await response.json();

            const current = data.current;

            temperature.textContent =
                `${Math.round(current.temperature_2m)}°`;

            const weather = weatherConditions[current.weather_code]
                || ["Unknown conditions", "cloud"];

            description.textContent = weather[0];

            weatherIcon.setAttribute("data-lucide", weather[1]);

            location.textContent = city;

            if (window.lucide) {
                window.lucide.createIcons();
            }

        } catch (error) {

            console.error("Weather error:", error);

            description.textContent = "Unable to load weather";
            location.textContent = "Check your connection";
            temperature.textContent = "--°";

        }

    }

    // Detect current location
    function detectLocation() {

        location.textContent = "Detecting location...";

        if (!navigator.geolocation) {

            getWeather(12.9716, 77.5946, "Bengaluru, India");
            return;

        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                getWeather(
                    latitude,
                    longitude,
                    "Your current location"
                );

            },

            () => {

                getWeather(
                    12.9716,
                    77.5946,
                    "Bengaluru, India"
                );

            },

            {
                timeout: 10000,
                maximumAge: 300000
            }

        );

    }

    // Refresh weather
    refreshButton.addEventListener("click", () => {
        detectLocation();
    });

    detectLocation();

}
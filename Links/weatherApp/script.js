// OpenWeatherMap API
const API = `1f7519c56b05b0d896d7137b0e53ad06`

const iconImg = document.querySelector(`.icon`)
const userLocation = document.querySelector(`.location`)
const userWeatherDetails = document.querySelector(`.details`)
const userTemp = document.querySelector(`.unit`)
const userSunrise = document.querySelector(`.sunrise`)
const userSunset = document.querySelector(`.sunset`)
const userTemp2 = document.querySelector(`.unit2`)

function getBgColour(main) {
    switch (main) {
        case `Clear`:
            return `radial-gradient(circle, rgba(0, 190, 255, 0.3) 0%, rgba(0, 190, 255, 0.6) 35%, rgba(0, 190, 255, 1) 100%)`;
        case `Clouds`:
            return `radial-gradient(circle, rgba(175, 175, 175, 0.3) 0%, rgba(175, 175, 175, 0.6) 35%, rgba(175, 175, 175, 1) 100%)`;
        case `Drizzle`:
            return `radial-gradient(circle, rgba(125, 125, 125, 0.3) 0%, rgba(125, 125, 125, 0.6) 35%, rgba(125, 125, 125, 1) 100%)`;
        case `Rain`:
            return `radial-gradient(circle, rgba(50, 50, 50, 0.3) 0%, rgba(50, 50, 50, 0.6) 35%, rgba(50, 50, 50, 1) 100%)`;
        case `Thunderstorm`:
            return `radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 1) 100%)`;
        case `Snow`:
            return `rgb(255, 255, 255)`;
        default:
            return `rgb(255, 128, 36)`;
    }
}

// Run the function when the user's browser window loads
window.addEventListener(`load`, () => {
    let lat
    let long

    if (navigator.geolocation) { // Check to see if geolocation is available in the browser
        navigator.geolocation.getCurrentPosition((position) => {  // If available, get the current position of the user and:
            lat = position.coords.latitude // Store the user's latitude
            long = position.coords.longitude // Store the user's longitude

            // Get current weather
            const currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}&units=metric` // Return information from this link using the user's lat, long, the API, and showing the units in degrees celsius
            console.log(currentWeather)
            fetch(currentWeather) // Fetch data from a network (OpenWeatherMap), promising to fulfil the following once the data is available
                .then((responseWeather) => { // On success:
                    return responseWeather.json() // Convert the response to a JSON object so we can use it in this app
                })
                .then((data) => { // Extract the following values from the JSON object:
                    console.log(data)
                    const { temp } = data.main // The temp from the main object, and store it in a variable of the same name
                    const place = data.name + `, ` + data.sys.country // The location name, which is in the name object, and the country, which is in the sys: country object
                    const { main, description, icon } = data.weather[0] // The description and icon code, which are in the weather array
                    const { sunrise, sunset } = data.sys // The sunrise and sunset times (in epoch) from the sys object, and store them in variables of the same name

                    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
                    const sunriseGMT = new Date(sunrise * 1000) // Display time in GMT
                    const sunsetGMT = new Date(sunset * 1000) // Display time in GMT
                    let bgColour = getBgColour(main); // Background colour based on weather
                    const currentTime = new Date();

                    iconImg.src = iconURL // Change the icon using the URL of OpenWeatherMap icons
                    userLocation.textContent = `${place}`
                    userTemp.textContent = `${Math.round(temp)} °C` // Round to nearest whole number
                    userWeatherDetails.textContent = `${description}`
                    userSunrise.textContent = `${sunriseGMT.toLocaleTimeString(`default`, { hour: `2-digit`, minute: `2-digit`, hourCycle: `h24` })}, ${sunsetGMT.toLocaleDateString(`default`, { weekday: `long`, day: `2-digit`, month: `short` }).replace(`,`, ``)}`
                    userSunset.textContent = `${sunsetGMT.toLocaleTimeString(`default`, { hour: `2-digit`, minute: `2-digit`, hourCycle: `h24` })}, ${sunsetGMT.toLocaleDateString(`default`, { weekday: `long`, day: `2-digit`, month: `short` }).replace(`,`, ``)}`
                    document.body.style.background = bgColour;
                    if (currentTime >= sunriseGMT && currentTime <= sunsetGMT) {
                        document.body.style.background = bgColour;
                    } else {
                        document.body.style.background = `radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.99) 45%, rgba(0, 0, 0, 1) 100%)`;
                    }
                })

            // Get forecast
            const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API}&units=metric`
            console.log(forecast)
            fetch(forecast)
                .then((responseForecast) => {
                    return responseForecast.json()
                })
                .then((data) => {
                    console.log(data)
                })
        })
    }
    else {
        console.log(`Unable to obtain location data`)
    }
})
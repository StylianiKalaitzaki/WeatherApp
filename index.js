// Selecting elements from the DOM
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


// Event listener for click on search button
search.addEventListener('click', () =>{

    // OpenWeatherMap API Key
    const APIKey = '6ad2862484c3b875afe85ddd62fd2932';

    // Get the location input value
    const location = document.querySelector('.search-box input').value;


    // Check if location input is empty
    if(location == '')
        return;

    // Fetch weather data from OpenWeatherMap API
    fetch(`https:///api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if(json.cod === '404'){

            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        // Hide error message if any
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');
        
        // Selecting elements to display weather information
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        // Set weather image based on weather condition
        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;     
            case 'Haze':
                image.src = 'images/mist.png';
                break;
            default:
                image.src = '';
        }
        
        // Display weather information
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        // Show weather boxes and apply animation
        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';



    });
});

// Add event listener for keypress on location input
document.getElementById('loc').addEventListener('keypress', (event) => {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
      // Trigger the click event on the button
      search.click();
    }
  });

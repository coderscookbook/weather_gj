if (navigator.geolocation){ //success
  navigator.geolocation.getCurrentPosition(
    (position) => { 
    // SUCCESS CASE
      // Store user's latitude and longitude
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Log coords to the console
      console.log(
        `%clatitude: ${latitude}, longitude: ${longitude}`, 
        "color: green"
      )

      // Call the function to get weather API endpoints
      getEndpoints(latitude, longitude)
    }, 
    (error) => console.error ( 
    // FAIL CASE
      `%cError getting location: ${error.message}`,
      "color: red"
      )
  )
} else {
  // If browser does not support Geolocation API
  console.error(
    "%cGeolocation is not supported by this browser.", 
    "color:red"
  )
}

// Weather.gov endpoint API
async function getEndpoints(latitude, longitude){
  try {
    // Use coords to retrieve gridpoints
    const response = await fetch(
      `https://api.weather.gov/points/${latitude},${longitude}`
    )
    console.log(response)

    // If the fetch response fails
    if(!response.ok) {
      throw new Error("Network response was not ok.")
    }
    
    // Use get() to view response data type
    // const contentType = response.headers.get("Content-Type")
    // console.log(contentType) //result = application/geo+json
    
    //Parse response data into readable json format
    const data = await response.json()
    console.log(data)

    // We will need the office and points from the data
    const office = data.properties.gridId
    const gridX  = data.properties.gridX
    const gridY  = data.properties.gridY

    // Call the weater API to get the forecast using the data
    getForecast(office, gridX, gridY)    

  } catch(error) {
    console.error(`%c${error.message}`, "color: red")
  }
}


// Weather.com forecast API
async function getForecast(office, gridX, gridY){
  try {
    const response = await fetch(
      `https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`
    )
    // If fetch response fails
    if (!response.ok){
      throw new Error("Fetching forecast failed")
    }
    const forecastData = await response.json()
    console.log("FORECAST:", forecastData)

    // Store the periods from the data
    const periods = forecastData.properties.periods
    // Create the weather cards on the web page
    createWeatherCards(periods)
  } catch (error) {
    console.error(`%c${error.message}`, "color: red")
  }
}

function createWeatherCards(periods){
  // Store the card container div from index.html
  const cardContainer = document.getElementById("card-container")
  // Create a card for each element in the periods array
  periods.forEach((element) => {
    // Create the html elements
    const div = document.createElement("div")
    const h2  = document.createElement("h2")
    const img = document.createElement("img")
    const p   = document.createElement("p")

    // Set the icon to be used as the large version
    const icon = element.icon.replace("medium", "large")

    // Set the new div class to "card"
    div.setAttribute("class", "card")

    // Set the new img attributes
    img.setAttribute("src", icon)
    img.setAttribute("alt", element.shortForecast)

    // Set the text content for the card title and forecast
    h2.textContent = element.name
    p.textContent  = element.shortForecast

    // Append the title, image, and forecast to the card div
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)

    // Append the card to the card container div
    cardContainer.appendChild(div)

  })
  
  // Set favicon to the first weater icon
  const head = document.getElementsByTagName("head")[0]
  const link = document.createElement("link")
  link.rel   = "icon"
  link.href  = periods[0].icon.replace("medium", "small")
  head.appendChild(link)
}

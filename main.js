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

}
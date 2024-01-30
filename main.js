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
      `https://api.weather.gov/points/${latitude}, ${longitude}`
    )
    // If the fetch response fails
    if(!response.ok) {
      throw new Error("Network response was not ok.")
    }
  } catch(error) {
    console.error(`%c${error.message}`, "color: red")
  }
}
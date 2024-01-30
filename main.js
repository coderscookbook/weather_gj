if (navigator.geolocation){ //success
  navigator.geolocation.getCurrentPosition(
    (position) => { //success
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(
        `%clatitude: ${latitude}, longitude: ${longitude}`, 
        "color: green"
      )
    }, 
    (error) => console.error ( 
      `%cError getting location: ${error.message}`,
      "color: red"
      )
  )
} else {
  console.error(
    "%cGeolocation is not supported by this browser.", 
    "color:red"
  )
}
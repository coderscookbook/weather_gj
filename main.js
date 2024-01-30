if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(success, error)
} else {
  console.error(
    "%cGeolocation is not supported by this browser.", 
    "color:red"
  )
}
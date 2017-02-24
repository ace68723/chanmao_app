'use strict';
const  LocationModule = {
  getCurrentPosition(){
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userloc = position.coords.latitude +','+position.coords.longitude;
            resolve(userloc)
            },
            (error) => {
              resolve(error)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
      })
  }
}
module.exports = LocationModule;
